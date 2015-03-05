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

    	private var fileName:String = 'download.txt';
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
        	register();
            btn.addEventListener(MouseEvent.CLICK, _export);
            stage.addEventListener(Event.ACTIVATE, register);
            addChild(btn);
            notify();
        }

        // notify javascript environment that flash has ready
        protected function notify():void {
            ExternalInterface.call('setState');
        }

        // save data into disk
        public function _export(event:Event):void {
        	var fileReference:FileReference = new FileReference();
            //fileReference.addEventListener(Event.COMPLETE, saved);
            if (charset == 'utf-8') {
                fileReference.save(saveAsUtf8(data), fileName);
            } else if (charset == 'utf-16') {
                fileReference.save(saveAsUtf16(data), fileName);
            }
        }

        protected function saveAsUtf8(str:String):ByteArray {
            var bytes:ByteArray = new ByteArray();
            // add BOM
            bytes.writeByte(0xEF);
            bytes.writeByte(0xBB);
            bytes.writeByte(0xBF);

            bytes.writeUTFBytes(str);

            return bytes;
        }

        protected function saveAsUtf16(str:String):ByteArray {
            var bytes:ByteArray = new ByteArray();
            bytes.writeByte(0xFF);
            bytes.writeByte(0xFE);
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
        	ExternalInterface.addCallback('setStrData', setStrData);
        }

        // set file name
        public function setFileName(newFileName:String):void {
        	fileName = newFileName;
        }

        // set charset
        public function setCharset(newCharset:String):void {
            charset = newCharset;
        }

        public function setStrData(newData:String):void {
            data = newData;
        }
    }
}

