/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-29 16:59:00
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 09:00:43
 */
import { RequestHandler } from "express"
import 'reflect-metadata'

export function use(middleware: RequestHandler) {
  return function(target:any, key: string) {
    const originMiddlewares = Reflect.getMetadata("middlewares", target, key) || []
    originMiddlewares.push(middleware)
    Reflect.defineMetadata("middlewares", originMiddlewares, target, key)
  }
}