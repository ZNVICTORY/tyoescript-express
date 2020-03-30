/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-02-21 19:31:08
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-02-21 20:38:39
 */
import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}
interface Content {
  [propsName: number]: Course[]
}

export default class DellAnalyzer {
  private static instance: DellAnalyzer;
  
  public static getInstance() {
    if(!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer()
    }
    return DellAnalyzer.instance
  }
  /**
  * 整理网页数据
  * @param html {string }
  * @returns result {CourseResult}
  */
  private getCourseInfo(html: string): CourseResult {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item') // 类似于jquery 语法
    const courseInfo: Course[] = []
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1], 10)
      courseInfo.push({ title, count });
    })
    return {
      time: new Date().getTime(),
      data: courseInfo
    }
  }

  /**
   * 经数据存储到文件
   * @param courseInfo 
   * @returns content { string }
   */
  private generateJsonContent(courseInfo: CourseResult, filePath: string): string {
    let fileContent: Content = {}
    if(fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data
    return JSON.stringify(fileContent)
  }
  
  /**
   * 
   * @param html {string}
   * @param filePath {string}
   * @returns fileContent { string }
   */
  public analyze(html: string, filePath: string ): string {
    const courseInfo: CourseResult = this.getCourseInfo(html)
    const content = this.generateJsonContent(courseInfo, filePath)
    return content
  }
  // 使用单例模式
  private constructor() {}
}