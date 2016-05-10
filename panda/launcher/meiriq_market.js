haveShare = 1; // 这里记得是have demo出错了
haveGamelist = 1;
resourceCDN = '';
// 游戏最高分为游戏名+Score,
if(!window.localStorage.getItem("zhonglitanqiuScore")){
    zhonglitanqiuScore=0; // 根据游戏实际情况决定
}else{
    zhonglitanqiuScore = window.localStorage.getItem("zhonglitanqiuScore");
}
// 关卡游戏最高关卡为游戏名+Level ,没有关卡的游戏默认为也需要定义,默认值为0,使用不使用是另外一回事
if(!window.localStorage.getItem("zhonglitanqiuLevel")){
    zhonglitanqiuLevel=0; // 根据游戏实际情况决定
}else{
    zhonglitanqiuLevel = window.localStorage.getItem("zhonglitanqiuLevel");
}
// 回调函数,具体实现如下所示,留意cb_restart()
/**
 * 游戏开始时
 */
function cb_start(){
    console.log("cb_start");
}
/**
 * 游戏结束时(输掉的意思~下一关不算),请根据游戏逻辑决定游戏选用哪个指标(关卡还是分数)作排行
 * @param  {[string]}  type  [关卡还是分数] level or score
 * @param  {[numeric]} value [关卡/分数 值]
 */
function cb_gameover(type,value){
    console.log("cb_gameover,类型是:"+type+",值为:"+value); // 实例 "cb_gameover,类型是:level,值为:8"
}
/**
 * 有完成加载时
 */
function cb_finishload(){
    console.log("cb_finishload");
}
/**
 * 重玩按钮点击时 PS:是按钮点击时,而不是游戏重玩时,这很重要!
 * @return {[type]} [description]
 */
function cb_restart(){
    console.log("cb_restart");
    meiriq_start();
}
/**
 * 分享按钮点击时
 * @return {[type]} [description]
 */
function cb_share(){
    console.log("cb_share");
}
/**
 * 更多游戏点击时
 * @return {[type]} [description]
 */
function cb_more(){
    console.log("cb_more");
}
/**
 * 游戏初始化/开始 执行函数
 * @return {[type]} [description]
 */
function meiriq_start() { //
    window["autostart"].call(window["context"]);
}
/**
 * 游戏暂停
 * @return {[type]} [description]
 */
function meiriq_pause() {
    if(typeof(contextMain)!="undefined"){
        window["pause"].call(window["contextMain"]);
    }
}
/**
 * 游戏暂停->继续
 * @return {[type]} [description]
 */
function meiriq_resume() {
    if(typeof(contextMain)!="undefined"){
        window["resume"].call(window["contextMain"]);
    }
}