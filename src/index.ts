/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-28 20:23:24
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 08:55:03
 */
import express, { Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import cookieSeesion from 'cookie-session'
import router from './router'
import './controllers'


const app = express()
app.use(bodyParser.urlencoded( { extended: false }))
app.use( 
  cookieSeesion({
    name: "session",
    keys: ["teacher dell"],
    maxAge: 24 * 60 * 60 * 1000            //过期时间
  })
)
app.use((req: Request, res: Response, next: NextFunction) => {
   req.userName = "dell"
   next()
})
app.use(router)
app.listen(7001, () => {
  console.log("server is start")
})