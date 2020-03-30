/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-29 16:10:17
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 09:44:16
 */
import { RequestHandler } from 'express'
import "reflect-metadata"
import router from '../router'
import { Methods } from '../interfaces'

// 类装饰器
export function controller (root?: string) {
  return function(target: new (...args: any[]) => any): void {
    for(let key in target.prototype) {
      const path: string = Reflect.getMetadata("path", target.prototype, key)
      const method: Methods = Reflect.getMetadata("method", target.prototype, key)
      const middlewares: RequestHandler[] = Reflect.getMetadata("middlewares", target.prototype, key)
      const handler = target.prototype[key]
      if(path && method) {
        let fullPath;
        if(root) {
          fullPath = root === "/"  ? path : `${root}${path}`
        } else {
          fullPath = path
        }
        if(middlewares && middlewares.length) {
          // console.log(method, fullPath)
           router[method](fullPath, ...middlewares, handler)
        } else {
          router[method](path, handler)
        } 
      }
    }
  }
}