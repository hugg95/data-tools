/**
 * add abaility on DataTools to export Microsoft XLSX document.
 * @author victor li
 * @date 2015/03/18
 * @version 0.0.1
 * released under terms of MIT lincense
 */

;(function(window, $, undefined) {

    'use strict';

    function Workbook() {

        this.SheetNames = [];
        this.Sheets = {};

    };

    /**
     * determine whether the input string is numeric
     * @param string
     * @return boolean
     *          true: is numeric, false: is not numeric
     */
    function isNumeric(string) {
        var numeric = new RegExp(/^\d+|\d+\.\d+$/);
        return numeric.test(string);
    };

    /**
     * determine whether the input string is percentage
     * @param string
     * @return boolean
     *          true: is percentege, false: is not percentage
     */
    function isPercentage(string) {
        var percentage = new RegExp(/^(\d+|\d+\.\d+)\%{1}$/);
        return percentage.test(string);
    };

    function datenum(v, date1904) {
        if(date1904) v+=1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    };

    /**
     * create Microsoft XLS/XLSX worksheet
     * @param data a two-dimensional array
     */
    function createWorksheet(data) {

        var worksheet = {},
            range = {s: {c: 10000, r: 10000}, e: {c: 0, r: 0}};

        for (var r = 0; r < data.length; r++) {
            for (var c = 0; c < data[r].length; c++) {
                var cell = {v: data[r][c]};
                if (range.s.c > c) range.s.c = c;
                if (range.s.r > r) range.s.r = r;
                if (range.e.c < c) range.e.c = c;
                if (range.e.r < r) range.e.r = r;

                if (null === cell.v) continue;

                // string format
                if ('string' === typeof cell.v) {
                    cell.t = 's';

                    // "0.00%"
                    if (isPercentage(cell.v)) {
                        cell.t = 'n';
                        var temp = cell.v.substr(0, cell.v.length - 1);
                        cell.v = Number(temp) / 100;
                        cell.z = XLSX.SSF._table[10];
                    }
                }

                if ('number' === typeof cell.v) {
                    cell.t = 'n';
                    // "0.00"
                    if ((cell.t + '').indexOf('.') !== -1) {
                        cell.z = XLSX.SSF._table[2];
                    }
                }

                // boolean format
                if ('boolean' === typeof cell.v) {
                    cell.t = 'b';
                }

                // date format
                if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = XLSX.SSF._table[14];
                    cell.v = datenum(cell.v);
                }

                var cellRef = XLSX.utils.encode_cell({c: c, r: r});
                worksheet[cellRef] = cell;

            }
        }

        worksheet['!ref'] = XLSX.utils.encode_range(range);

        return worksheet;
    };

    /**
     * save excel into local disk
     */
    function saveExcel() {

        var data = this.config.data,
            nameWithType = this.config.fileName.split('.'),
            name = nameWithType[0],
            sheetName = this.config.sheetName;

        var workbook = new Workbook(),
            worksheet = createWorksheet(data);

        workbook.SheetNames.push(sheetName);
        workbook.Sheets[sheetName] = worksheet;

        var wbout = XLSX.write(workbook,
                {
                    bookType: 'xlsx',
                    bookSST: true,
                    type: 'binary'
                });

        var buf = new ArrayBuffer(wbout.length),
            view = new Uint8Array(buf);
        for (var i = 0; i < wbout.length; i++) {
            view[i] = wbout.charCodeAt(i) & 0xFF;
        }

        saveAs(new Blob([buf],
                   {
                       type: 'application/octet-stream'
                   }), this.config.fileName);

    };

    DataTools.prototype.saveExcel = saveExcel;

    DataTools.prototype.initExcel = function() {

        $(this.config.className).unbind('mouseover');
        $(this.config.className).unbind('click');

        var _this = this;

        $('body').on('click', this.config.className, function(e) {
            e.preventDefault();
            saveExcel.call(_this);
        });

    };

})(window, jQuery);

