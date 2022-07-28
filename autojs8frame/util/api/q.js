const qEx = {}
qEx.objGetString = objGetString
qEx.secex = (sec, str) => {
    let t = sec
    for (let i = 0; i < sec; i++) {
        toast(str + "\n" + "sec:" + t--)
    }
}
///scriptAutoJs/test/util/api/qHttpRequestProceed.js
module.exports = qEx


// let panBaidu = {
//     httpGetGetFileListInfo: {
//         accessToken: "123.de0405292865b7e5371395a920272f44.Yao6mavGPBdRlEaUvIvqh7rxbnN-OPyq-7oEr7x.-vFdIA"
//         , "url": "https://pan.baidu.com/rest/2.0/xpan/file?"
//         , "para": {
//             "method": "list"
//             , "access_token": access_token
//             , "dir": ""
//         }
//         , "h": { "User-Agent": "pan.baidu.com" }
//     }

// }


function objGetString(obj) {

    log_function("objGetString")
    let strPara = "";
    let para = obj.para

    for (let key in para) {
        //log(key)
        //log("type=" + typeof para[key])
        strPara = strPara + key + "=" + para[key] + "&"
    }

    strPara = strPara.substring(0, strPara.length - 1)
    strPara = obj.url + strPara
    log("objGetString=" + strPara)
    log_function("objGetString")
    return strPara

}


/**
 * 
 * @param {*} httpObj     , httpGetGetFileListInfo: {
        "url": "https://pan.baidu.com/rest/2.0/xpan/file?"
        , para: {
            "method": "list"
        }
        , h: { "User-Agent": "pan.baidu.com" }
    }
 * @param {*} timeOut 
 */
function httpGetObj(httpObj, timeOut) {

    log_function("httpGetObj")

    if (timeOut != null) {
        http.__okhttp__.setTimeout(timeOut);
    }
    let res;

    if (httpObj["h"] != null) {
        res = http.get(objGetString(httpObj), {
            headers: httpObj.h
        }
        )
    } else {
        res = http.get(objGetString(httpObj))
    }

    log("statusCode=" + res.statusCode)
    log("body=" + res.body.string())
    // return res.body.string(  )

    log_function("httpGetObj")
    // log("code = " + r.statusCode);
    // log("html = " + r.body.string());

}

function prceedBody() {

}

function log_function(str) {
    log("===" + str + "===")
}