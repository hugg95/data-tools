/**
 * add abaility on DataTools to export Microsoft XLS/XLSX document.
 * @author victor li
 * @date 2015/03/18
 * @version 0.0.1
 * released under terms of MIT lincense
 */
'use strict';

;(function(window, undefined) {

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
    }

    /**
     * create Microsoft XLS/XLSX worksheet
     * @param data a two-dimensional array
     */
    function createWorksheet = function(data) {

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

                if ('string' === typeof cell.v) {
                    cell.t = 's';
                    if (isPercentage(cell.v)) {
                        cell.t = '';
                    }
                }
                if ('number' === typeof cell.v) {
                    cell.t = 'n';
                    if ((cell.t + '').indexOf('.') !== -1) {
                        cell.z = XLSX.SSF._table[2];
                    }
                }
                if ('boolean' === typeof cell.v) {
                    cell.t = 'b';
                }
                if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = XLSX.SSF._table[14];
                    cell.v = datenum(cell.v);
                }
            }
        }

    };

})(window);

