module panda{
    export class GameUtil{
        // 基于矩形的碰撞检测
        public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean{
            var rect1:egret.Rectangle = obj1.getBounds();
            var rect2:egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
    }
    
    // 根据name关键字创建一个Bitmap对象。name属性请参考resource/resource.json配置文件的内容。
    
    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    


    /**
     * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
     */
    export function createBitmapFromSheet(name:string, sheetName:string = "gameRes"):egret.Bitmap {
        var sheet:egret.SpriteSheet = RES.getRes(sheetName);
        var texture:egret.Texture = sheet.getTexture(name);
        var result:egret.Bitmap = new egret.Bitmap();
        result.texture = texture;
        return result;
    }

    export function getTextureFromSheet(name:string, sheetName:string = "gameRes"):egret.Texture {
        var sheet:egret.SpriteSheet = RES.getRes(sheetName);
        var result:egret.Texture = sheet.getTexture(name);
        return result;
    }


    export function getUrl(url:string):string {

        return url != "" ? url : "";
    }
    export function addTouchTapListener(display:egret.DisplayObject, listener:Function, thisObj:any):void {
        var startX:number = -1;
        var startY:number = -1;
        display.touchEnabled = true;
        display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (event:egret.TouchEvent) {
            startX = event.stageX;
            startY = event.stageY;
        }, display);
        display.addEventListener(egret.TouchEvent.TOUCH_END, function (event:egret.TouchEvent) {
            if (Math.abs(startX - event.stageX) < 10 && Math.abs(startY - event.stageY) < 10) {
                listener.call(thisObj);
            }
            startX = -1;
            startY = -1;
        }, display);
    }

    export function fixNumber(num:number):string {
        var result:string = "";
        if (num > 10000) {
            num = Math.floor(num / 10000);
            result = num.toString() + "w";
        }
        else {
            result = num.toString();
        }
        return result;
    }

    export function lock(key:string):void {
        var stage:egret.Stage = egret.MainContext.instance.stage;
        stage.touchEnabled = stage.touchChildren = false;
    }

    export function unlock(key:string):void {
        //todo key
        var stage:egret.Stage = egret.MainContext.instance.stage;
        stage.touchEnabled = stage.touchChildren = true;
    }


    export function replaceTextureByUrl(url:string,obj:egret.Bitmap) {
        RES.getResByUrl(url, function (texture):void {
            obj.texture = texture;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }

    export function getIsTodayFirstIn():boolean {
        var date:Date = new Date();
        var lastDate:string = window.localStorage.getItem("LoginDate");
        if(lastDate == null) {
            lastDate = date.getMonth().toString() + date.getDay().toString();
            window.localStorage.setItem("LoginDate", lastDate);
            return true;
        }
        else {
            var currentDate = date.getMonth().toString() + date.getDay().toString();
            window.localStorage.setItem("LoginDate", currentDate);
            return currentDate != lastDate;
        }
    }
}