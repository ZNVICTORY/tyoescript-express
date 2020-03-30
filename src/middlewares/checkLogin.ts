/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-30 08:43:55
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 09:38:40
 */
import { NextFunction } from 'express'
import getResponseData from '../utils/util'
import { RequestBody , ResponseBody }  from '../interfaces'

export const checkLogin  = (req: RequestBody, res: ResponseBody, next: NextFunction):void => {
  const isLogin: boolean = (req.session ? req.session.isLogin : undefined)
  if(isLogin) {
    next()
  } else {
    res.json(getResponseData(null, "请先登陆"))
  }
}
export const test = (req: RequestBody, res: ResponseBody, next: NextFunction):void => {
  console.log("ok")
  next()
}