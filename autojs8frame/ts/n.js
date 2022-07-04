"use strict";
exports.__esModule = true;
exports["default"] = {
    uiSelectCondition: uiSelectCondition,
    boolConditionOrUiobj: boolConditionOrUiobj,
    g_r_rect: g_r_rect,
    getNodeNormal: getNodeNormal,
    g: g,
    r_: r_,
    c_rect: c_rect,
    c: c,
    wait: wait,
    c_wait: c_wait,
    cR_wait: cR_wait,
    wait_grp: wait_grp,
    wait_dsp: wait_dsp,
    c_dsp: c_dsp,
    cR_dsp: cR_dsp,
    c_wait_grp: c_wait_grp,
    cR_wait_grp: cR_wait_grp,
    get: get,
    thread_force_stop: thread_force_stop,
    get_configNum: get_configNum
};
function get_configNum(configKey) {
    var tp = storages.create("lggirlggir@163.com");
    var tp2 = tp.get(configKey, 0);
    return tp2;
}
function thread_force_stop(thread) {
    thread.interrupt();
    var boolS = 0;
    while (thread.isAlive()) {
        log("wait-thread-stop");
        sleep(500);
        boolS = boolS + 1;
        if (boolS % 10 == 0) {
            thread.interrupt();
        }
    }
    log("wait-thread-stop-suc..");
}
/**
 *
 * @param urlObj { "url":"","para1":"",... }
 * @param options
 * @param callback
 * @returns response.statusCode,response.body
 * ex: https://pro.autojs.org/docs/#/zh-cn/http?id=httpgeturl-options-callback
 */
function get(urlObj, options, callback) {
    var boolS = 0;
    if (typeof (urlObj) == "object") {
        var str = urlObj["url"];
        for (var k in urlObj) {
            if (k != "url") {
                if (boolS == 0) {
                    str = str + k + "=" + urlObj[k];
                    boolS = 1;
                }
                else {
                    str = str + "&" + k + "=" + urlObj[k];
                }
            }
        }
        log("get_tb_url=" + str);
        return http.get(str, options, callback);
    }
    else {
        log("get_tb_url=" + urlObj);
        return http.get(urlObj, options, callback);
    }
}
function c_wait_grp(jobj, jobjGrp, timeOut) {
    if (c(jobj))
        return wait_grp(jobj, timeOut);
    return null;
}
function cR_wait_grp(jobj, jobjGrp, timeOut) {
    if (c_rect(jobj))
        return wait_grp(jobj, timeOut);
    return null;
}
/**
 * 点击后等待节点消失
 * @param {*} jobj
 * @param {*} timeOut
 * @returns 消失返回true
 */
function c_dsp(jobj, timeOut) {
    if (c(jobj))
        return wait_dsp(jobj, timeOut);
    return false;
}
/**
 * 点击坐标等待节点消失
 * @param jobj
 * @param timeOut
 * @returns 消失返回true
 */
function cR_dsp(jobj, timeOut) {
    if (c_rect(jobj))
        return wait_dsp(jobj, timeOut);
    return false;
}
function uiSelectCondition(jobjCondition) {
    log("uiSelectCondition");
    if (Array.isArray(jobjCondition)) {
        log("uiSelectCondition-array");
        return null;
    }
    else {
        log("uiSelectCondition-jobj");
    }
    var ret = new AutoJs.UiSelector();
    var boolS = 0;
    var tp;
    for (var key in jobjCondition) {
        log("key=" + key);
        if (boolS == 0) {
            switch (key) {
                case "t":
                    log("set-text");
                    ret = text(jobjCondition[key]);
                    break;
                case "d":
                    ret = desc(jobjCondition[key]);
                    break;
                case "i":
                    ret = id(jobjCondition[key]);
                    break;
                case "c":
                    ret = className(jobjCondition[key]);
                    break;
                case "tC":
                    ret = textContains(jobjCondition[key]);
                    break;
                case "dC":
                    ret = descContains(jobjCondition[key]);
                    break;
                case "iC":
                    ret = idContains(jobjCondition[key]);
                    break;
                default:
                    log("defaultCase");
                    boolS = 2;
                    break;
            }
            log("boolS-case-after=" + boolS);
            if (boolS == 0) {
                boolS = 1;
            }
            else {
                boolS = 0;
            }
            log("boolS=" + boolS);
        }
        else {
            switch (key) {
                case "t":
                    ret = ret.text(jobjCondition[key]);
                    break;
                case "d":
                    ret = ret.desc(jobjCondition[key]);
                    break;
                case "i":
                    ret = ret.id(jobjCondition[key]);
                    break;
                case "c":
                    ret = ret.className(jobjCondition[key]);
                    break;
                case "tC":
                    ret = textContains(jobjCondition[key]);
                    break;
                case "dC":
                    ret = descContains(jobjCondition[key]);
                    break;
                case "iC":
                    ret = idContains(jobjCondition[key]);
                    break;
                default:
            }
        }
    }
    log("uiSelectCondition-ret=" + ret);
    return ret;
}
function uiSelectConditionArray(arrCondition) {
    log("uiSelectConditionArray");
    var jArr = [], tp;
    for (var i = 0; i < arrCondition.length; i++) {
        tp = uiSelectCondition(arrCondition[i]);
        if (tp != null) {
            jArr[i] = tp;
        }
    }
    log(jArr);
    return jArr;
}
function getNodeNormal(jobjCondition) {
    log("getNodeNormal-" + jobjCondition);
    var uiObj;
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
    return uiObj;
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
function g(jobjCondition) {
    var uiObj;
    if (Array.isArray(jobjCondition)) {
        for (var i in jobjCondition) {
            uiObj = g(jobjCondition[i]);
            if (uiObj) {
                return uiObj;
            }
        }
        return null;
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
function get_parent(jobjCondition, hierarchy) {
    log("get_parent-hierarchy" + hierarchy);
    var uiObj = getNodeNormal(jobjCondition);
    if (uiObj) {
        for (var i = 0; i < hierarchy; i++) {
            uiObj = uiObj.parent();
            if (uiObj == null) {
                return null;
            }
        }
        log("get_parent-" + uiObj.bounds());
    }
    return uiObj;
}
function c_wait(jobj, jobj2, timeOut) {
    var uiObj = c(jobj);
    if (uiObj) {
        return wait(jobj2, timeOut);
    }
    return null;
}
function cR_wait(jobj, jobj2, timeOut) {
    var uiObj = c_rect(jobj);
    if (uiObj) {
        return wait(jobj2, timeOut);
    }
    return null;
}
/**
 * 等待节点消失
 * @param {*} jobj jobjCondition
 * @param {*} timeOut
 * @returns false 节点依然存在, 节点不存在
 */
function wait_dsp(jobj, timeOut) {
    timeOut = timeOut == null ? 5000 : timeOut;
    var t1 = Date.now(), uiObj;
    while (true) {
        if (Date.now() - t1 > timeOut)
            return false;
        uiObj = g(jobj);
        if (!uiObj)
            return true;
    }
}
/**
  *
  * @param {*} objGrp
  * @param {*} timeOut
  * @returns
  */
function wait_grp(objGrp, timeOut) {
    timeOut = timeOut == null ? 5000 : timeOut * 1000;
    log("wait_grp-timeOut=" + timeOut);
    var t1 = Date.now();
    while (true) {
        for (var key in objGrp) {
            var uiObj = g(objGrp[key]);
            if (uiObj)
                return uiObj;
        }
        if (Date.now() - t1 > timeOut) {
            return null;
        }
        sleep(200);
    }
}
/**
 * 等待节点出现
 * @param jobjCondition
 * @param timeOut
 * @returns
 */
function wait(jobjCondition, timeOut) {
    var uiSel, uiObj;
    timeOut = timeOut == null ? 5000 : timeOut * 1000;
    if (Array.isArray(jobjCondition)) {
        log("wait-is-array");
        var t1 = Date.now();
        while (Date.now() - t1 < timeOut) {
            for (var idx in jobjCondition) {
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
function c(jobj) {
    var uiObj;
    if (jobj == null) {
        log("click-参数为空");
        return null;
    }
    if (!boolConditionOrUiobj(jobj)) {
        log("click-node-" + jobj.click() + "," + jobj.bounds());
        return jobj;
    }
    uiObj = g(jobj);
    if (uiObj) {
        log("click-condition-" + uiObj.click() + "," + uiObj.bounds());
        return uiObj;
    }
    else {
        log("click-condition-not-found-node");
        return null;
    }
}
/**
 * 获取控件随机范围
 * @param jobj
 * @returns
 */
function g_r_rect(jobj) {
    var uiObj, x1, x2, y1, y2, r_x, r_y, rect;
    if (!boolConditionOrUiobj(jobj)) {
        log("g_r_rect-uiobj");
        rect = jobj.bounds();
        if (rect) {
            x1 = rect.left + 1;
            x2 = rect.right - 1;
            y1 = rect.top + 1;
            y2 = rect.bottom - 1;
            r_x = r_(x1, x2);
            r_y = r_(y1, y2);
            log("g_r_rect-" + r_x + "," + r_y);
            return [r_x, r_y];
        }
    }
    else {
        log("g_r_rect-condition");
        var uiobj = g(jobj);
        if (uiobj) {
            rect = uiobj.bounds();
            if (rect) {
                x1 = rect.left + 1;
                x2 = rect.right - 1;
                y1 = rect.top + 1;
                y2 = rect.bottom - 1;
                r_x = r_(x1, x2);
                r_y = r_(y1, y2);
                log("g_r_rect-" + r_x + "," + r_y);
                return [r_x, r_y];
            }
        }
    }
}
function c_rect(jobj) {
    log("c_rect-run");
    var uiObj, x1, x2, y1, y2, r_x, r_y;
    if (jobj == null) {
        log("c_rect-参数为空");
        return null;
    }
    if (!boolConditionOrUiobj(jobj)) {
        var rect = jobj.bounds();
        if (rect) {
            x1 = rect.left + 1;
            x2 = rect.right - 1;
            y1 = rect.top + 1;
            y2 = rect.bottom - 1;
            r_x = r_(x1, x2);
            r_y = r_(y1, y2);
            log("c_rect-uiObj-" + r_x + "," + r_y);
            click(r_x, r_y);
            return jobj;
        }
        else {
            log("c_rect-参数-rect为空,可能参数错误");
            return null;
        }
    }
    var uiobj = g(jobj);
    if (uiobj) {
        log("c_rect-condition");
        //log( "c_rect-condition-"+uiObj.click()+","+uiObj.bounds()  )
        return c_rect(uiobj);
    }
    else {
        log("c_rect-condition-not-found-node");
        return null;
    }
}
//true condition  false node
function boolConditionOrUiobj(jobj) {
    if (Array.isArray(jobj)) {
        log("boolConditionOrUiobj-is condition array");
        return true;
    }
    //log("jobj=" + jobj)
    // if (jobj.toString().indexOf("automator.UiObject") != -1) {
    //     log("boolConditionOrUiobj-is UiObject")
    //     return false
    // }
    if (jobj.toString().indexOf("boundsInScreen=[") != -1) {
        log("boolConditionOrUiobj-is UiObject");
        return false;
    }
    //
    // if (jobj["className"] != null
    //     && jobj["packageName"] != null
    // ) {
    //     log(jobj["className"] + "," + jobj["packageName"])
    //     log("boolConditionOrUiobj-is uiObj")
    //     return false
    // }
    log("boolConditionOrUiobj-is condition");
    return true;
}
//childHierarchy ={1,2,3}
// function get_child(uiObj: AutoJs.UiObject | null, childHierarchy: { [x: string]: any; }) {
function get_child(uiObj, childHierarchy) {
    //childHierarchy ={1,2,3}
    // text("aa").findOnce().child()
    log("get_child");
    if (uiObj == null) {
        return null;
    }
    for (var i in childHierarchy) {
        log("childI-" + childHierarchy[i]);
        log("get_child-child个数," + uiObj.childCount() + "," + childHierarchy[i]);
        if (uiObj.childCount() <= childHierarchy[i]) {
            toastLog("get_child-超过child个数," + (uiObj.childCount() - 1) + "," + childHierarchy[i]);
            return null;
        }
        uiObj = uiObj.child(childHierarchy[i]);
        if (uiObj == null) {
            return null;
        }
    }
    log("get_child-" + uiObj.bounds());
    return uiObj;
}
/**
 * 区间随机数
 * @param {*} min
 * @param {*} max
 * @returns
 */
function r_(min, max) {
    min = Math.ceil(min); // 向上取整
    max = Math.floor(max); // 向下取整
    // 为了包括最大值要在之后加上1  可以取到闭区间[min,max]
    var result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
}
