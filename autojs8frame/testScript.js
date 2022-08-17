"ui";

let { default: n } = require("./ts/n.js");
var logUi
let ui_ = require("./ui.js");
var mainThr, interval, watchThr

// wait_startScript()
// ui_.ui_set()

function init() {
    //textContains("")
}
ui_.waitStartScript(main, 8000)

//startScript(main)
// while (!ui_.scriptAuto) {
//     sleep(1000)
// }
// main()

// function startScript(funMain) {

//     let tp = threads.start(function () {
//         while (!ui_.scriptAuto) {
//             log(ui_.scriptAuto + "....")
//             sleep(1000)
//         }

//         main()
//     })
// }

function main_control() {

    toast("start script")
    auto()

    while (true) {

        log("script-running.")
        let ret = n.wait(descContains("1"))
        if (ret) {
            log( ret.bounds() )
        }

        sleep(2000)
   
    }

    
}

function show(text) {

    thrLog = threads.start(function () {
        if (!logUi) {
            logUi = floaty.window(
                <frame gravity="center"  >
                    <text id="text" textColor="#00ff00"></text>
                </frame>
            );
            logUi.text.setText(text)
            setTimeout(() => {
                logUi.close();
                logUi = null
            }, 2000);
        } else {
            logUi.close()
            logUi = floaty.window(
                <frame gravity="center"  >
                    <text id="text" textColor="#00ff00"></text>
                </frame>
            );
            logUi.text.setText(text)
            setTimeout(() => {
                logUi.close();
                logUi = null
            }, 2000);
        }
    })

}


function main() {
    log("main")


    if (!mainThr) {
        //main_control()
        ///logAndShow("thread start...")
        mainThr = threads.start(main_control)
    } else { logAndShow("主线程在运行了..") }

    if (!watchThr) {
        watchThr = threads.start(watch)
    }

}

function logAndShow(text) {
    log(text)
    //show(text)
}



function boolRunScript() {
    log("boolRunScript")
    if (ui_.scriptAuto) {
        clearInterval(interval)
        main()
    } else {
        log("boolRunScript-ui_.scriptAuto=" + ui_.scriptAuto)
    }
}


function watch() {
    while (true) {
        log("watch thread run")
        sleep(2000)
    }
}
