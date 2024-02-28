/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ConfigsController from '#controllers/configs_controller';
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AuthController from '#controllers/auth_controller';

router.group( () => {

  router.post('auth/login', [AuthController, 'login']);
  router.post('auth/logout', [AuthController, 'logout']);

  
  router.get('public/config/:id',[ConfigsController, 'generateConfigAuth'])
  router.get('public/scripts/:id',[ConfigsController, 'scripts'])

  router.group( () => {
    router.get('auth/username', [AuthController, 'username']);
    router.get('config',[ConfigsController, 'index']);
    router.get('config/:id/generate',[ConfigsController, 'generateConfig']);
    router.get('config/:id/children',[ConfigsController, 'children']);
    router.get('config/:id',[ConfigsController, 'get']);
    router.put('config/:id',[ConfigsController, 'put']);
    router.post('config',[ConfigsController, 'post']);
  }).use(middleware.auth());

}).prefix('/api/v1')
