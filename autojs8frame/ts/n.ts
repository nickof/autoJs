import { autojs } from "__app__";

export default {
    uiSelectCondition
    , secex
    , boolConditionOrUiobj
    , g_r_rect
    , getNodeNormal
    , g
    , r_
    , c_rect
    , c
    , wait
    , c_wait
    , cR_wait
    , wait_grp
    , wait_dsp
    , c_dsp
    , cR_dsp
    , c_wait_grp
    , cR_wait_grp
    , get
    , thread_force_stop
    , get_configNum
}

function secex(sec: number, str: string) {
    let t = sec
    for (let i = 0; i < sec; i++) {
        toast(str + "\n" + "sec:" + t--)
        sleep(1000)
    }
}

function get_configNum(configKey: string) {

    let tp = storages.create("lggirlggir@163.com")
    let tp2 = tp.get(configKey, 0)
    return tp2

}



function thread_force_stop(thread: AutoJs.Thread) {
    thread.interrupt();

    let boolS = 0
    while (thread.isAlive()) {
        log("wait-thread-stop")
        sleep(500)
        boolS = boolS + 1
        if (boolS % 10 == 0) {
            thread.interrupt();
        }
    }
    log("wait-thread-stop-suc..")

}

/**
 * 
 * @param urlObj { "url":"","para1":"",... }
 * @param options 
 * @param callback 
 * @returns response.statusCode,response.body
 * ex: https://pro.autojs.org/docs/#/zh-cn/http?id=httpgeturl-options-callback
 */
function get(urlObj: any
    , options?: AutoJs.RequestOptions
    , callback?: (res?: AutoJs.Response, err?: any) => void)
    : AutoJs.Response | Promise<AutoJs.Response> | void {

    let boolS = 0

    if (typeof (urlObj) == "object") {
        let str = urlObj["url"]
        for (let k in urlObj) {
            if (k != "url") {
                if (boolS == 0) {
                    str = str + k + "=" + urlObj[k]
                    boolS = 1
                } else {
                    str = str + "&" + k + "=" + urlObj[k]
                }

            }
        }
        log("get_tb_url=" + str)
        return http.get(str, options, callback);
    } else {
        log("get_tb_url=" + urlObj)
        return http.get(urlObj, options, callback);
    }

}

function c_wait_grp(jobj: any, jobjGrp: any, timeOut: any): AutoJs.UiObject | null {
    if (c(jobj))
        return wait_grp(jobj, timeOut)

    return null
}

function cR_wait_grp(jobj: any, jobjGrp: any, timeOut: any): AutoJs.UiObject | null {
    if (c_rect(jobj))
        return wait_grp(jobj, timeOut)

    return null
}

/**
 * ???????????????????????????
 * @param {*} jobj 
 * @param {*} timeOut 
 * @returns ????????????true
 */
function c_dsp(jobj: any, timeOut: any) {
    if (c(jobj))
        return wait_dsp(jobj, timeOut)
    return false
}


/**
 * ??????????????????????????????
 * @param jobj 
 * @param timeOut 
 * @returns ????????????true
 */
function cR_dsp(jobj: any, timeOut: any): boolean {
    if (c_rect(jobj))
        return wait_dsp(jobj, timeOut)
    return false
}


function uiSelectCondition(jobjCondition: any): AutoJs.UiSelector | null {

    log("uiSelectCondition")

    if (Array.isArray(jobjCondition)) {
        log("uiSelectCondition-array")
        return null
    } else {
        log("uiSelectCondition-jobj")
    }

    let ret: AutoJs.UiSelector = new AutoJs.UiSelector();
    let boolS = 0
    let tp;

    for (let key in jobjCondition) {
        log("key=" + key)
        if (boolS == 0) {

            switch (key) {
                case "t":
                    log("set-text")
                    ret = text(jobjCondition[key])
                    break;
                case "d":
                    ret = desc(jobjCondition[key])
                    break;
                case "i":
                    ret = id(jobjCondition[key])
                    break;
                case "c":
                    ret = className(jobjCondition[key])
                    break;
                case "tC":
                    ret = textContains(jobjCondition[key])
                    break;
                case "dC":
                    ret = descContains(jobjCondition[key])
                    break;
                case "iC":
                    ret = idContains(jobjCondition[key])
                    break;
                default:
                    log("defaultCase")
                    boolS = 2
                    break;
            }

            log("boolS-case-after=" + boolS)
            if (boolS == 0) {
                boolS = 1
            } else {
                boolS = 0
            }
            log("boolS=" + boolS)

        } else {

            switch (key) {
                case "t":
                    ret = ret.text(jobjCondition[key])
                    break;
                case "d":
                    ret = ret.desc(jobjCondition[key])
                    break;
                case "i":
                    ret = ret.id(jobjCondition[key])
                    break;
                case "c":
                    ret = ret.className(jobjCondition[key])
                    break;
                case "tC":
                    ret = textContains(jobjCondition[key])
                    break;
                case "dC":
                    ret = descContains(jobjCondition[key])
                    break;
                case "iC":
                    ret = idContains(jobjCondition[key])
                    break;
                default:
            }

        }
    }

    log("uiSelectCondition-ret=" + ret)
    return ret;

}

function uiSelectConditionArray(arrCondition: any[]): AutoJs.UiSelector[] | null {

    log("uiSelectConditionArray")
    let jArr = [], tp

    for (let i = 0; i < arrCondition.length; i++) {
        tp = uiSelectCondition(arrCondition[i])
        if (tp != null) {
            jArr[i] = tp
        }
    }

    log(jArr)
    return jArr

}



function getNodeNormal(jobjCondition: AutoJs.UiSelector): AutoJs.UiObject | null {

    log("getNodeNormal-" + jobjCondition);
    let uiObj;
    // if (Array.isArray(jobjCondition)) {
    //     for (var i = 0; i < jobjCondition.length; i++) {
    //         log("is Array");
    //         uiObj = getNodeNormal(jobjCondition[i]);
    //         if (uiObj) {
    //             return uiObj;
    //         }
    //     }
    //     return null;
    // }
    //var uiSel = uiSelectCondition(jobjCondition);
    //log("uiSelect=" + uiSel);

    //log("getNodeNormal-" + jobjCondition)
    uiObj = jobjCondition.findOnce();
    if (uiObj) {
        log("getNodeNormal-" + uiObj.bounds());
    }
    return uiObj
}

/**
 * 
 * @param {*} jobjCondition 
 * text().desc()
 * [{ "c":condition,"pa":1,"ch":[1,2,3] }]
 * { "c":condition,"pa":1,"ch":[1,2,3] }
 * [ condition1,condition2 ]
 * @returns 
 */
function g(jobjCondition: any[]): AutoJs.UiObject | null {

    let uiObj;
    if (Array.isArray(jobjCondition)) {
        for (let i in jobjCondition) {
            uiObj = g(jobjCondition[i])
            if (uiObj) {
                return uiObj
            }
        }
        return null
    }
    else if (jobjCondition["pa"] != null) {
        uiObj = get_parent(jobjCondition["c"], jobjCondition["pa"]);
        if (uiObj) {
            log("get-parent=" + uiObj.bounds());
            if (jobjCondition["ch"]) {
                uiObj = get_child(uiObj, jobjCondition["ch"]);
            }
        }
        else {
            return null;
        }
        return uiObj;
    }
    else if (jobjCondition["ch"]) {
        log("get_node-only-get child");
        return get_child(jobjCondition["c"], jobjCondition["ch"]);
    }
    return getNodeNormal(jobjCondition);

}


function get_parent(jobjCondition: any, hierarchy: string | number) {
    log("get_parent-hierarchy" + hierarchy)
    let uiObj = getNodeNormal(jobjCondition)
    if (uiObj) {
        for (let i = 0; i < hierarchy; i++) {
            uiObj = uiObj.parent()
            if (uiObj == null) {
                return null;
            }
        }
        log("get_parent-" + uiObj.bounds())
    }

    return uiObj

}


function c_wait(jobj: any, jobj2: any, timeOut: any): AutoJs.UiObject | null {
    let uiObj = c(jobj)
    if (uiObj) {
        return wait(jobj2, timeOut)
    }
    return null
}

/**
 * 
 * @param jobj 
 * @param jobj2 
 * @param timeOut 
 * @returns 
 */
function cR_wait(jobj: any, jobj2: any, timeOut: any): AutoJs.UiObject | null {

    let uiObj = c_rect(jobj)
    if (uiObj) {
        return wait(jobj2, timeOut)
    }
    return null
}


/**
 * ?????????????????? 
 * @param {*} jobj jobjCondition
 * @param {*} timeOut 
 * @returns false ??????????????????, ???????????????
 */
function wait_dsp(jobj: any, timeOut: number | null): boolean {

    timeOut = timeOut == null ? 5000 : timeOut
    let t1 = Date.now(), uiObj
    while (true) {
        if (Date.now() - t1 > timeOut)
            return false

        uiObj = g(jobj)
        if (!uiObj)
            return true
    }

}

/**
  * 
  * @param {*} objGrp 
  * @param {*} timeOut 
  * @returns 
  */
function wait_grp(objGrp: { [x: string]: any; }, timeOut: number | null): AutoJs.UiObject | null {

    timeOut = timeOut == null ? 5000 : timeOut * 1000
    log("wait_grp-timeOut=" + timeOut)
    let t1 = Date.now()
    while (true) {

        for (let key in objGrp) {
            let uiObj = g(objGrp[key])
            if (uiObj)
                return uiObj
        }

        if (Date.now() - t1 > timeOut) {
            return null
        }
        sleep(200)
    }

}

/**
 * ??????????????????
 * @param jobjCondition 
 * @param timeOut 
 * @returns 
 */
function wait(jobjCondition: AutoJs.UiSelector, timeOut: number | null): AutoJs.UiObject | null {

    let uiSel, uiObj;
    timeOut = timeOut == null ? 5000 : timeOut * 1000;
    if (Array.isArray(jobjCondition)) {
        log("wait-is-array");
        let t1 = Date.now();
        while (Date.now() - t1 < timeOut) {
            for (let idx in jobjCondition) {
                uiObj = g(jobjCondition);
                log("wait-" + jobjCondition);
                if (uiObj)
                    return uiObj;
            }
            sleep(100);
        }
        return null;
    }

    //uiSel = uiSelectCondition(jobjCondition);
    log("wait-timeout=" + timeOut + ",jobjCondition=" + jobjCondition.toString());
    return jobjCondition.findOne(timeOut);

}


function c(jobj: any): AutoJs.UiObject | null {

    let uiObj: AutoJs.UiObject | null;

    if (jobj == null) {
        log("click-????????????")
        return null;
    }

    if (!boolConditionOrUiobj(jobj)) {
        log("click-node-" + jobj.click() + "," + jobj.bounds())
        return jobj
    }

    uiObj = g(jobj)

    if (uiObj) {
        log("click-condition-" + uiObj.click() + "," + uiObj.bounds())
        return uiObj
    } else {
        log("click-condition-not-found-node")
        return null
    }

}

/**
 * ????????????????????????
 * @param jobj 
 * @returns 
 */
function g_r_rect(jobj: { bounds: () => any; } | any) {
    let uiObj, x1, x2, y1, y2, r_x, r_y, rect

    if (!boolConditionOrUiobj(jobj)) {
        log("g_r_rect-uiobj")
        rect = jobj.bounds()
        if (rect) {

            x1 = rect.left + 1
            x2 = rect.right - 1
            y1 = rect.top + 1
            y2 = rect.bottom - 1
            r_x = r_(x1, x2)
            r_y = r_(y1, y2)
            log("g_r_rect-" + r_x + "," + r_y)
            return [r_x, r_y]
        }
    } else {
        log("g_r_rect-condition")
        let uiobj = g(jobj)
        if (uiobj) {
            rect = uiobj.bounds()
            if (rect) {

                x1 = rect.left + 1
                x2 = rect.right - 1
                y1 = rect.top + 1
                y2 = rect.bottom - 1
                r_x = r_(x1, x2)
                r_y = r_(y1, y2)
                log("g_r_rect-" + r_x + "," + r_y)
                return [r_x, r_y]
            }
        }
    }

}

function c_rect(jobj: AutoJs.UiObject | null | any): AutoJs.UiObject | null {

    log("c_rect-run")

    let uiObj, x1, x2, y1, y2, r_x, r_y
    if (jobj == null) {
        log("c_rect-????????????")
        return null;
    }

    if (!boolConditionOrUiobj(jobj)) {
        let rect = jobj.bounds()
        if (rect) {

            x1 = rect.left + 1
            x2 = rect.right - 1
            y1 = rect.top + 1
            y2 = rect.bottom - 1
            r_x = r_(x1, x2)
            r_y = r_(y1, y2)
            log("c_rect-uiObj-" + r_x + "," + r_y)
            click(r_x, r_y)
            return jobj

        } else {

            log("c_rect-??????-rect??????,??????????????????")
            return null
        }

    }

    let uiobj = g(jobj)
    if (uiobj) {
        log("c_rect-condition")
        //log( "c_rect-condition-"+uiObj.click()+","+uiObj.bounds()  )
        return c_rect(uiobj)
    } else {
        log("c_rect-condition-not-found-node")
        return null
    }



}


//true condition  false node
function boolConditionOrUiobj(jobj: { toString: () => string | string[]; }) {

    if (Array.isArray(jobj)) {
        log("boolConditionOrUiobj-is condition array")
        return true
    }

    //log("jobj=" + jobj)
    // if (jobj.toString().indexOf("automator.UiObject") != -1) {
    //     log("boolConditionOrUiobj-is UiObject")
    //     return false
    // }

    if (jobj.toString().indexOf("boundsInScreen=[") != -1) {
        log("boolConditionOrUiobj-is UiObject")
        return false
    }

    //

    // if (jobj["className"] != null
    //     && jobj["packageName"] != null
    // ) {
    //     log(jobj["className"] + "," + jobj["packageName"])
    //     log("boolConditionOrUiobj-is uiObj")
    //     return false
    // }

    log("boolConditionOrUiobj-is condition")
    return true
}

//childHierarchy ={1,2,3}
// function get_child(uiObj: AutoJs.UiObject | null, childHierarchy: { [x: string]: any; }) {

function get_child(uiObj: AutoJs.UiObject | null, childHierarchy: Array<number>) {
    //childHierarchy ={1,2,3}
    // text("aa").findOnce().child()
    log("get_child")

    if (uiObj == null) {
        return null;
    }

    for (let i in childHierarchy) {

        log("childI-" + childHierarchy[i])
        log("get_child-child??????," + uiObj.childCount() + "," + childHierarchy[i])

        if (uiObj.childCount() <= childHierarchy[i]) {
            toastLog("get_child-??????child??????," + (uiObj.childCount() - 1) + "," + childHierarchy[i])
            return null
        }

        uiObj = uiObj.child(childHierarchy[i])
        if (uiObj == null) {
            return null
        }

    }

    log("get_child-" + uiObj.bounds())
    return uiObj;

}

/**
 * ???????????????
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function r_(min: number, max: number): number {

    min = Math.ceil(min) // ????????????
    max = Math.floor(max) // ????????????
    // ???????????????????????????????????????1  ?????????????????????[min,max]
    let result = Math.floor(Math.random() * (max - min + 1)) + min
    return result

}

