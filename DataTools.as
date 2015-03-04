package {

    import flash.display.LoaderInfo;
    import flash.display.Sprite;
    import flash.display.Stage;
    import flash.display.StageScaleMode;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.utils.ByteArray;
    import flash.external.ExternalInterface;
    import flash.net.FileReference;

    public class DataTools extends Sprite {

    	private var fileName:String = '';
        private var charset:String = 'utf-8';
        private var data:String = '';
        private var btn:Sprite;

    	public function DataTools():void {
            stage.scaleMode = StageScaleMode.EXACT_FIT;
    		LoaderInfo(this.root.loaderInfo).addEventListener(Event.COMPLETE, loaded);
            btn = new Sprite();
            btn.buttonMode = true;
            btn.visible = true;
            btn.graphics.beginFill(0x00FF00);
            btn.graphics.drawRect(100, 100, stage.stageWidth, stage.stageHeight);
            btn.alpha = 0.0;
    	}

    	protected function loaded(e:Event):void {
            notify();
        	register();
            btn.addEventListener(MouseEvent.CLICK, save);
            stage.addEventListener(Event.ACTIVATE, register);
            addChild(btn);
        }

        // notify javascript environment that flash has ready
        protected function notify():void {
            ExternalInterface.call('setState');
        }

        // save data into disk
        public function save(event:Event):void {
        	var fileReference:FileReference = new FileReference();
            fileReference.addEventListener(Event.COMPLETE, saved);
            if (charset == 'utf-8') {
                fileReference.save(saveAsUtf8(data), fileName);
            } else if (charset == 'utf-16') {
                fileReference.save(saveAsUtf16(data), fileName);
            }
        }

        protected function saved():String {
            return 'saved successfully';
        }

        protected function saveAsUtf8(str:String):ByteArray {
            var bytes:ByteArray = new ByteArray();
            bytes.writeUTFBytes(str);

            return bytes;
        }

        protected function saveAsUtf16(str:String):ByteArray {
            var bytes:ByteArray = new ByteArray();
            for (var i:int = 0; i < str.length; i++) {
                var code:int = str.charCodeAt(i);
                if (code < 0XFF) {
                    bytes.writeByte(code);
                }
            }

            return bytes;
        }

        protected function register():void {
        	ExternalInterface.addCallback('setFileName', setFileName);
        	ExternalInterface.addCallback('setCharset', setCharset);
        	ExternalInterface.addCallback('setStrData', setData);
        }

        // set file name
        public function setFileName(fileName:String):void {
        	fileName = fileName;
        }

        // set charset
        public function setCharset(charset:String):void {
            charset = charset;
        }

        public function setData(data:String):void {
            data = data;
        }
    }
}
