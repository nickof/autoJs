// const { default: n } = require("./ts/n.js");

"ui";
let u = require("./ui.js");
let { default: n } = require("./ts/n.js");

//const s = require("./log_.js");
//const { sp_main, sp_rola_adr, sp_hardware, sp_model, sp_reg_mode, sp_country_firefox } = require("./ui.js");
let thrMain, interval, thrWatch
thrShareT1Reg = Date.now()

//exit()
u.waitStartScript(main, 8000)


var envCurCountry, envCurPhone, verifyCodePar
function init() {

    init_ui()
    init_ly()
    init_rui()
    tp_init()

    verifyCodePar
        = id("jp.naver.line.android:id/code_verification_real")

    configRegNum = 0
    configRegFailNum = 0
    pathScript = "/sdcard/nk/script.txt"
    files.ensureDir(pathScript)
    files.write(pathScript, "1");
    log("读取启动文本=" + files.read(pathScript))
    //  log_init()

}

var sp_main, sp_model, sp_ip, sp_rola_adr, sp_hardware, sp_country_firefox
function init_ui() {

    log(u.sp_main)
    sp_main = u.readUi(u.sp_main)
    sp_model = u.readUi(u.sp_model)
    sp_ip = u.readUi(u.sp_ip)
    sp_rola_adr = u.readUi(u.sp_rola_adr)
    sp_hardware = u.readUi(u.sp_hardware)
    sp_reg_mode = u.readUi(u.sp_reg_mode)
    sp_country_firefox = u.readUi(u.sp_country_firefox)

    log("ui-----------------------------")
    log("sp_main-" + sp_main)
    log(sp_model)
    log(sp_ip)
    log(sp_rola_adr)
    log(sp_hardware)
    log(sp_reg_mode)
    log(sp_country_firefox)

}

function main_control() {

    auto()
    toast("start script")
    test()

    while (true) {

        log("script-running.")
        //let ret = n.wait(text("保存设置"))
        // if (ret) {
        //     logAndShow(ret.bounds())
        // } else {
        //     logAndShow("未找到")
        // }
        sleep(2000)

    }

}


function main() {

    init()

    log("main")
    //clearInterval(interval)
    // let ret = n.wait([{ "dC": "微信" }])
    // if (ret) {
    //     log(ret.bounds())
    // } else
    //     log("not found.")

    if (!thrMain) {
        thrMain = threads.start(main_control)
    } else { logAndShow("主线程在运行了..") }

    // if (!thrWatch) {
    //     thrWatch = threads.start( watch )
    // }

}

function regLineGenearal(key, sec) {

    let pas, ret, tp, tpTxt, t1
    let tpTb
    let phone_, smsBlackNeedPara
    env_errSms = ""

    thrShareT1Reg = now()
    let boolGetPhone = 0
    let boolLoading = 0
    ErrTimeSTelInvalid = 0
    let boolEnter = 0
    let boolProgress = 0
    let boolRetry = 0
    let phoneSearia
    let funRet = false

    launch(appLine)
    n.wait(dd登陆line, 10)

    while (true) {

        log("regLineGenearal")
        if (n.c(dd登陆line)) {
            bool_line_GoRound()
        }
        if (n.c(yy用电话)) {
            n.wait_grp([qq确认sms, countryLine])
        }

        if (n.c(notNow)) {
            n.wait_grp([countryLine, yy允许, perMissionAllowed])
        }
        n.c_wait(notNow, countryLine)
        //node.wait_true_ex( qq确认sms, countryLine )
        ret = n.g(countryLine)

        if (ret) {

            if (boolGetPhone == 0) {

                tp = get_phone_genearal(key)
                if (tp) {

                    logAndShow("serial-" + tp[1])
                    phone_ = tp[0].replace("+", "")
                    smsBlackNeedPara = tp[1]
                    boolGetPhone = 1
                    logAndShow("regLineGenearal phone=" + phone_)

                }

            }

            if (boolGetPhone == 1) {

                record_phone(phone_)
                input_phone_all(phoneEdit, phone_)

            }

        }

        tp = bool_qq确认()
        logAndShow("确认=" + tp)

        if (tp == "暂不能验证") {
            logAndShow("暂不能验证")
            if (phone_ && !n.g(yy验证码框)) {
                release_tel_genaral(key, smsBlackNeedPara)
                add_black_genaral(key, smsBlackNeedPara)
                envPhoneImsi = False
                home()
                closeApp(appLine)
                sleep(500)
                app.launchPackage(appLine)
                n.wait(dd登录line)
            } else {
                boolEnter++

            }
            boolGetPhone = 0
        } else if (tp == "号码无效") {
            boolGetPhone = 0
            if (phone_) {
                release_tel_genaral(key, smsBlackNeedPara)
            }
            ErrTimeSTelInvalid++
            logAndShow("号码无效" + ErrTimeSTelInvalid)
        }

        n.c_wait(qq确认sms, yy验证码框)

        if (boolEnter > 5) {
            toast("超过5次不能进入,重新初始化")
            logAndShow("超过5次不能进入,重新初始化")
        }

        ret = n.get(yy验证码框)
        if (ret) {
            envRegState = envRegState_SmsBefore
            logAndShow("输入验证码")
            sms = get_sms_genaral(key, smsBlackNeedPara)
            envCurPhone = phone_

            if (sms = "outtime") {
                thrShareT1Reg = now()
                add_black_genaral(key, smsBlackNeedPara)
                break
            } else {
                if (sms != "" && !sms) {

                }

            }

        } else {

        }

    }
}

function sms_input(text2) {

    setClip(text2)
    //text("Paste").findOnce().click()
    desc("Paste").findOnce().click()
    // let c = n.g(verifyCodePar)
    // if (c) {
    //     n.boolConditionOrUiobj(c)
    // }
    // exit()

    let xy = n.g_r_rect(verifyCodePar)
    if (xy) {
        longClick(xy[0], xy[1])
    }

    log("finish")
    // if (r) {
    //     for (let index = 0; index < 6; index++) {
    //         //r.child(index).setText( text.charAt(index) )
    //         r.child(index).longClick()
    //         break
    //     }
    // }

}


function release_tel_genaral(key, smsBlackNeedPara) {

}

function add_black_genaral(key, smsBlackNeedPara) {

}

function input_phone_all(condition, text) {

    let r = n.g(condition)
    if (r) {
        if (r.setText(text)) {
            sleep(500)
            if (n.c(xx下一步右下)) {
                n.wait_grp([qq确认, qq确认sms])
                if (n.c_dsp(qq确认sms)) {
                    n.wait_grp([qq确认, qq确认sms, yy验证码框])
                }

            }
        } else {
            logAndShow("input_phone_all-nodeSetText-fail")
        }
    } else {
        logAndShow("no find editPhone")
    }


}

function get_phone_genearal(key) {
    if (key == keyLy) {
        return get_phone_ly()
    }
}

function get_phone_ly() {

    toastLog("get_phone_ly")
    httpGetPhone.token = get_token_ly()
    let retur = null

    let ret, retArr
    ret = n.get(httpGetPhone)
    if (ret) {

        let str = ret.body.string()
        retArr = str.split("|")
        if (retArr[0] == "1") {
            retur = [retArr[3], retArr[3]]
        } else {
            logAndShow("get-phone-err" + retArr[0])
        }

    } else {
        logAndShow("get_phone_ly-fail..")
    }

    return retur

}

function record_phone(phone_) {

}

function get_token_ly() {
    return "16efa449e6905d2dbd83c007da9b0163_8321"
}

function bool_qq确认() {
    let r = ""
    let ret, ret2, ret3, ret4, ret5, ret6, boolS

    for (let i = 0; i < 10; i++) {
        ret = n.g(qq确认)
        ret2 = n.g(qq确认sms)
        ret3 = n.g(qq取消)
        ret4 = n.g(notNow)
        ret5 = n.g(addContacts)

        if (ret == null
            && ret2 == null
            && ret3 == null
            && ret4 == null
            && ret5 == null
            && ret6 == null) {
            break;
        }

        if (ret3 != null && ret5 != null) {
            //判断是否添加通讯录
            if (xlk_reg_mode == 5) {
                n.c(ret5)
            }
            else {
                n.c(ret3)
                n.wait_dsp(addContacts, 2)
            }
        }
        else if (ret4 != null) {
            n.c(ret4)
            n.c_wait(notNow, 2)
        }
        else if (ret != null) {
            boolS = 1
            if (n.g(validNumber) != null) {
                return "号码无效"
            }
            n.c(ret)
            n.c_wait(qq确认, 2)
        }
        else if (ret2 != null) {
            boolS = 1
            if (n.g(validNumber) != null) {
                return "号码无效"
            }
            n.c(ret2)
            n.c_wait(qq确认sms, 2)
        }
    }

    if (envRegState != envRegState_SmsAfter) {
        if (boolS == 1) {

            n.wait_grp([dd登录line, yy验证码框], 1)
            if (n.g(dd登录line) != null) {
                return "暂不能验证"
            }
        }
    }


}

let httpGetPhone, httpGetToken

function endsc() {
    engines.stopAll()
}

function init_ly() {

    let idx = sp_country_firefox - 1
    urlHome = "http://www.firefox.fun/yhapi.ashx?"
    tableLyProIdKey = ["hk", "my", "mo", "ph", "za", "mm", "th", "kh", "id", "ar", "gh", "vn", "gb", "mg", "cn"]
    tableLyProId = { "hk": "1464", "my": "1084", "mo": "4854", "ph": "3276", "za": "5191", "mm": "3549", "th": "5647", "kh": "4294", "id": "3693", "ar": "4431", "gh": "4388", "vn": "4617", "gb": "4129", "mg": "4649", "cn": "0000" }
    lyApiName = "ruifang85"

    iid = tableLyProId[tableLyProIdKey[idx]]
    envCurCountry = tableLyProIdKey[idx]

    log(tableLyProIdKey[idx])
    log("iid=" + iid)


    lyDid = ""

    httpGetToken = { "url": urlHome, "act": "login", "ApiName": lyApiName, "PassWord": "1234qqqq" }
    httpGetPhone = { "url": urlHome, "act": "getPhone", "token": "", "iid": iid, "did": lyDid }
    //httpGetPhone={	"url":urlHome,"act":"getPhone","token":"","iid":"1073","did":"1d307a746e70e93234909f2ce6324cab"}  }  	
    httpGetSms = { "url": urlHome, "act": "getPhoneCode", "token": "", "mobile": "", "iid": iid }
    httpAdd = { "url": urlHome, "act": "addBlack", "token": "", "mobile": "", "reason": "used", "iid": iid }
    httpRelease = { "url": urlHome, "act": "setRel", "token": "", "mobile": "", "iid": iid }
    httpAddBlackly = { "url": urlHome, "act": "setRel", "token": "", "mobile": "", "iid": iid, "reason": "default" }


}

function tp_init() {

    // fill = id("fill")
    // fill = id("fill")
    // fill = id("fill")
    // fill = id("fill")
    // fill = id("fill")
    // fill = id("fill")
    // fill = id("fill")
    // fill = id("fill")
    // fill = id("fill")
    // fill = id("fill")

    phoneEdit = id("jp.naver.line.android:id/edit_text")

    keyPhanto = "phanto"
    keyActi = "acti"
    keyLy = "ly"

    googleVeri = id("recaptcha-anchor")
    android10permissionDenyed = id("com.android.permissioncontroller:id/permission_deny_button")
    android10permissionAllowed = id("com.android.permissioncontroller:id/permission_allow_button")

    noThanks = id("android:id/button2")
    agreeNodeDesc = [desc("Agree"), desc("descContains"), desc("Setuju")]
    agreeNode = [text("Agree"), text("同意"), text("Setuju")]
    okNode = [text("Agree"), text("同意"), text("Setuju")]
    perMissionDeny = id("com.android.packageinstaller:id/permission_deny_button")
    tpWebViewOk = textContains("This service offers")
    tpbutton = text("Information on the places where you have accessed URLs via LINE")
    cc重试失败 = id("jp.naver.line.android:id/welcome_common_button")
    progressBar = id("jp.naver.line.android:id/progress_bar")
    lineHome = id("jp.naver.line.android:id/bnb_home_v2")
    hh好友设置识别 = id("jp.naver.line.android.registration:id/password_reenter")
    progressBar = id("jp.naver.line.android:id/progress_bar")
    checkBoxLine = id("jp.naver.line.android:id/checkbox")
    pasEdit2 = id("jp.naver.line.android.registration:id/password_reenter")
    pasEdit1 = id("jp.naver.line.android:id/edit_text")
    xx下一步右下 = id("jp.naver.line.android.registration:id/next")
    cc叉line_b = id("jp.naver.line.android:id/clear_text")
    editInput = id("jp.naver.line.android:id/edit_text")
    photoRes = id("jp.naver.line.android.registration:id/photo_overlay")
    cc创建新 = id("jp.naver.line.android.registration:id/create_account")
    zz这不是 = id("jp.naver.line.android.registration:id/no")
    tt跳过复原 = id("jp.naver.line.android.registration:id/skip_button")
    yy验证码框 = id("jp.naver.line.android:id/code_verification_real")

    dd登陆line = id("jp.naver.line.android.registration:id/login")
    yy用电话 = id("jp.naver.line.android.registration:id/auth_with_phone_number")
    notNow = [text("Not now")]
    countryLine = id("jp.naver.line.android.registration:id/country_code")
    qq确认sms = id("jp.naver.line.android:id/common_dialog_ok_btn")
    yy用电话 = id("jp.naver.line.android.registration:id/auth_with_phone_number")
    yy允许 = text("允许")
    android10permissionAllowed = id("com.android.permissioncontroller:id/permission_allow_button")
    perMissionAllowed = id("com.android.packageinstaller:id/permission_allow_button")
    qq确认 = id("jp.naver.line.android:id/common_dialog_horizontal_buttons")
    qq取消 = id("jp.naver.line.android:id/common_dialog_cancel_btn")
    addContacts = [text("Add to contacts")]
    validNumber = [textContains("valid phone")
        , textContains("Nomor telepon")]
    envRegState_SmsAfter = 1
    yy验证码框 = id("jp.naver.line.android:id/code_verification_real")

    envRegState_SmsBefore = 0
    envRegState = envRegState_SmsBefore

    thrShareEndScriptEnd = 1
    thrShareEndScriptDefault = 0
    thrShareEndScript = thrShareEndScriptDefault

    thrShareRegFailNum = 0

    thrShareRegStateDefault = 0
    thrShareRegStateStop = 1
    thrShareRegState = thrShareRegStateDefault
    appLine = "jp.naver.line.android"
    appPostern = "com.tunnelworkshop.postern"

    errWindow = [id("android:id/aerr_close")
        , id("android:id/aerr_restart")]
    errReport = id("android:id/aerr_report")
    errAndroidNotNow = id("android:id/autofill_save_no")
    yy允许 = text("允许")

}

function bool_line_GoRound() {

    logAndShow("bool_line_GoRound")

    let t1 = now()
    while (true) {
        logAndShow("bool_line_GoRound")
        if (n.c(dd登陆line)) {
            n.wait_grp([yy用电话, notNow])
        }

        if (n.c_wait(notNow, countryLine)) {
            n.c_dsp(qq确认sms)
        }

        logAndShow("line 加载登陆界面检测")

        log("time=" + now() - t1)
        if (now() - t1 > 28 * 1000) {

            logAndShow("30秒未进入line，重置ip")
            home()
            sleep(500)
            closeApp(appLine)
            sleep(500)
            ip_change_bool()
            return false

        } else {
            logAndShow("line加载检测剩余" + (30 * 1000 - (now() - t1)) + "sec")
        }

        if (n.g(yy用电话) || n.g(countryLine)) {
            return true
        }

        sleep(200)


    }
}

function ip_change_bool() {

}


function now() {
    return Date.now()
}

function log_init() {

    var logUi, thrLog, t1Log
    t1Log = Date.now()
    setInterval(() => {
        log("log-check")
        if (Date.now() - t1Log > 2000) {
            if (logUi) {
                logUi.close()
                logUi = null
                t1Log = Date.now()
            }
        }
    }, 2000)


}

function show(text) {

    console.log("show");
    thrLog = threads.start(function () {

        //toast("show,,")
        if (!logUi) {

            logUi = floaty.window(
                <frame gravity="center" w="500" id="frame" >
                    <text id="text" textColor="#00ff00" gravity="left"  >log..</text>
                </frame>
            );

            // console.log(logUi.text.getText());
            // text = text + "\n" + logUi.text.getText()

            console.log("first");
            logUi.text.setText(text)
            t1Log = Date.now()

        } else {
            logUi.text.setText(text)
            t1Log = Date.now()

        }
    })

}

function logAndShow(text) {
    log(text)
    //logJs.show(text.toString())

}

function wait_startScript() {

    interval = setInterval(function () {
        log("main-intervar")
        boolRunScript()
    }, 1000)

}


function boolRunScript() {
    log("boolRunScript")
    if (u.scriptAuto) {
        clearInterval(interval)
        main()
    } else {
        log("boolRunScript-ui_.scriptAuto=" + u.scriptAuto)
    }
}


function
    test() {

    // init_rui()
    //bool_line_GoRound()
    regLineGenearal(keyLy)

    // while (true) {
    //     log("main-thread=" + threads.currentThread())
    //     //getRegStateStropFromRui()
    //     sleep(2000)
    // }
}


function init_rui() {

    httpRuiGetNameByCountryNew = {
        "url": "http://47.242.203.20:9999/bigo/uid?"
        , "country": "hk"
        , "gender": "0"
    }
    urlRuiCountryChange = "http://47.242.203.20:9999/mutex/change?id="
    urlRuiCountryLast = "http://47.242.203.20:9999/mutex/last?id="
    urlRuiGetRegState = "http://47.242.203.20:9999/mutex/reg/status/get"

}



function watch() {

    tp_init()

    watch_init()
    let bool_first = 0
    //Thread.SetShareVar("t1_reg",Time() )
    let t1 = Date.now()
    let outtime, tp, ret, tp2, tp3, tp4

    while (true) {

        files.write(pathScript, "1")

        if (thrShareEndScript == thrShareEndScriptEnd) {
            logAndShow("检测到线程脚本停止信号..")
            exit()
        } else if (thrShareRegState == thrShareRegStateStop) {
            while (getRegStateStropFromRui() != thrShareRegStateStop) {
                log("getRegStateStropFromRui=stop-script")

            }
            resetScript()
        }

        if (thrShareRegFailNum > 3) {
            n.thread_force_stop(thrMain)
            thrMain = null
            while (true) {
                File.Write(pathScript, "1")
                logAndShow("reg fail over 3..stop run..")
                sleep(5000)
            }
        } else {

            tp2 = Date.now() - thrShareT1Reg
            tp3 = outtimeReg - tp2
            tp4 = get_configNum(configRegFailNum)

            logAndShow("当前连续失败次数="
                + tp4 + "\r\n"
                + "注册次数=" & n.get_configNum(configRegNum) & "\r\n"
                + "国家=" + "\r\n"
                + "当次注册超时剩余" & tp3)

        }

        watch_disturb_proceed()
        sleep(5000)

    }

}

function get_configNum(key) {
    return 0
}

function surfboardRun() {

}


function watch_disturb_proceed() {

    log("watch_disturb_proceed")
    n.c_dsp(yy允许)
    n.c_dsp(errWindow)
    if (n.c_dsp(errReport))
        n.c_dsp(errAndroidNotNow)

}


function resetScript() {

    n.thread_force_stop(thrMain)
    thrMain = null

    home()
    sleep(1000)
    closeApp(appLine)
    sleep(1000)
    closeApp(appPostern)

    logAndShow("begin Main-thread")
    thrMain = threads.start(main_control)

}

function getRegStateStropFromRui() {

    let ret = false, tp
    r = n.get(urlRuiGetRegState)
    if (r) {
        if (r.statusCode == 200) {
            tp = r.body.json()
            log("getRegStateStropFromRui=" + tp.toString + "-states=" + tp.data.status)
            thrShareRegState = tp.data.status
            return tp.data.status
        } else {
            logAndShow("getRegStateStropFromRui-err=" + r.statusMessage)
        }
    }

}

function watch_init() {
    outtimeReg = 60 * 6
    outtime_short = 90
    get_country()

}

function get_country() {
    return "hk"
}


