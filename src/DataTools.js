/**
 * DataTools provides export capability.
 * @author victor li
 * @date 2015/03/04
 * @version 0.0.1
 * released under terms of MIT lincense
 */

var DataTools,
    setState,
    test;

;(function(window, $, undefined) {

    // default setting
    var _config = {

        flashPath: '',
        fileName: '',
        // class name of the export button or other HTML elements
        className: '.js-export-btn',
        // the parameter 'data' only accept string
        data: ''

    };

    // _flashState is false when document loaded,
    // its value will be set to true after flash ready
    var _flashState = false;

    /**
     * flash will call this method to notify javascript runtime environment
     * that flash was ready, if it is ready, it will set _flashState to true
     */
    setState = function() {

        _flashState = true;

    };

    // javascript may call this function
    // to test whether the flash is available
    test = function() {

        var testMsg = 'flash avaliable now';
        if (console && console.log) {
            console.log(testMsg);
        } else {
            alert(testMsg);
        }

    };

    DataTools = function(config) {

        configure(config);
        _init();

    };

    function _init() {

        _initFlash(this.config.flashPath);

        var _id = setInterval(function() {
            _checkState(_id);

        }, 100);

    };

    var _this = {};

    /**
     * configure DataTools
     */
    function configure(config) {

        this.config = $.extend(_config, config);

        _this.config = this.config;

        if ('.' !== this.config.className.charAt(0)) {
            this.config.className = '.' + this.config.className;
        }

    };

    /**
     * append the flash object tag into html body
     */
    function _initFlash(flashPath) {

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

    console.log(_this);

    $(_this.config.className).unbind('mouseover');
    $(_this.config.className).unbind('click');

    $('body').on('mouseover', _this.config.className, function(e) {
        var _tar = e.target;
        _initButton(_tar.offsetLeft, _tar.offsetTop, _tar.clientWidth, _tar.clientHeight);
    });

    DataTools.prototype.configure = configure;
    DataTools.prototype.register = register;

})(window, jQuery);

