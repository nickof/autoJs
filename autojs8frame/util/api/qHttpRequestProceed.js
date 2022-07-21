const { default: n } = require("../../ts/n.js");

const cfg = {
    debug: false
    , timeOut: 60000
}

const req = {}
/**
 * 
 * @param {*为空则取url} host 
 * @param {*publicHead {} } head 
 * @param {*publicPara} para 
 * @param {*} timeOut 
 * @returns 
 */
req.newMiddleware = (host, head, para, timeOut, bytes) => {

    log_function("newMiddleware")

    let err = null
    let functionName = "newMiddleware "

    if (host == undefined) {
        host = ""
    } else if (typeof host !== "string") {
        err = functionName + "host type err,need string"
    }
    log(host)

    if (typeof head == undefined) {
        // head = null
    }
    else if (typeof head != "object") {
        err = functionName + "head type err,type=" + typeof head + "need object"
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

    log_function("newMiddleware")

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
    }
    return url
}


req.get = (url, data, head, newMiddleware) => {

    log_function("req.GET")
    log(newMiddleware.err)

    if (newMiddleware.err != null) {
        n.secex(5, err)
        return null
    }

    //log_function("GET")
    http.__okhttp__.setTimeout(newMiddleware.timeOut);
    let newUrl;
    if (newMiddleware.host != "") {
        newUrl = newMiddleware.host + url
    } else {
        newUrl = url
    }

    newUrl = urlHttpProceed(newUrl)
    //log(newUrl)

    let newData = {}
    if (newMiddleware.para != null) {
        for (let key in newMiddleware.para) {
            newData[key] = newMiddleware.para[key]
        }
    }

    for (key in data) {
        newData[key] = data[key]
    }

    let fullUrl
    if (data == null && newMiddleware.para == null) {
        fullUrl = newUrl
    } else {
        fullUrl = newUrl + "?" + req.qs(newData)  //https://pan.baidu.com/rest/2.0/xpan/file?access_token=xxxxxxxx&dir=
    }

    console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 121 ~ fullUrl\n", fullUrl)

    let newHead = {}
    if (newMiddleware.head != null) {
        for (key in newMiddleware.head) {
            newHead[key] = newMiddleware.head[key]
        }
    }

    if (head != undefined) {
        for (key in head) {
            newHead[key] = head[key]
        }
    }

    if (newHead != null) {
        for (let key in newHead) {
            console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 138 ~ newHead\n", key + ":" + newHead[key])
        }
    }

    let res = http.get(fullUrl, {
        headers: newHead
    });

    //
    if (res.statusCode !== 200) {
        let body = res.body.string()
        console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 149 ~ statusCode-err", res.statusCode + "\n"
            + "url=" + fullUrl
            + "\nbody=" + body)
        return null
    }

    let body
    if (newMiddleware.bytes == undefined) {
        body = res.body.string()
        console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 156 ~ body\n", body)
    } else {
        body = res.body.bytes()
        console.log("🚀 ~ file: qHttpRequestProceed.js ~ line 159 ~ get return bytes", "")
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


