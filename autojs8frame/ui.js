
var uiEx = {
    sp_main: "sp_main"
    , sp_model: "sp_model"
    , sp_rola_adr: "sp_rola_adr"
    , sp_hardware: "sp_hardware"
    , sp_country_firefox: "sp_country_firefox"
    , sp_reg_mode: "sp_reg_mode"
    , readUi: readUiConfig
    , sp_ip: "sp_ip"
    , autoSec: 8
    , bt_save: ''
    , scriptAuto: false
    , wait_start_script: wait_start_script
    , ui_set: function () {
        ui_set_()
    }

}

module.exports = uiEx
//exports.uiEx = uiEx
canCelScript = false

function init() {
    //uiEx.sp_main = ui.sp_main.getSelectedItemPosition()
}

function wait_start_script(fun) {
    interval = setInterval(function () {
        log("main-intervar")
        bool_run(fun)
    }, 1000)
}

function bool_run(fun) {

    log("bool_run_" + uiEx.scriptAuto)
    if (uiEx.scriptAuto) {
        clearInterval(interval)
        fun()
    } else {
        log("boolRunScript-ui_.scriptAuto=" + u.scriptAuto)
    }

}

// uiEx.run=function(){

//     ui_set()
//     log("sp_main-after="+sp_main )
//     //ui.finish()
//     uiEx.sp_main=sp_main
// }

//log( "ui-sp_main-"+uiEx.sp_main )
// var color = "#009688";
// ui_set()

function ui_layout() {

    ui.layout(
        <drawer id="drawer">
            <vertical>
                <appbar>
                    <toolbar id="toolbar" title="uiFrame" />
                    <tabs id="tabs" />
                </appbar>
                <viewpager id="viewpager">

                    <frame>
                        <vertical
                        >


                            {/* <button id="bt_stopauto" textSize="18" text="停止自动运行" background="#FFFFFF"  > 
    
                                </button> */}
                            <text id="tx_leftTime" gravity="center" textSize="20" background="#9ed900">剩余时间</text>
                            <spinner id="sp_main" entries="平台|firefox|5sim" w="auto" h="auto" />
                            <horizontal
                            >
                                <spinner id="sp_ip" entries="ip模式|surf-rola|postern" w="auto" h="auto" />
                                <spinner id="sp_model" entries="手机型号|cloud" w="auto" h="auto" />
                            </horizontal>

                            <horizontal
                            >
                                <spinner id="sp_rola_adr" entries=
                                    "rola更新地址| gate13"
                                    w="auto" h="auto" />
                                <spinner id="sp_hardware" entries="清机模式|daVinCi" w="auto" h="auto" />

                            </horizontal>

                            <text id="tx" gravity="center" textSize="2" background="#ff0000" w="*" h="2">
                            </text>

                            <horizontal
                            >
                                <spinner id="sp_country_firefox" entries=
                                    "老友接码国家|香港hk|马来西亚my|澳门mo|菲律宾ph|南非za|缅甸(无)|泰国|柬埔寨|印尼|阿根廷|加纳|越南|英国|马达|中国"
                                    w="auto" h="auto" />
                            </horizontal>

                            <text id="tx" gravity="center" textSize="2" background="#ff0000" w="*" h="2">
                            </text>

                            <horizontal
                            >
                                <spinner id="sp_reg_mode" entries=
                                    "注册模式|注册等读条"
                                    w="auto" h="auto" />
                            </horizontal>

                            <button id="bt_save" text="保存设置" w="*" />


                        </vertical>
                    </frame>


                    <frame>
                        <text text="ext" textColor="red" textSize="16sp" />
                    </frame>

                </viewpager>
            </vertical>

            {/* <vertical layout_gravity="left" bg="#ffffff" w="280">
                <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
                <list id="menu">
                    <horizontal bg="?selectableItemBackground" w="*">
                        <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                        <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                    </horizontal>
                </list>
            </vertical> */}
        </drawer>
    );

}

function readUiConfig(key) {
    if (!storageUi) {
        storageUi = storages.create("ui_settinglggirlggir@163.com")
    }
    return storageUi.get(key, null)
}

function ui_set_() {
    ui_layout()

    // ui.bt_save.on("click", () => {
    //     ui.finish()
    // });

    //设置滑动页面的标题
    ui.viewpager.setTitles(["Main", "ex"]);
    //让滑动页面和标签栏联动
    ui.tabs.setupWithViewPager(ui.viewpager);
    //log(  "sp_main="+sp_main )
    //sp_main=ui.sp_main.setSelection(1)
    let sec = 8
    load_ui()


    var interval = setInterval(() => {
        ui.tx_leftTime.setText("剩余时间" + sec + "-点击取消自动运行")
        log("自动运行=" + uiEx.scriptAuto)
        sec = sec - 1
        if (canCelScript) {
            clearInterval(interval)
            ui.tx_leftTime.setText("已取消自动运行")
            ui.tx_leftTime.attr("bg", "#ff0000")
        }
    }, 1000)

    setTimeout(() => {
        clearInterval(interval)
        if (!canCelScript) {
            toast("未检测到手动中止,即将启动脚本")
            ui.tx_leftTime.setText("已自动启动..")
            log("未检测到手动中止,即将启动脚本")
            uiEx.scriptAuto = true
            //ui.finish()
        }
    }, 8000);

    ui_event()

    // for (let i = 0; i < sec; i++) {
    //     sec = sec - 1
    //     ui.tx_leftTime.setText("剩余时间" + sec)
    //     if (!uiEx.scriptAuto) {
    //         ui.tx_leftTime.setText(已取消自动启动)
    //         break
    //     }
    //     setTimeout
    //     sleep(1000)
    // }

    //uiEx.sp_main=ui.sp_main.getSelectedItemPosition()
    //log(  "sp_main="+sp_main )
    //var xlk_main = ui.sp1.getSelectedItemPosition()
    init()

}


function ui_event() {

    ui.tx_leftTime.on("click", () => {
        uiEx.scriptAuto = false
        //ui.bt_stopauto.dispose()
        canCelScript = true
        //toast("取消自动动启动脚本")
    })


    //保存ui,启动按钮
    ui.bt_save.on("click", () => {
        // toast("Start script..")
        // log("start script..")
        save_ui()
        toast("manual start..")
        canCelScript = true
        uiEx.scriptAuto = true

        setTimeout(() => {
            ui.tx_leftTime.setText("已手动启动.")
            ui.tx_leftTime.attr("bg", "#9ed900")
        }, 2000)

        //ui.finish()
        //main()
    });



}


function load_ui() {
    storageUi = storages.create("ui_settinglggirlggir@163.com")

    let uiv
    //平台
    uiv = storageUi.get("sp_main", 1)
    log("load_ui-" + uiv)
    ui.sp_main.setSelection(uiv)

    uiv = storageUi.get("sp_ip", 1)
    ui.sp_ip.setSelection(uiv)

    uiv = storageUi.get("sp_model", 1)
    ui.sp_model.setSelection(uiv)

    uiv = storageUi.get("sp_rola_adr", 1)
    ui.sp_rola_adr.setSelection(uiv)

    uiv = storageUi.get("sp_hardware", 1)
    ui.sp_hardware.setSelection(uiv)

    uiv = storageUi.get("sp_country_firefox", 1)
    ui.sp_country_firefox.setSelection(uiv)

    uiv = storageUi.get("sp_reg_mode", 1)
    ui.sp_reg_mode.setSelection(uiv)

}

function save_ui() {

    let uiV = ui.sp_main.getSelectedItemPosition()
    storageUi.put("sp_main", uiV)

    uiV = ui.sp_main.getSelectedItemPosition()
    storageUi.put("sp_ip", uiV)

    uiV = ui.sp_model.getSelectedItemPosition()
    storageUi.put("sp_model", uiV)

    uiV = ui.sp_rola_adr.getSelectedItemPosition()
    storageUi.put("sp_rola_adr", uiV)

    uiV = ui.sp_hardware.getSelectedItemPosition()
    storageUi.put("sp_hardware", uiV)

    uiV = ui.sp_country_firefox.getSelectedItemPosition()
    storageUi.put("sp_country_firefox", uiV)

    uiV = ui.sp_reg_mode.getSelectedItemPosition()
    storageUi.put("sp_reg_mode", uiV)

}

// log(xlk_main)
//module.exports=uiEx

// //创建选项菜单(右上角)
// ui.emitter.on("create_options_menu", menu => {
//     menu.add("设置");
//     menu.add("关于");
// });

// //监听选项菜单点击
// ui.emitter.on("options_item_selected", (e, item) => {
//     switch (item.getTitle()) {
//         case "设置":
//             toast("还没有设置");
//             break;
//         case "关于":
//             alert("关于", "Auto.js界面模板 v1.0.0");
//             break;
//     }
//     e.consumed = true;
// });

//activity.setSupportActionBar(ui.toolbar);


//让工具栏左上角可以打开侧拉菜单
//ui.toolbar.setupWithDrawer(ui.drawer);

// ui.menu.setDataSource([{
//         title: "选项一",
//         icon: "@drawable/ic_android_black_48dp"
//     },
//     {
//         title: "选项二",
//         icon: "@drawable/ic_settings_black_48dp"
//     },
//     {
//         title: "选项三",
//         icon: "@drawable/ic_favorite_black_48dp"
//     },
//     {
//         title: "退出",
//         icon: "@drawable/ic_exit_to_app_black_48dp"
//     }
// ]);

// ui.menu.on("item_click", item => {
//     switch (item.title) {
//         case "退出":
//             ui.finish();
//             break;
//     }
// })
