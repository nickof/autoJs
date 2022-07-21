/**
 * 必须库
 */
const req = require("./util/api/qHttpRequestProceed")
const { default: n } = require("./ts/n.js");
const { secex } = require("./util/api/q");

const baiduReqMiddle = req.newMiddleware("https://pan.baidu.com"
    , { 'User-Agent': 'pan.baidu.com' }
    , { "access_token": "123.de0405292865b7e5371395a920272f44.Yao6mavGPBdRlEaUvIvqh7rxbnN-OPyq-7oEr7x.-vFdIA" }
    , null)

api = {}
api.panBaidu = {
    /**
     * 
     * @param {*} dir 
     * @returns 
     */
    getFileList: function (dir) {
        let body = req.get("/rest/2.0/xpan/file", { dir: dir, method: 'list' }, null, baiduReqMiddle)
        return body
    },

    getFileListAllFsid: function (dir) {
        //rlog.log_function("getFileListAllFsid")
        let body = req.get("/rest/2.0/xpan/file", { dir: dir, method: 'list' }, {}, baiduReqMiddle)
        if (body == null) {
            return null
        } else {
            body = JSON.parse(body)
        }

        let arr = []
        body.list.forEach(element => {
            // log(element)
            arr.push(element.fs_id)
        });
        if (arr[0] == null) {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 47 ~ arr", "文件数为0")
            return null
        } else {
            arr = "[" + arr.toString() + "]"
        }
        log("getFileListAllFsid=arr-toString" + arr.toString())

        return arr
    },
    /**
     * 
     * @param {*} fsid 
     * @returns 
     */
    getDownLoadUrlAllByFsid: (fsid) => {
        console.log("🚀 ~ file: panbaiduApi.js ~ line 46 ~ fsid", fsid)
        let ret = this.panBaidu.getDownLoadUrlAllByFsidArray("[" + fsid + "]")
        if (ret != undefined) {
            for (let key in ret[0]) {
                return ret[0][key]
            }
        }
        return null
    }
    /**
     * fs_idArray:[ fsid ]
    return:[ "filename":"url" ] 
    */
    , getDownLoadUrlAllByFsidArray: (fs_idArray) => {
        let body = req.get("/rest/2.0/xpan/multimedia"
            , { method: 'filemetas', fsids: fs_idArray, dlink: 1 }
            , null, baiduReqMiddle)
        let arr = []
        if (body) {
            body = JSON.parse(body)
            body.list.forEach(element => {
                // log("element=" + element)
                let obj = {}
                let key = element["filename"]
                obj[key] = element["dlink"]
                arr.push(obj)
            });
        } else if (body == undefined) {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 61 ~getDownLoadUrlAllByFsidArray undefined", "")
            return null
        }
        if (arr[0] == null) {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 94 ~ arr", "文件数为0")
            return null
        }
        return arr
    }
    , panDownLoad: (downUrl, path) => {
        let body = req.get(downUrl + "&" + req.qs(baiduReqMiddle.para)
            , null
            , baiduReqMiddle.head
            , req.newMiddleware(null, null, null, null)
        )
        if (body) {
            files.write(path, body)
        }
    },

    /**
     * 
     * @param { 网盘路径 }} path 
     */
    downLoadFileByPath: (panPath, localPath) => {
        let arr = panPath.split("/")
        if (arr.length < 2) {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 108 ~ length", length)
            secex(5, "downLoadFileByPath-网盘路径格式错误" + panPath)
            return null
        }
        let filename = arr[arr.length - 1]
        let panPathRoot = ""
        console.log("🚀 ~ file: panbaiduApi.js ~ line 108 ~ filename", filename)

        for (let i = 1; i < arr.length - 1; i++) {
            panPathRoot = panPathRoot + "/" + arr[i]
        }
        console.log("🚀 ~ file: panbaiduApi.js ~ line 121 ~ panPathRoot", panPathRoot)

    }
    , downLoadFileByDownUrl: (url, path) => {

        let body = req.get(url + "&" + req.qs(baiduReqMiddle.para)
            , null
            , baiduReqMiddle.head
            , req.newMiddleware(null, null, null, null, true
            )
        )
        if (body) {
            files.writeBytes(path, body)
            return true
        } else {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 109 ~\n downLoadFileByDownUrl false", "")
            return false
        }

    },
    /**
     * 下载百度网盘下指定路径下所有文件
     * Download all files specified in Baidu network disk
     * @param {ex:"/scriptAutojs"} panPath 
     * @param {ex:"/sdcard"} localPath 
     * @returns true/false
     */
    downLoadAllFileByRootPath: (panPath, localPath) => {
        boolDown = false
        let ret = panBaidu.getListAllFilePathFisd(panPath)
        if (ret) {
            let count = ret.length
            for (let key in ret) {
                for (let keyPath in ret[key]) {
                    let fsid = ret[key][keyPath]
                    let downUrl = panBaidu.getDownLoadUrlAllByFsid(fsid)
                    let downPath = localPath + keyPath

                    files.createWithDirs(downPath)
                    console.log("🚀 ~ file: panbaiduApi.js ~ line 121 ~ ,\ndownLoadAllFileByRootPath ~ downPath", downPath)
                    console.log("🚀 开始下载====================>", downPath)
                    boolDown = this.downLoadFileByDownUrl(downUrl, downPath)

                    toast("开始下载=====剩余" + count--)
                    if (!boolDown) {
                        return false
                    }
                }
            }
        } else {
            return false
        }
        return boolDown

    },
    getListAllFilePathFisd: (path) => {
        let body = req.get("/rest/2.0/xpan/multimedia", {
            method: 'listall', path: path, recursion: 1
        }, null, baiduReqMiddle)
        let retArr = []
        if (body) {
            body = JSON.parse(body)

            body.list.forEach(element => {
                if (element.isdir == 0) {
                    let obj = {}
                    obj[element.path] = element.fs_id
                    // console.log("🚀 ~ file: panbaiduApi.js ~ line 96 ~ element\n",
                    //     element.path + "," + element.fs_id)
                    retArr.push(obj)
                }
            });
        } else if (body == undefined) {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 100 ~ undefined", "getListAllFilePathFisd undefined")
            return null
        }

        if (retArr[0] == null) {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 105 getListAllFilePathFisd~ retArr ", "文件数为0")
            return null
        }
        return retArr

    }
    , downLoadFileByFsid: (fsid, path) => {

    }

}
module.exports = api


