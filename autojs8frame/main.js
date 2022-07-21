//"ui";

const q = require("./util/api/qHttpRequestProceed.js");
const u = require("./ui.js");
let { default: n2 } = require("./ts/n.js");
const { panBaidu } = require("./panbaiduApi.js");

// let ret = panBaidu.downLoadAllFileByRootPath("/scriptAutojs", "/sdcard")
// log(ret)

//panBaidu.downLoadFileByPath("/scripAutojs/scriptConfig.txt")

// log("=========")
// for (let key in ret) {
//     for (let key2 in ret[key]) {
//         let fsid = ret[key][key2]
//         let ret2 = panBaidu.getDownLoadUrlAllByFsid(fsid)
//         log(ret2)
//     }
//     log("-----------")
// }
// log("=========")
panBaidu.downLoadFileByPath("/scriptAutojs/scriptConfig/1.txt", "")

function testDown() {

    let test = panBaidu.getFileListAllFsid("/scriptUp")
    log("test toString=" + test.toString())
    let dlink = panBaidu.getDownLoadUrlAllByFsidArray(test)

    dlink.forEach(element => {
        for (let key in element) {
            console.log("🚀 ~ file: main.js ~ line 25 ~ key", key + "," + element[key])
        }
    })

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

function main() {

    toast("run...")
    log("run")

}

