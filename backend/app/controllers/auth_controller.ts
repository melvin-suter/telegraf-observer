import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'


export default class AuthController {
    async login(ctx: HttpContext) {
        /**
         * Step 1: Get credentials from the request body
         */
        const { username, password } = ctx.request.only(['username', 'password'])

        /**
         * Step 2: Verify credentials
         */
        const user = await User.verifyCredentials(username, password)

        /**
         * Step 3: Login user
         */
        await ctx.auth.use('web').login(user)

        /**
         * Step 4: Send them to a protected route
         */
        ctx.response.json({
            state: "success"
        });
      }

      async logout(ctx:HttpContext) {
        await ctx.auth.use('web').logout();
        ctx.response.json({
            state: "success"
        });

    }

    async username(ctx:HttpContext) {
      ctx.response.json({
        username: ctx.auth.use('web').user.username
      })
    }
}