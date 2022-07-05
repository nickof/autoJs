"ui";
const u = require("./ui.js");
u.ui_set();
const { default: n } = require("./ts/n.js");

let panBaidu = {
    httpGetGetFileListInfo: {
        "url": "https://pan.baidu.com/rest/2.0/xpan/file?"
        , "para": {
            "method": "list"
            , "access_token": this.accessToken
            , "dir": ""
        }
        , "h": { "User-Agent": "pan.baidu.com" }
    }
    , accessToken: "123.de0405292865b7e5371395a920272f44.Yao6mavGPBdRlEaUvIvqh7rxbnN-OPyq-7oEr7x.-vFdIA"
}



u.wait_start_script(main)

function main() {

    toast("run...")
    log("run")

}

