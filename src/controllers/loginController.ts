/*
 * @Description: LoginController
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-29 15:59:26
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 09:47:28
 */
import getResponseData from '../utils/util'
import { get, controller, post } from '../decorators'
import { RequestBody, ResponseBody} from '../interfaces'

@controller()
class LoginController {
  static isLogin( req: RequestBody ): boolean {
    const isLogin: boolean = req.session ? req.session.isLogin : undefined
    return isLogin
  }
  @get("/logout")
  logout(req: RequestBody, res: ResponseBody) {
    if(req.session) {
          req.session.isLogin = undefined
          res.json(getResponseData(true))
    } 
  }
  @post("/login")
  login(req: RequestBody, res: ResponseBody) {
    const { password } = req.body 
    const isLogin = LoginController.isLogin(req)
    if(isLogin) {
      res.redirect("/")
    } else {
      if(password === "123" && req.session) {
        req.session.isLogin = true
        res.json(getResponseData(true))
      } else {
        res.json(getResponseData(null, "登陆失败"))
      }
    }
  }
  @get("/")
  home(req: RequestBody, res: ResponseBody) {
    const isLogin = LoginController.isLogin(req)
    if(isLogin) {
      res.send(`
        <html>
            <body>
                <a href="/getData">爬虫</a>
                <a href="/showData">展示数据</a>
                <a href="/logout">退出</a>
            </body>
        </html>
        `)
    } else {
        res.send(`
          <html>
            <body>
              <form method="post" action="/login" >
                  <input type="password" name="password">
                  <button>登陆</button>
              </form>
            </body>
        </html>
        `)
      }
    }
}
export default LoginController