"ui";

/*
 *邮箱: 929320331@qq.com
 *机型: 华为v10 1080*2160
 *版本: Pro 8.8.22-0
 */

importClass(android.graphics.Color);
importClass(android.content.res.ColorStateList);
activity.setTheme(com.google.android.material.R$style.Theme_MaterialComponents_DayNight_DarkActionBar);
ui.statusBarColor("#000000")
ui.layout(
    <frame>
        <vertical>
            <horizontal bg="#FF8C9099" h="auto" gravity="center" >
                <text margin="5" text="UI框架" textColor="#FFFFFFFF" textSize="16sp" textStyle="bold" layout_weight="1" />
                <img margin="5" id="Aboutauto" w="28" h="28" src="@drawable/ic_camera_black_48dp" tint="#FFFFFFFF" foreground="?android:attr/selectableItemBackgroundBorderless" />
                <img margin="5" id="MenuButton" w="28" h="28" src="@drawable/ic_dns_black_48dp" tint="#FFFFFFFF" foreground="?android:attr/selectableItemBackgroundBorderless" />
            </horizontal>

            <vertical gravity="center" h="*" w="*" >
                <text gravity="center" text="生活原本沉闷，跟你一起奔跑就会有风。" />
            </vertical>

        </vertical>
        <androidx.coordinatorlayout.widget.CoordinatorLayout id="CoordinatorLayout" layout_width="match_parent" orientation="vertical"  >
            <com.google.android.material.floatingactionbutton.FloatingActionButton layout_width="wrap_content" backgroundTint="#000000" tint="#FFFFFFFF" id="btn_report" layout_height="wrap_content" src="@drawable/ic_play_arrow_black_48dp" />
            <com.google.android.material.bottomappbar.BottomAppBar id="bottomAppBar" backgroundTint="#FF8C9099" layout_width="match_parent" layout_height="40dp" layout_gravity="bottom" paddingStart="0dp" paddingEnd="0dp" />
        </androidx.coordinatorlayout.widget.CoordinatorLayout>
    </frame>
)


ui.MenuButton.on("click", function () {
    try {
        let mBtnPop = ui.MenuButton
        Popup = new android.widget.PopupWindow(view, 500, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
        Popup.setOutsideTouchable(true);
        Popup.setFocusable(true);
        Popup.showAsDropDown(mBtnPop, 300, 30)

    } catch (error) { }

});

var view = ui.inflate(
    <vertical >
        <card margin="3 1" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="#FF8C9099" alpha="1" >
            <card margin="1 1" w="*" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="#FF8C9099">
                <vertical margin="5 10 5 10">
                    <horizontal padding="10 4">
                        <vertical layout_weight="1" >
                            <text text="无障碍" textColor="#ffffff" textStyle="bold" textSize="10" />
                            <text text="提供自动操作(点击,长按,滑动等)" textColor="#ffffff" textSize="6" marginTop="2" />
                        </vertical>
                        <Switch id="switch_acc" scaleY="0.8" scaleX="0.8" checked="false" marginRight="-8" />
                    </horizontal>

                    <horizontal padding="10 4">
                        <vertical layout_weight="1" >
                            <text text="悬浮球" textColor="#ffffff" textSize="10" textStyle="bold" />
                            <text text="增加脚本后台运行时的存活率" textColor="#ffffff" textSize="6" marginTop="2" />
                        </vertical>
                        <Switch id="switch_ball" scaleY="0.8" scaleX="0.8" checked="false" marginRight="-8" />
                    </horizontal>

                    <horizontal padding="10 4">
                        <vertical layout_weight="1" >
                            <text text="控制台" textColor="#ffffff" textSize="9" textStyle="bold" />
                            <text text="调试输出，悬浮窗显示日志" textColor="#ffffff" textSize="6" marginTop="2" />
                        </vertical>
                        <Switch id="screenCapturePermission" scaleY="0.8" scaleX="0.8" checked="false" marginRight="-8" />
                    </horizontal>

                    <horizontal padding="10 4">
                        <vertical layout_weight="1" >
                            <text text="前台服务" textColor="#ffffff" textSize="9" textStyle="bold" />
                            <text text="保证脚本不被杀掉(前台服务)" textColor="#ffffff" textSize="6" marginTop="2" />
                        </vertical>
                        <Switch id="foregroundService" scaleY="0.8" scaleX="0.8" checked="true" marginRight="-8" />
                    </horizontal>
                    <horizontal padding="10 4">
                        <vertical id="Jointhisgroup" layout_weight="1" >
                            <text text="加入本群" textColor="#ffffff" textSize="9" textStyle="bold" />
                            <text text="关注更多动态,请添加QQ频道" textColor="#ffffff" textSize="6" marginTop="2" />
                        </vertical>
                        <img w="18" h="18" layout_gravity="right|center" src="@drawable/ic_keyboard_arrow_right_black_48dp" tint="#ffffff" marginLeft="-4" />
                    </horizontal>
                </vertical>
            </card>
        </card>
    </vertical>
)

var Things = [
    view.foregroundService, view.screenCapturePermission, view.switch_acc, view.switch_ball
]

for (var i = 0; i < Things.length; i++) {
    Things[i].getTrackDrawable().setTint(Color.parseColor("#ffffff"));
    Things[i].getThumbDrawable().setTint(Color.parseColor("#ffffff"));
}

view.foregroundService.on("check", function (checked) {
    $settings.setEnabled("foreground_service", checked);
});

view.screenCapturePermission.on("check", function (checked) {
    threads.start(function () {
        if (checked) {
            console.show()
        } else {
            console.hide()
        }
    });
});
view.switch_acc.setChecked(auto.service !== null)
view.switch_ball.setChecked((new android.provider.Settings).canDrawOverlays(context))
view.switch_acc.on("check", (isChecked) => {
    if (isChecked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
        toast("请开启《" + app.getAppName(context.packageName) + "》的无障碍服务")
    }
    if (!isChecked && auto.service != null) {
        toast("关闭无障碍服务");
        auto.service.disableSelf();
    }
})

view.switch_ball.on("check", (isChecked) => {
    if (isChecked && !(new android.provider.Settings).canDrawOverlays(context)) {
        importClass(android.content.Intent);
        importClass(android.net.Uri);
        importClass(android.provider.Settings);
        var intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + context.getPackageName()));
        app.startActivity(intent);
    }
    if (isChecked && (new android.provider.Settings).canDrawOverlays(context)) { }
})


view.Jointhisgroup.on("click", () => {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://card/show_pslcard?card_type=group&uin=753767852",
        packageName: "com.tencent.mobileqq",
    })
})

ui.Aboutauto.on("click", () => {
    $dialogs.setDefaultDialogType("foreground-or-overlay");
    dialogs.build({
        title: "关于UI",
        content: "AutoJs Pro 内测版",
        positive: "确定",
        titleColor: "#000000",
        positiveColor: "#000000",
    }).on("negative", function () { }).show();
})

ui.btn_report.getLayoutParams().setAnchorId(ui.bottomAppBar.getId());
ui.bottomAppBar.setFabCradleMargin(15);
ui.bottomAppBar.setFabCradleRoundedCornerRadius(50);
ui.bottomAppBar.setHideOnScroll(false)
ui.btn_report.on("click", (c) => {
    device.vibrate(20);
    let getIcon = ui.btn_report.attr("src");
    let itemColor = [
        ["#000000", "#FFFFFFFF"],
        ["#FF6666", "#FFFFFFFF"]
    ]
    let itemIcon = ["@drawable/ic_play_arrow_black_48dp", "@drawable/ic_stop_black_48dp"];
    let setIcon = itemIcon[getIcon == itemIcon[0] ? 1 : 0];
    ui.btn_report.attr("src", setIcon);
    ui.btn_report.attr("backgroundTint", itemColor[getIcon == itemIcon[0] ? 1 : 0][0]);
    ui.btn_report.attr("tint", itemColor[getIcon == itemIcon[0] ? 1 : 0][1]);
    if (getIcon == itemIcon[0] ? 1 : 0) {
        isRun = threads.start(function () {
            主线程()
        })
    } else {
        if (isRun) {
            toastLog("停止运行")
            isRun.interrupt()
            console.hide()
            threads.shutDownAll();

        }
    }
})

function 主线程() {
    while (true) {
        sleep(1000)
        toastLog("你好")
        sleep(1000)
        toastLog("你睡了吗？")
    }
}