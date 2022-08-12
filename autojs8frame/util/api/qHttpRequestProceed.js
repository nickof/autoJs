let { default: n } = require("../../ts/n.js");

const cfg = {
    debug: false
    , timeOut: 20000
}

let req = {}
/**
 * 
 * @param {*为空则取url} host 
 * @param {*publicHead {} } head 
 * @param {*publicPara 公共参数 } para 
 * @param {* 毫秒,超时则取默认} timeOut 
 * @returns 
 * @ex 
 *  * const baiduReqMiddle = req.newMiddleware("https://pan.baidu.com"
    , { 'User-Agent': 'pan.baidu.com' }
    , { "access_token": "123.de0405292865b7e5371395a920272f44.Yao6mavGPBdRlEaUvIvqh7rxbnN-OPyq-7oEr7x.-vFdIA" }
    , null)
 */
req.newMiddleware = (host, head, para, timeOut, bytes) => {

    log_function("newMiddleware")

    let err
    let functionName = "newMiddleware "

    if (host == undefined) {
        host = ""
    } else if (typeof host !== "string") {
        err = functionName + "host type err,need string"
    }
    log(host)

    if (typeof head == "undefined") {

    } else if (typeof head != "object") {
        err = functionName + "head type err,type=" + typeof head + " need object"
    }

    if (para === undefined) {
        para = null
    } else if (typeof para != "object") {
        err = functionName + "para type err,need object"
    }

    if (timeOut == undefined) {
        timeOut = cfg.timeOut
    } else if (typeof timeOut != "number") {
        err = "timeOut type err type=" + typeof (timeOut) + " ,need number"
    }

    return {
        host: host, timeOut: timeOut, para: para, head: head, err: err, bytes: bytes
    }

}

req.qs = (data) => {
    let strPara = "";
    for (let key in data) {
        strPara = strPara + key + "=" + data[key] + "&"
    }
    strPara = strPara.substring(0, strPara.length - 1)
    return strPara
}

const urlHttpProceed = (url) => {

    if (url.length > 8) {
        if (url.slice(0, 7) == "http://") {
            return url
        } else if (url.slice(0, 8) == "https://") {
            return url
        }
        return "http://" + url
    } else {
        return "http://" + url
    }
}


/**
 * 
 * @param {*} url 
 * @param {*} data 
 * @param {*} head 
 * @param {*} newMiddleware() 
 * @returns 
 */
req.get = (url, data, head, newMiddleware) => {

    log_function("req.GET")
    let newUrl
    let newData = {}

    let fullUrl
    let newHead = {}

    //newMiddleware.host = ""
    //url = "http://54.241.117.38:10000/platform/ping"

    if (newMiddleware != undefined) {

        if (newMiddleware.err != undefined) {
            n.secex(5, newMiddleware.err)
            return null
        }

        if (newMiddleware.timeOut != undefined) {
            console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 110 ~ timeOutMiddle", newMiddleware.timeOut)
            http.__okhttp__.setTimeout(newMiddleware.timeOut);
        } else {
            http.__okhttp__.setTimeout(cfg.timeOut)
            console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 113 ~ timeOutDefault=", timeOut)
        }

        if (newMiddleware.host != undefined) {
            newUrl = newMiddleware.host + url
        } else {
            newUrl = url
        }

        if (newMiddleware.para != undefined) {
            for (let key in newMiddleware.para) {
                newData[key] = newMiddleware.para[key]
            }
        }

        if (newMiddleware.head != null) {
            for (key in newMiddleware.head) {
                newHead[key] = newMiddleware.head[key]
                console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 130 ~ newHeadPublic",
                    "\n" + key + "=" + newMiddleware.head[key])
            }

        }

    } else {
        newUrl = url
    }

    //log_function("GET")
    // if (newMiddleware.host != "") {
    //     newUrl = newMiddleware.host + url
    // } else {
    //     newUrl = url
    // }

    newUrl = urlHttpProceed(newUrl)
    //log(newUrl)


    // if (newMiddleware.para != null) {
    //     for (let key in newMiddleware.para) {
    //         newData[key] = newMiddleware.para[key]
    //     }
    // }

    // for (key in data) {
    //     newData[key] = data[key]
    // }

    if (data == undefined && newMiddleware == undefined) {
        fullUrl = newUrl
    }
    else if (data == undefined && newMiddleware.para == null) {
        fullUrl = newUrl
    } else {
        //拼参数
        for (key in data) {
            newData[key] = data[key]
        }
        fullUrl = newUrl + "?" + req.qs(newData)  //https://pan.baidu.com/rest/2.0/xpan/file?access_token=xxxxxxxx&dir=
    }


    if (head != undefined) {
        for (key in head) {
            newHead[key] = head[key]
        }
    }

    // if (newHead != null) {
    //     for (let key in newHead) {
    //         console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 138 ~ newHead\n", key + ":" + newHead[key])
    //     }
    // }

    //console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 186 ~ fullUrl\n", fullUrl)

    let res;
    for (key in newHead) {
        console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 191 ~ newHead\n",
            key + "," + newHead[key])
        //newHead[key] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47"
    }

    //
    //text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
    // newHead["Accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
    // for (key in newHead) {
    //     console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 198 ~ newHead\n",
    //         key + "," + newHead[key])
    //     //newHead[key]="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47"
    // }

    //fullUrl = "http://54.241.117.38:10000/platform/ping"
    console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 213 ~ fullUrl=", fullUrl)
    try {
        res = http.get(fullUrl, {
            headers: newHead
        });
        //res = http.get(fullUrl);
    } catch (error) {
        n.secex(5, "get-catch-err=" + error)
        console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 144 ~ error", error)
        return null
    }

    if (res.statusCode !== 200) {
        let body = res.body.string()
        console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 208 ~ statusCode-err", res.statusCode + "\n"
            + "url=" + fullUrl
            + "\nbody=" + body)
        return null
    }

    let body
    if (newMiddleware == undefined || newMiddleware.bytes == undefined) {
        body = res.body.string()
        // console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 233 ~ body\n", body
        //     + "\n" + fullUrl)

    } else {
        body = res.body.bytes()
        console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 212 ~ get return bytes",
            +"\n" + fullUrl)
    }
    return body

}


/**
 * http请求前缀可选填,发https请求一定加上前缀
 * @param {} url  http请求前缀可选填,发https请求一定加上前缀
 * @param {*} data 
 * @param {*} head 
 * @param {*} proceed 
 * Ex:
 *const baidu = {
    host: "https://pan.baidu.com"
    , head: (headPara) => {
        if (headPara["User-Agent"] === undefined) {
            headPara["User-Agent"] = "pan.baidu.com"
        }
        return headPara
    }
    , para: (data) => {
        if (data.access_token === undefined) {
            data.access_token = "123.de0405292865b7e5371395a920272f44.Yao6mavGPBdRlEaUvIvqh7rxbnN-OPyq-7oEr7x.-vFdIA"
        }
        return data
    }
    , resp: (res) => {
        if (res === null) {
            return null
        }
        // log(res.body.string())
        let obj = JSON.parse(res.body.string())
        if (obj.errno !== 0) {
            rlog.Error("response-err-" + obj.errno)
            return null
        }
        return obj
    }
}
 * @returns 
 */
/*
req.GET = (url, data, head, proceed) => {
 
    //log_function("GET")
    if (proceed.timeOut == undefined) {
        http.__okhttp__.setTimeout(cfg.timeOut);
    } else {
        http.__okhttp__.setTimeout(proceed.timeOut);
    }
 
    let newUrl;
    if (proceed.host != undefined) {
        if (typeof proceed.host == "string") {
            newUrl = proceed.host + url; //https://pan.baidu.com/rest/2.0/xpan/filenewUrl = proceed.host + url; //https://pan.baidu.com/rest/2.0/xpan/file
        } else {
            rlog.Error("host is not type of string")
            return null
        }
 
    } else {
        newUrl = url
    }
 
    newUrl = urlHttpProceed(newUrl)
    let newData = proceed.para(data);
    let fullUrl = newUrl + "?" + qs(newData); //https://pan.baidu.com/rest/2.0/xpan/file?access_token=xxxxxxxx&dir=
 
    if (cfg.debug) {
        log(fullUrl)
    }
    let res = http.get(fullUrl, {
        headers: proceed.head(head)
    });
    if (res.statusCode !== 200) {
 
        return null
    }
    // log("statusCode=" + res.statusCode)
    // log("body=" + res.body.string())
    return proceed.resp(res)
 
}
*/
req.POST = (url, data, head, prceed) => { }
req.setTimeOut = (timeOut) => { }
module.exports = req

function log_function(str) {
    log("===" + str + "===")
}