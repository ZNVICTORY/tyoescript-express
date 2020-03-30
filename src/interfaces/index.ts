/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-30 08:47:37
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 09:43:50
 */
import { Request, Response } from 'express'
export interface RequestBody extends Request {
  body: { [key: string]: string | undefined }
}
export interface ResponseBody extends Response {

}
export enum Methods {
  get = "get",
  post = "post"
}