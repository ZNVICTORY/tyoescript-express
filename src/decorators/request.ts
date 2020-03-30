/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-29 16:05:57
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 09:55:56
 */
import "reflect-metadata"
import { Methods } from "../interfaces"
import crowllerController from '../controllers/crowllerController'
import loginController from '../controllers/loginController'


// 类中方法的装饰器 target ： 类的原型
function getRequestDecorator(type: Methods) {
  return function(path: string) {
    return function(target: crowllerController | loginController, key: string) {
      Reflect.defineMetadata("path", path, target, key)
      Reflect.defineMetadata("method", type, target, key)
    }
  }
}
export const get = getRequestDecorator(Methods.get)
export const post = getRequestDecorator(Methods.post)

