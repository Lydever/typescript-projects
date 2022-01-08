/**
 * @Description:   格式化时间日期
 * @Author:     liyingxia
 * @CreateDate:  2022/1/8 21:52
 */

/**
 * 获取当前时间
 * 声明一个有两个形参：时间（value:any）和 类型（params:string）的函数。
 * params可传递的值有:年份、月份、天、时、分、秒、毫秒、周、当前日期、当前时间、当前日期时间：year、month、date、hours、minutes、seconds、week、currentDate、currentTime，currentTimeDate
 */
const getMoment = (params: string,value: any): string => {
    const dateTime: any = value
    let year: number = dateTime.getFullYear()
    let month: any = dateTime.getMonth() + 1
    let date: any = dateTime.getDate()
    let hours: any = dateTime.getHours()
    let minutes: any = dateTime.getMinutes()
    let seconds: any = dateTime.getSeconds()
    let week: any = dateTime.getDay()
    month = month < 10 ? '0' + month: month
    date = date < 10 ? '0' + date: date
    hours = hours < 10?'0'+ hours: hours
    minutes = minutes < 10 ? '0 '+ minutes: minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    week == 0 ? '日' : week  //当前星期
    let currentDate: any = year + '-' + month + '-' + date
    let curryTime: any = hours + ':' + minutes + ':' + seconds
    let currentDateTime: any = year + '-' + month +'-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    //根据传入类型判断要返回的值，采用了策略模式
    const paramsList: any = {
        'year': () => { return year },
        'month': () => { return month },
        'date': () => {return date},
        'hours': () => {return hours},
        'minutes': () => {return minutes},
        'seconds': () => {return seconds},
        'week': () =>{
            let weekArr: any = {
                0: () => { return '日' },
                1: () => { return '一' },
                2: () => { return '二' },
                3: () => { return '三' },
                4: () => { return '四' },
                5: () => { return '五' },
                6: () => { return '六' }
            }
            return weekArr[week] ? weekArr[week]() : 'no'
        },
        'currentDate': () => { return currentDate },
        'curryTime': () => { return curryTime },
        'currentDateTime': () => { return currentDateTime },
    }
    return paramsList[params] ? paramsList[params]() : 'no'
}

/**
 *
 * @param type 获取前后type日期('type':类型(年(year)/月(month)/日(date)/时(hours)/分(minutes)/秒(seconds))
 * @param value 获取value的type日期('value<0':前value+type | 'value>0':后value+type)
 * @param params 获取params格式的值（同getMoment()函数的形参params）
 * @param defaultData 默认日期（不传递该参数则默认为当前时间：接收格式为：YYYY-MM-DD 或 YYYY-MM-DD HH:ii:ss）
 */
export const filterMoment = (type="default", value=0, params="currentDateTime", defaultData='default'): string => {
    let dateTime: any;
    defaultData == 'default' ? dateTime = new Date() : dateTime = new Date(defaultData)  //判断默认时间是否传递,没有则默认为当前系统时间
    //根据type不同类型处理 value + type 的时间。
    const typeArray: any = {
        'year': () => {
            dateTime.setFullYear(dateTime.getFullYear() + value)
            let currentDate = getMoment(params, dateTime)
            return currentDate
        },
        'month':() => {
            dateTime.setMonth(dateTime.getMonth() + value)
            let currentDate = getMoment(params, dateTime)
            return currentDate
        },
        'date':() => {
            dateTime.setDate(dateTime.getDate() + value)
            let currentDate = getMoment(params, dateTime)
            return currentDate
        },
        'hours':() => {
            dateTime.setHours(dateTime.getHours() + value)
            let currentDate = getMoment(params, dateTime)
            return currentDate
        },
        'minutes':() => {
            dateTime.setMinutes(dateTime.getMinutes() + value)
            let currentDate = getMoment(params,dateTime)
            return currentDate
        },
        'seconds':() => {
            dateTime.setSeconds(dateTime.getSeconds() + value)
            let currentDate = getMoment(params, dateTime)
            return currentDate
        },
        // 不传递类型，则返回YYYY-MM-DD HH:ii:ss格式的当前时间
        'default':() => {
            let currentDate = getMoment(params, dateTime)
            return currentDate
        }
    }
    return typeArray[type] ? typeArray[type]() : 'no'
}
