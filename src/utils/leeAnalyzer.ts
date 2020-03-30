/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-02-21 20:07:18
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-28 22:33:26
 */
import { Analyze } from './crowller'

export default class LeeAnalyzer implements Analyze {
  public analyze(html: string, filePath: string): string {
    return html
  }
}