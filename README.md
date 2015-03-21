# 简介
data-tools提供了在前端使用JavaScript导出数据的能力，支持以纯文本格式如CSV以及Microsoft XLS/XLSX格式的导出。   
以Microsoft XLS/XLSX格式的导出能力来自__[js-xls](https://github.com/SheetJS/js-xls)__，以及__[js-xlsx](https://github.com/SheetJS/js-xlsx)__两个项目。   
因此，在使用data-tools时需要添加以上两个工具的依赖，此外还需要__[jQuery1.x](http://jquery.com/)__。   
所有依赖均可在`dist/`文件夹内找到。
# 项目结构
`src/`: JavaScript代码文件   
`dist/`: 合并压缩后的JavaScript文件   
`as3/`: ActionScript代码文件以及编译过的DataTools.swf文件   
`sample/`: 如何使用的演示文件   
# 如何使用
1. __以纯文本格式导出：__
