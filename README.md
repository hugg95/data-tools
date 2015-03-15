# data-tools
***
DataTools now provides ability to export data into xls from the web page
 with support of Abobe Flash.

### Usage
1. get source using git `git clone https://github.com/lncwwn/data-tools.git data-tools`
2. copy file __DataTools.swf__ and __DataTools.js__ into your own project, 
and add `<script src="path/DataTools.js" type="text/javascript">` into your html file.
3. create an instance of DataTools and configure it:   
<script type="text/javascript">
        var config = {
            flashPath: 'youpath/DataTools.swf',
            fileName: 'demo.xls',
            dataArr: [[1,2,3], [4,5,6], [7, 8, 9]]
        };
        var dataTools = new DataTools(config);
</script>
