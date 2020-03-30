// ts --> .d.ts 翻译文件--> .js
import fs from 'fs'
import path from 'path'
import superagent from 'superagent'

export interface Analyze {
  analyze: (html: string, filePath: string) => string;
}

export default class Crowller {
  private filePath = path.resolve(__dirname, '../../data/course.json')

  /**
   * 根据网址获取网页数据
   * @returns result {string}
   */
  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }
  
  /**
   * 将数据写入文件
   * @param content {string}
   */
  private writeFile(content: string) {
    console.log(this.filePath)
    fs.writeFileSync(this.filePath, content)
  }

  /**
   * 进程调度
   */
  private async initSpiderProcess(analyze: Analyze) {
    const html = await this.getRawHtml()
    const content = analyze.analyze(html, this.filePath)
    this.writeFile(content)
  }
  constructor(private url: string, private analyze: Analyze) {
    this.initSpiderProcess(analyze)
  }
}


