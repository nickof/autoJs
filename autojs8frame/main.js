
//"ui";
// const q = require("./util/api/qHttpRequestProceed.js")
// const u = require("./ui.js");
let { default: n2main } = require("./ts/n.js");
let { panBaidu } = require("./panbaiduApi.js");

/**scriptConfig */
let configScript = {
    //对应网盘路径  
    pathRoot: "/scriptAutoJs"
    //
    ,
    /** 全局脚本配置 json /scriptAutojs/configMain.txt
     *  name:待执行脚本名
     */
    pathConfigMain: "",
    //根据$pathConfigMain读取的配置文件读取到待执行脚本目录
    scriptName: "",
    //脚本版本 根据$pathConfigMain读取的配置文件读取到待执行脚本目录的脚本版本
    panScriptVer: "",
    //网盘下载脚本路径/scriptAutojs/$scriptName
    pathDownLoadScPath: "",
    /** 脚本配置 json /scriptAutojs/$scriptName/scriptConfig.txt
     * main:main.js 脚本主要入口
     */
    pathLocalRoot: "/sdcard/Scripts",
    localScritpVer: "",
    pathConfigScript: "",
    //本地脚本路径
    pathLocalScript: ""
    //脚本主入口本地路径 /Scripts/scriptAutojs/$scriptName/$pathConfigScript.main
    , pathLocalScriptMain: ""

}
/**scriptConfig */
// let a = panBaidu.getFileList("/scriptAutojs/test")
// let res = http.get("https://pan.baidu.com/doc/edit?action=edit&channel=00000000000000000000000000000000&errmsg=Auth%20Login%20Sucess&errno=0&from=guanjia&fsid=884487022435144&path=%2FscriptAutoJs%2Ftest%2FscriptConfig.PanD&ssnerror=0")
// log(res.body.string())

//exit()

const main = () => {

    while (init_conifig_script() == null) { }

    while (true) {

        if (configScript.localScritpVer == undefined) {
            n2main.secex(3, "check local ver fail,begin download from " + configScript.pathDownLoadScPath)
            downPanScriptToLocal(configScript.pathDownLoadScPath)
            break
        } else if (configScript.panScriptVer != configScript.localScritpVer) {
            n2main.secex(3, "panVer=" + configScript.panScriptVer + ",\n"
                + "local ver=" + configScript.localScritpVer + "\n updateScript="
                + configScript.pathDownLoadScPath)
            downPanScriptToLocal(configScript.pathDownLoadScPath)
            break
        } else {
            n2main.secex(1, "no need to updateScript")
            break
        }

        sleep(500)
    }
    console.log("🚀 ~ file: main.js ~ line 66 ~ main ~ pathLocalScriptMain\n"
        , configScript.pathLocalScriptMain)
    engines.execScriptFile( configScript.pathLocalScriptMain )


}



main()

/**scriptConfig*/
//panBaidu = panBaidu.panBaidu
//panBaidu.downLoadFileByPath("/scriptAutojs/22.txt", "/sdcard/22.txt")
// n2main.secex(5, configScript.pathConfigMain)

function getConfigMain() {

    let configMain
    while (true) {

        toast("get scrtipt name")
        let stringConfig = panBaidu.downLoadStringByPath(configScript.pathConfigMain)
        if (stringConfig) {

            configMain = JSON.parse(stringConfig)
            console.log("🚀 ~ file: main.js ~ line 52 ~ getConfigMain ~ configMain~suc..", configMain)
            return configMain
            // if (scName.name != undefined) {
            //     console.log("🚀 ~ file: main.js ~ line 32 ~ getScriptPath ~ scName", scName.name)
            //     return scName.name
            // } else {
            //     n.secex(5, "err-getScriptName-json-not have script name key")
            // }
            break
        } else {
            n2main.secex(5, "getScriptPath-err")
        }
        sleep(500)

    }

}

function getConfigScript() {

    let configScript_
    while (true) {

        toast("get getConfigScript ")
        let stringConfig = panBaidu.downLoadStringByPath(configScript.pathConfigScript)
        if (stringConfig) {
            configScript_ = JSON.parse(stringConfig)
            console.log("🚀 ~ file: main.js ~ line 80 ~ getScriptConfig ~ configScript.suc..", configScript_)
            return configScript_

        } else {
            n2main.secex(5, "getLocalScriptMainName-err=\npath=" + configScript.pathConfigScript
                + "\n" + stringConfig)
        }
        sleep(500)

    }

}

function getSciptVer(scriptConfig) {
    if (scriptConfig.ver != undefined) {
        return scriptConfig.ver
    } else {
        n2main.secex(5, "scriptConfig-ver-json-err-do not have key ver-err")
        return null
    }
}

function getScName(configMain) {

    if (configMain.name != undefined) {
        return configMain.name
    } else {
        n2main.secex(5, "scriptName-json-err-do not have key name-err")
        return null
    }
}

function getScriptMainName(scriptConfig) {

}

function getJsonVByObj(jsonObj, key) {
    if (jsonObj[key] != undefined) {
        return jsonObj[key]
    } else {
        n2main.secex(5, " getJsonVByObj-err-do not have key " + key)
        return null
    }
}

function downPanScriptToLocal(pathPan) {
    panBaidu.downLoadAllFileByRootPath(pathPan, configScript.pathLocalRoot)
}

function init_conifig_script() {

    // 全局脚本设置 对应网盘/ scriptAutojs / configMain.txt
    /**
     * name:待执行脚本名
     */
    configScript.pathConfigMain = configScript.pathRoot + "/configMain.txt"

    let configMain = getConfigMain()
    configScript.scriptName = getScName(configMain)
    if (configScript.scriptName == null) {
        return null
    }
    configScript.pathDownLoadScPath = configScript.pathRoot + "/" + configScript.scriptName
    configScript.pathConfigScript = configScript.pathRoot
        + "/" + configScript.scriptName
        + "/scriptConfig.txt"

    console.log("🚀 ~ file: main.js ~ line 166 ~ init_conifig_script ~ pathConfigScript", configScript.pathConfigScript)

    let scriptConfig = getConfigScript()
    //ver
    let ver = getSciptVer(scriptConfig)
    if (ver) {
        configScript.panScriptVer = ver
    } else {
        return null
    }
    //ver

    //scriptMainName
    let scriptMainName = getJsonVByObj(scriptConfig, 'main')
    if (scriptMainName == undefined) {
        return null
    }

    configScript.pathLocalScript = configScript.pathLocalRoot
        + configScript.pathRoot
        + "/" + configScript.scriptName

    configScript.localScritpVer = getLocalScriptVer()

    //本地脚本路径 
    configScript.pathLocalScriptMain = configScript.pathLocalScript
        + "/" + scriptMainName

    //,scriptName: "",
    // pathConfigMain: "",
    // pathConfigScript: ""
    //,pathLocalScriptMain: ""
    return true

}

function getLocalScriptVer() {

    if (!files.exists(configScript.pathLocalScript + "/scriptConfig.txt")) {
        n2main.secex(5, "localScript config file not exist,may be first run.")
        return null
    }

    let str = files.read(configScript.pathLocalScript + "/scriptConfig.txt")
    if (str != undefined) {
        let jobj = JSON.parse(str)
        let ver = getJsonVByObj(jobj, 'ver')
        if (ver == undefined) {
            n2main.secex(5, "getLocalScriptVer ver-err-ver null,maybe json do not have key ver")
        } else
            n2main.secex(3, "get local script ver suc..ver=" + ver)
        return ver
    }
}

//panBaidu.panDownLoad(dlink[0])
// let panBaidu = {
//     publicPara: {
//         "access_token": "123.de0405292865b7e5371395a920272f44.Yao6mavGPBdRlEaUvIvqh7rxbnN-OPyq-7oEr7x.-vFdIA"
//     }
//     , publicH: {
//         "User-Agent": "pan.baidu.com"
//     }
//     //http://pan.baidu.com/rest/2.0/xpan/multimedia?
//     , httpGetInfo: {
//         "url": "http://pan.baidu.com/rest/2.0/xpan/multimedia?"
//         , para: {
//             "method": ""
//             , "fsids": ""
//         }
//     }
//     , httpGetFileListInfo: {
//         "url": "https://pan.baidu.com/rest/2.0/xpan/file?"
//         , para: {
//             "method": "list"
//             , "access_token": ""
//             , "dir": ""
//         }
//         , h: { "User-Agent": "pan.baidu.com" }
//     }
// }

//log(q.objGetString(panBaidu.httpGetFileListInfo))
//q.httpGetObj(panBaidu.httpGetFileListInfo, 5000);


