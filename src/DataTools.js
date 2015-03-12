/**
 * DataTools provides export capability.
 * @author victor li
 * @date 2015/03/04
 * @version 0.0.1
 */

var DataTools,
    setState, test;

;(function(window, $, undefined) {

    // default setting
    var _config = {

        flashPath: '',
        fileName: '',
        // only accept string
        data: ''

    };

    // _flashState is false by default,
    // its value will be set to true after flash ready
    var _flashState = false;

    /**
     * flash will call this method to notify javascript runtime environment
     * that flash was ready, if it is ready, it will set _flashState to true
     */
    setState = function() {

        _flashState = true;

    };

    // test information
    test = function() {

        var testMsg = 'flash loaded successfully';
        if (console && console.log) {
            console.log(testMsg);
        } else {
            alert(testMsg);
        }
        
    }

    DataTools = function(config) {

        configure(config);
        _init();

    };

    // class name of export button
    var CLASS_NAME = '.js-export-btn';

    //var DIV_TAG = '<div id="css-flash-object" style="position: absolute; width: 0; height: 0; z-index: 99999;"></div>';

    /*var OBJECT_TAG = '<object type="application/x-shockwave-flash" name="flash-object" id="js-flash-object">'
                        + '<param name="movie" value="DataTools.swf" />'
                        + '<param name="AllowScriptAccess" value="always" />'
                        + '<param name="Quality" value="high" />'
                        + '<param name="BGColor" value="#ffffff" />'
                        + '<param name="WMode" value="Transparent" />'
                        + '</object>';*/

    function _init() {

        _initFlash(this.config.flashPath);

        var _id = setInterval(function() {
            _checkState(_id);

        }, 100);

    };

    function configure(config) {

        this.config = $.extend(_config, config);

    };

    /**
     * append the flash object tag into html body
     */
    function _initFlash(flashPath) {

        var divTag = '<div id="css-flash-object" style="position: absolute;'
                        + 'width: 0; height: 0; z-index: 99999;">';


        var flashTag = '<embed src="' + flashPath + '" width="0" height="0" quality="high" '
                        + 'bgcolor="#ffffff" name="flash-object" id="js-flash-object" wmode="transparent" '
                        + 'allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" '
                        + 'pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>';

        if (document.documentMode && document.documentMode < 10) {
            flashTag = '<object type="application/x-shockwave-flash" ' 
                        + 'data="' + flashPath + '" name="flash-object" id="js-flash-object">'
                        + '<param name="movie" value="' + flashPath + '" />'
                        + '<param name="AllowScriptAccess" value="always" />'
                        + '<param name="Quality" value="high" />'
                        + '<param name="BGColor" value="#ffffff" />'
                        + '<param name="WMode" value="Transparent" />'
                        + '</object>';
        }

        $('body').append($(divTag).append(flashTag));

    };

    /**
     * make the flash button covers the general html button
     *
     * @param x left offset
     * @param y top offset
     * @param w button width
     * @param h button height
     */
    function _initButton(x, y, w, h) {

        var divTag = $('#css-flash-object'),
            objectTag = $('#js-flash-object');

        var style = {'width': w, 'height': h};
        divTag.css(style).css({'left': x, 'top': y});
        objectTag.css(style);

    };

    /**
     * register flash by calling methods exported by flash
     */
    function register() {

        if (_flashState) {
            var flash = document.getElementById('js-flash-object');

            flash.setFileName(this.config.fileName);
            flash.setData(this.config.data);
        }

    };

    /**
     * check whether the flash ready
     */
    function _checkState(id) {

        if (_flashState) {
            register();
            clearInterval(id);
        }

    };

    $(CLASS_NAME).unbind('mouseover');
    $(CLASS_NAME).unbind('click');

    $('body').on('mouseover', CLASS_NAME, function(e) {
        var _tar = e.target;
        _initButton(_tar.offsetLeft, _tar.offsetTop, _tar.clientWidth, _tar.clientHeight);
    });

    DataTools.prototype.configure = configure;
    DataTools.prototype.register = register;

})(window, jQuery);

