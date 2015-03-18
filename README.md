# data-tools
DataTools now provides ability to export data into CSV or Microsoft XLS/XLSX document from the web page.

# usage
1. get source `git clone https://github.com/lncwwn/data-tools.git data-tools`
2. copy __DataTools.swf__ and __DataTools.min.js__ into your own project, 
and add `<script src="path/DataTools.min.js" type="text/javascript">` into your html.
3. create an instance of DataTools and configure it:
<script type="text/javascript">
        var config = {
            flashPath: 'youpath/DataTools.swf',
            fileName: 'demo.xls',
            dataArr: [[1,2,3], [4,5,6], [7, 8, 9]]
        };
        var dataTools = new DataTools(config);
</script>
