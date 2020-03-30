/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-28 22:47:53
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-28 22:51:06
 */
interface Result {
  success: boolean;
  errMsg?: String 
  data: any
}
const getResponseData = (data:any, errMsg?:string): Result => {
  if(errMsg) {
    return {
      success: false,
      errMsg,
      data
    }
  } else {
    return {
      success: true,
      data
    }
  }
}
export default getResponseData