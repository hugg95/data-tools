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
    import com.as3xls.xls.*;

    public class DataTools extends Sprite {

    	private var fileName:String = 'download.txt';
        private var charset:String = 'utf-8';
        private var data:String = '';
        private var dataArr:Array;
        private var btn:Sprite;
        private var sheet:Sheet;

    	public function DataTools() {
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

        // notify javascript environment that flash ready
        protected function notify():void {
            ExternalInterface.call('setState');
            ExternalInterface.call('test');
        }

        protected function createXls():ByteArray {
            var excelFile:ExcelFile = new ExcelFile();
            for (var i:int = 0; i < dataArr.length; i++) {
                var line:Array = dataArr[i];
                for (var j:int = 0; j < line.length; j++) {
                    var obj:Object = line[j];
                    excelFile.sheets.addItem(createSheet(dataArr.length, line.length, i, j, String(obj)));
                }
            }

            var bytes:ByteArray = new ByteArray();
            var xlsBytes:ByteArray = excelFile.saveToByteArray();

            // add UTF-8 BOM
            bytes.writeByte(0xEF);
            bytes.writeByte(0xBB);
            bytes.writeByte(0xBF);
            xlsBytes.readBytes(bytes, 3);

            return bytes;
        }

        protected function createSheet(maxLines:int, maxColumns:int, x:int, y:int, v:Object):Sheet {
            if (!sheet) {
                sheet = new Sheet();
                sheet.resize(maxLines + 10, maxColumns + 10);
            }

            sheet.setCell(x, y, v);

            return sheet;
        }

        // save data into disk
        // http://help.adobe.com/zh_CN/FlashPlatform/reference/actionscript/3/flash/net/FileReference.html#save()
        public function _export(event:Event):void {
        	var fileReference:FileReference = new FileReference();
            //fileReference.addEventListener(Event.COMPLETE, saved);
            if (charset == 'utf-8') {
                //fileReference.save(saveAsUtf8(data), fileName);
                fileReference.save(createXls(), fileName);
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
            ExternalInterface.addCallback('setData', setData);
            ExternalInterface.addCallback('setDataArr', setDataArr);
        }

        // set file name
        public function setFileName(newFileName:String):void {
        	fileName = newFileName;
        }

        // set charset
        public function setCharset(newCharset:String):void {
            charset = newCharset;
        }

        public function setData(newData:String):void {
            data = newData;
        }

        public function setDataArr(newDataArr:Array):void {
            dataArr = newDataArr;
        }

    }
}

