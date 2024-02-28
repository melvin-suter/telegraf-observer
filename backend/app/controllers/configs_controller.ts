import Config from '#models/config'
import type { HttpContext } from '@adonisjs/core/http'

export default class ConfigsController {

    async index(ctx:HttpContext) {
        if(ctx.request.qs().root){
            return Config.query().preload('configs').preload('parent').whereNull('config_id');
        } else {
            return Config.all();
        }
    }

    async get(ctx:HttpContext) {
        if(ctx.request.qs().full){
            return this.getFullConfig(ctx.params.id);
        }

        if(ctx.request.qs().preload){
            return Config.query().preload('configs').preload('parent').where('id','=',ctx.params.id);
        }

        return Config.find(ctx.params.id);
    }

    async children(ctx:HttpContext) {
        return Config.query().where('config_id','=',ctx.params.id);
    }

    async put(ctx:HttpContext){
        let config = await Config.findOrFail(ctx.params.id);
        await config.merge(ctx.request.body());
        config.save();
        return config;
    }

    async post(ctx:HttpContext){
        let config:Config = await Config.create(ctx.request.body());
        return config;
    }

    async generateConfig(ctx:HttpContext){
        let config = await this.getFullConfig(ctx.params.id);

        let template = "[agent]";

        for(let key of Object.keys(config.configdata.agent)){
            let value = config.configdata.agent[key];

            if(/^([Tt]rue)|([Ff]alse)|(\[.+\])|([0-9]+)$/.test(config.configdata.agent[key]) == false) {
                value = "\"" + config.configdata.agent[key] + "\"";
            }

            template += "\n" + key + " = " + value;
        }

        template += "\n\n[[outputs.influxdb_v2]]";

        for(let key of Object.keys(config.configdata.output)){
            let value = config.configdata.output[key];
            if(/^([Tt]rue)|([Ff]alse)|(\[.+\])|([0-9]+)$/.test(config.configdata.output[key]) == false) {
                value = "\"" + config.configdata.output[key] + "\"";
            }

            template += "\n" + key + " = " + value;
        }

        for(let key of Object.keys(config.configdata.inputs)){
            template += "\n\n[[inputs." + key + "]]";
            if(config.configdata.inputs[key] != null) {
                template += "\n"+ config.configdata.inputs[key];
            }
        }

        return template;
    }

    async generateConfigAuth(ctx:HttpContext){
        let key = ctx.request.qs().key ?? '';
        let config = await Config.findOrFail(ctx.params.id);

        if(config.encryptionkey == key){
            return await this.generateConfig(ctx);
        }

        ctx.response.safeStatus(401);
        return {};
    }

    async scripts(ctx:HttpContext){
        let key = ctx.request.qs().key ?? '';
        let config = await Config.findOrFail(ctx.params.id);

        if(config.encryptionkey == key){
            return config.configdata.scripts;
        }

        ctx.response.safeStatus(401);
        return {};
    }

    private async getFullConfig(id:number){
        let config = (await Config.findOrFail(id)).serialize();

        let parentConfig = await Config.query().where('id','=',config.configId).first();

    
        if(parentConfig) {
            let parentFullConfig = await this.getFullConfig(parentConfig.id);
            config.configdata.agent = {...parentFullConfig.configdata.agent, ...config.configdata.agent};
            config.configdata.inputs = {...parentFullConfig.configdata.inputs, ...config.configdata.inputs};
            config.configdata.output = {...parentFullConfig.configdata.output, ...config.configdata.output};

            config.configdata.scriptDirWin = config.configdata.scriptDirWin ?? parentFullConfig.configdata.scriptDirWin;
            config.configdata.scriptDirLnx = config.configdata.scriptDirLnx ?? parentFullConfig.configdata.scriptDirLnx;



        }

        return config;
    }

}