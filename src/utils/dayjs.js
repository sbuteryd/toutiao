import Vue from 'vue'
import  dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // ES 2015
dayjs.locale('zh-cn') // 全局使用

import  relativeTime from 'dayjs/plugin/relativeTime'

//配置处理相对时间的插件
dayjs.extend(relativeTime)
//定义要给全局过滤器 然后就可以在任何模板中使用了
//其实就是一个全局可用的方法(仅供模板使用)
//参数1 过滤器名称
//参数2 过滤器函数
//使用 {{ 表达式| 过滤器名称}}
//前面表达式中的结果，作为产生 传递给函数
//过滤器的返回值会返回到模板中的位置
Vue.filter('relativeTime',value=>{
  return  dayjs().to(dayjs(value))// 31 年前
})
//
// const arry= [
//   dayjs().from(dayjs('2021-01-27')),
//   dayjs().from(dayjs('1990-01-01'), true),
//   dayjs().fromNow(),
//
//   dayjs().to(dayjs('1990-01-01')), // 31 年前
//   dayjs().toNow()
// ]
//
// console.log(arry)
