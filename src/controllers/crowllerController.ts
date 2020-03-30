/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-29 16:49:11
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 09:48:54
 */
import fs from 'fs'
import path from 'path'
import Crowller from '../utils/crowller'
import Analyzer from '../utils/Analyzer'
import getResponseData from '../utils/util'
import { get, controller, use } from '../decorators'
import { checkLogin, test } from '../middlewares/checkLogin'
import { RequestBody , ResponseBody} from '../interfaces'

@controller()
class CrowllerController {
  @get("/getData")
  @use(checkLogin)
  @use(test)
  getData(req: RequestBody, res: ResponseBody) {
    console.log(req.params, "ok")
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const analyze = Analyzer.getInstance()
    new Crowller(url, analyze);
    res.json(getResponseData(true))
  }
  @get("/showData")
  @use(checkLogin)
  showData(req: RequestBody, res: ResponseBody) {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, "utf-8")
      res.json(getResponseData(JSON.parse(result)))
    } catch(e) {
      res.json(getResponseData(null, "未爬去到数据"))
    }
  }

};
export default CrowllerController