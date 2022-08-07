/**
 * 必须库
 */
let req = require("./util/api/qHttpRequestProceed")
let { default: n } = require("./ts/n.js");
let { secex } = require("./util/api/q");
let { newMiddleware } = require("./util/api/qHttpRequestProceed");

let baiduReqMiddle = req.newMiddleware("https://pan.baidu.com"
    , { 'User-Agent': 'pan.baidu.com' }
    , { "access_token": "123.de0405292865b7e5371395a920272f44.Yao6mavGPBdRlEaUvIvqh7rxbnN-OPyq-7oEr7x.-vFdIA" }
    , null)

api = {}
api.panBaidu = {
    /**
     * @param {*} dir 
     * @returns 
     */
    getFileList: function (dir) {
        let body = req.get("/rest/2.0/xpan/file", { dir: dir, method: 'list' }, null, baiduReqMiddle)
        return body
    },
    /**
     * 
     * @param {*} dir 
     * @returns string [fsid,fsid]
     */
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
            console.log("🚀 ~ file: panbaiduApi.js ~ line 49 ~ arr", "文件数为0")
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
        console.log("🚀 ~ file: panbaiduApi.js ~ line 64 ~ fsid", fsid)
        let ret = this.panBaidu.getDownLoadUrlAllByFsidArray("[" + fsid + "]")
        if (ret != undefined) {
            for (let key in ret[0]) {
                return ret[0][key]
            }
        }
        return null
    },
    /**
     * 
     * @param {*} fs_idArray 
     * @returns array [ { filename:downloadUrl } ]
     */
    getDownLoadUrlAllByFsidArray: (fs_idArrayString) => {
        let body = req.get("/rest/2.0/xpan/multimedia"
            , { method: 'filemetas', fsids: fs_idArrayString, dlink: 1 }
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
            console.log("🚀 ~ file: panbaiduApi.js ~ line 93 ~getDownLoadUrlAllByFsidArray undefined", "")
            return null
        }
        if (arr[0] == null) {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 94 ~ arr", "文件数为0")
            return null
        }
        console.log("🚀 ~ file: panbaiduApi.js ~ line 103 ~ getDownLoadUrlAllByFsidArray-suc.."
            , arr[0].toString())
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
     * @param {*} panPath 
     */
    getDownUrlByPath: (panPath) => {

        let arr = panPath.split("/")
        if (arr.length < 2) {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 120 ~  getDownUrlByPath length", length)
            secex(5, "downLoadFileByPath-网盘路径格式错误" + panPath)
            return null
        }
        let filename = arr[arr.length - 1]
        let panPathRoot = ""
        console.log("🚀 ~ file: panbaiduApi.js ~ line 126 ~ filename", filename)

        for (let i = 1; i < arr.length - 1; i++) {
            panPathRoot = panPathRoot + "/" + arr[i]
        }
        console.log("🚀 ~ file: panbaiduApi.js ~ line 131 ~ panPathRoot", panPathRoot)

        let allFsid = this.panBaidu.getFileListAllFsid(panPathRoot)

        let allDownUrl
        if (allFsid) {
            allDownUrl = this.panBaidu.getDownLoadUrlAllByFsidArray(allFsid)
        } else {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 138 ~ downLoadFileByPath", "get-all-fsid-fail")
            n.secex(5, "get-all-fsid-fail")
            return null
        }

        let downUrl
        if (allDownUrl) {
            for (let idx in allDownUrl) {
                if (allDownUrl[idx][filename] != undefined) {
                    downUrl = allDownUrl[idx][filename]
                    console.log("🚀 ~ file: panbaiduApi.js ~ line 152 ~ downUrl suc..\n", downUrl)
                    return downUrl
                }
            }

        } else {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 154 ~ downLoadFileByPath", "get-down-url-fail")
            n.secex(5, "get-down-url-fail")
        }

        return null

    },
    /**
     * 
     * @param { 网盘路径 } path 
     */
    downLoadFileByPath: (panPath, localPath) => {
        let downUrl = this.panBaidu.getDownUrlByPath(panPath)

        if (downUrl) {
            return this.panBaidu.downLoadFileByDownUrl(downUrl, localPath)
        } else {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 171 ~ downUrl", downUrl)
        }

    },
    downLoadStringByPath: (panPath) => {
        let downUrl = this.panBaidu.getDownUrlByPath(panPath)
        if (downUrl) {
            return this.panBaidu.downLoadStringByUrl(downUrl)
        } else {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 180 ~ downLoadStringByPath", downUrl)
            return null
        }
    },
    /**
     * 
     * @param {*} panPath 
     * @param {*} localPath 
     * @returns string 直接返回string
     */
    downLoadFileString: (panPath, localPath) => {
        let arr = panPath.split("/")
        if (arr.length < 2) {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 187 ~ length", length)
            secex(5, "downLoadFileByPath-网盘路径格式错误" + panPath)
            return null
        }
        let filename = arr[arr.length - 1]
        let panPathRoot = ""
        console.log("🚀 ~ file: panbaiduApi.js ~ line 193 ~ filename", filename)

        for (let i = 1; i < arr.length - 1; i++) {
            panPathRoot = panPathRoot + "/" + arr[i]
        }
        console.log("🚀 ~ file: panbaiduApi.js ~ line 198 ~ panPathRoot", panPathRoot)

        let allFsid = this.panBaidu.getFileListAllFsid(panPathRoot)

        let allDownUrl
        if (allFsid) {
            allDownUrl = this.panBaidu.getDownLoadUrlAllByFsidArray(allFsid)
        } else {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 206 ~ downLoadFileByPath", "get-all-fsid-fail")
            n.secex(5, "get-all-fsid-fail")
            return null
        }

        let downUrl
        if (allDownUrl) {
            for (let idx in allDownUrl) {
                if (allDownUrl[idx][filename] != undefined) {
                    downUrl = allDownUrl[idx][filename]
                }
            }

        } else {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 220 ~ downLoadFileByPath", "get-down-url-fail")
            n.secex(5, "get-down-url-fail")
        }

        if (downUrl) {
            return this.panBaidu.downLoadFileByDownUrl(downUrl, localPath)
        } else {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 227 ~ downUrl", downUrl)
        }

    },

    downLoadFileByDownUrl: (url, path) => {
        toast("beginDownLoad-url=" + url
            + "\npath=" + path)
        let body = req.get(url + "&" + req.qs(baiduReqMiddle.para)
            , null
            , baiduReqMiddle.head
            , req.newMiddleware(null, null, null, null, true
            )
        )
        if (body) {
            toast("downLoadFileByDownUrl-suc..begin write data " + path)
            files.writeBytes(path, body)
            console.log("🚀 ~ file: panbaiduApi.js ~ line 244 ~ downLoadFileByDownUrl-suc..", path)
            return true
        } else {
            console.log("🚀 ~ file: panbaiduApi.js ~ line 247 ~\n downLoadFileByDownUrl false", "")
            return false
        }

    },
    /**
     * 
     * @param {*} url 
     * @returns string 直接返回下载文件string
     */
    downLoadStringByUrl: (url) => {
        toast("downLoadGetStringByUrl-url=" + url)
        let body = req.get(url + "&" + req.qs(baiduReqMiddle.para)
            , null
            , baiduReqMiddle.head
            , newMiddleware("")
        )
        console.log("🚀 ~ file: panbaiduApi.js ~ line 275 ~ downLoadStringByUrl suc..=", body)
        return body
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
                    console.log("🚀 ~ file: panbaiduApi.js ~ line 296 ~ ,\ndownLoadAllFileByRootPath ~ downPath", downPath)
                    console.log("🚀 开始下载====================>", downPath)
                    boolDown = this.panBaidu.downLoadFileByDownUrl(downUrl, downPath)

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


}
module.exports = api


