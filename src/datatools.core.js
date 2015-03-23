/**
 * DataTools provides export capability.
 * @author victor li
 * @date 2015/03/04
 * @version 0.0.1
 * released under terms of MIT lincense
 */

var DataToolsSupport = {

    // _flashState is false when document loaded,
    // its value will be set to true after flash ready
    flashState: false,

    /**
     * flash will call this method to notify javascript runtime environment
     * that flash was ready, if it is ready, it will set _flashState to true
     */
    setState: function() {

        this.flashState = true;

    },

    // javascript may call this function
    // to test whether the flash is available
    test: function() {

        var testMsg = 'flash avaliable now';
        if (console && console.log) {
            console.log(testMsg);
        } else {
            alert(testMsg);
        }

    }

};

;(function(window, $, undefined) {

    'use strict';

    // default setting
    var _config = {

        flashPath: '',
        fileName: '',
        sheetName: '',
        // class name of the export button or other HTML elements
        className: '.js-export-btn',
        // the parameter 'text' only accept string
        text: ''

    };

    function DataTools() {
        // empty line
    };

    /**
     * append the flash object tag into html body and load swf
     * @param flashPath
     */
    function _loadFlash(flashPath) {

        var _cover = '<div id="css-flash-object" style="position: absolute;'
                        + 'width: 0; height: 0; z-index: 99999;"></div>';


        // for modern internet explorers
        var _flash = '<embed src="' + flashPath + '" width="0" height="0" '
                        + 'quality="high" bgcolor="#ffffff" name="flash-object" '
                        + 'id="js-flash-object" wmode="transparent" allowScriptAccess="always" '
                        + 'allowFullScreen="false" type="application/x-shockwave-flash" '
                        + 'pluginspage="http://www.macromedia.com/go/getflashplayer">'
                        + '</embed>';

        // for old versions of Microsoft internet explorer
        if (document.documentMode
                && document.documentMode < 10) {
            _flash = '<object type="application/x-shockwave-flash" '
                        + 'data="' + flashPath + '" name="flash-object" id="js-flash-object">'
                        + '<param name="Movie" value="' + flashPath + '" />'
                        + '<param name="AllowScriptAccess" value="always" />'
                        + '<param name="Quality" value="high" />'
                        + '<param name="BGColor" value="#ffffff" />'
                        + '<param name="WMode" value="Transparent" />'
                        + '</object>';
        }

        $('body').append($(_cover).append(_flash));

    };

    /**
     * make the flash button covers the general HTML button
     *
     * @param x left offset
     * @param y top offset
     * @param w button width
     * @param h button height
     */
    function _initButton(x, y, w, h) {

        var _cover = $('#css-flash-object'),
            _flash = $('#js-flash-object');

        var style = {'width': w, 'height': h};
        _cover.css(style).css({'left': x, 'top': y});
        _flash.css(style);

    };

    /**
     * register events listener
     */
    function _registerEvents() {
        $(this.config.className).unbind('mouseover');
        $(this.config.className).unbind('click');

        $('body').on('mouseover', this.config.className, function(e) {
            var _tar = e.target;
            _initButton(_tar.offsetLeft, _tar.offsetTop,
               _tar.clientWidth, _tar.clientHeight);
        });
    };

    /**
     * check whether the flash ready
     */
    function _checkState(id) {

        if (DataToolsSupport.flashState) {

            this.registerFlash();
            clearInterval(id);
        }

    };

    DataTools.prototype.initFlash = function() {
        _loadFlash(this.config.flashPath);
        var _this = this;
        var _id = setInterval(function() {
            _checkState.call(_this, _id);

        }, 100);
    };

    /**
     * configure DataTools
     */
    DataTools.prototype.configure = function(config) {
        this.config = $.extend(_config, config);

        if ('.' !== this.config.className.charAt(0)) {
            this.config.className = '.' + this.config.className;
        }

        _registerEvents.call(this);
    };

    /**
     * register flash by calling methods exported by flash
     */
    DataTools.prototype.registerFlash = function() {
        if (DataToolsSupport.flashState) {
            var flash = document.getElementById('js-flash-object');

            if (flash) {
                flash.setFileName(this.config.fileName);
                flash.setData(this.config.text);
            }
        }
    };

    window.DataTools = DataTools;

})(window, jQuery);

