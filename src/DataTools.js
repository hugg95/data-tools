/**
 * DataTools provides export capability.
 * @author victor li
 * @date 2015/03/04
 * @version 0.0.1
 */
var DataTools;

;(function(window, $, undefined) {

    // default setting
    var _config = {

        flashPath: '',
        fileName: '',
        data: ''

    };

    // _flashState is false by default,
    // its value will be set to true after flash ready
    var _flashState = false;

    DataTools = function(config) {

        configure(config);
        _init();

    };

    // class name of export button
    var CLASS_NAME = '.js-export-btn';

    var DIV_HTML = '<div id="js-data-tools" style="position: absolute; width: 0; height: 0; z-index: 99999;"></div>';

    var EMBED_HTML = '<embed width="0" height="0" quality="high" bgcolor="#ffffff" '
                    + 'name="fs-data-tools" id="fs-data-tools" wmode="transparent" '
                    + 'allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" '
                    + 'pluginspage="http://www.macromedia.com/go/getflashplayer" />';

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
     * set attribute "src" of tag <embed> and append to html body
     */
    function _initFlash(flashPath) {

        var cover = $(DIV_HTML),
            flash = $(EMBED_HTML).attr('src', flashPath);

        $('body').append(cover.append(flash));

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

        var cover = $('#js-data-tools'),
            flash = $('#fs-data-tools');

        var style = {'width': w, 'height': h};
        cover.css(style).css({'left': x, 'top': y});
        flash.css(style);

    };

    /**
     * flash will call this method to notify javascript runtime environment
     * that flash was ready, if it is ready, it will set _flashState to true
     */
    window.setState = function() {

        _flashState = true;

    };

    /**
     * register flash by calling methods exported by flash
     */
    function register() {

        if (_flashState) {
            var flash = document.getElementById('fs-data-tools');

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

