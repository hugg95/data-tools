### 简介
data-tools提供了在前端使用JavaScript导出数据的能力，支持以纯文本格式如CSV以及Microsoft XLSX格式的导出。   
以Microsoft XLSX格式的导出能力来自__[js-xlsx](https://github.com/SheetJS/js-xlsx)__。   
因此，在使用data-tools时需要添加以上两个工具的依赖，此外还需要__[jQuery1.x](http://jquery.com/)__。   
所有依赖均可在`dist/`文件夹内找到。
### 项目结构
`src/`: JavaScript代码文件   
`dist/`: 合并压缩后的JavaScript文件   
`as3/`: ActionScript代码文件以及编译过的DataTools.swf文件   
`sample/`: 如何使用的演示文件
### 如何使用
1. 获得data-tools源码，`git clone https;//github.com/data-tools.git`;
2. 复制`dist/`中的`datatools.core.min.js`到你的项目中并在页面中引入，`<script type="text/javascript" src="path/to/datatools.core.min.js"></script>`;
3. __纯文本格式导出：__   
为兼容各浏览器版本，纯文本格式的导出实际由flash作为支持，复制`as3/`中的`DataTools.swf`到你的项目中。
创建DataTools实例并进行配置:
`var config = {   
    flashPath: 'path/to/DataTools.js',   
    className: '' // 点击按钮触发导出事件，该按钮的默认class名为`js-export-btn`   
    data: '1,2,3,4\n5,6,7,8\n'   
};`   
`var dt = new DataTools();`   
`dt.configure(config);`   
`dt.initFlash();`   
在你的页面上添加一个class名称为`js-export-btn`的button元素，至此纯文本格式的导出配置就完成了。
4. __Microsoft XLSX格式导出：__   
此时不需要flash的支持，无需引入`DataTools.swf`。复制`dist/`中的`xlsx.core.min.js`,`xlsx.support.min.js`,`FileSaver.min.js`到你的项目中并在页面引入；
创建DataTools实例并进行配置：
`var config = {   
    className: '', // 同上   
    data: [[1,2,3], [4,5,6], [7,8,9]] // 二维数组结构   
};`   
`var dt = new DataTools();`   
`dt.configure(config);`   
`dt.initExcel();`   
在你的页面上添加一个class名称为`js-export-btn`的button元素，至此Microsoft XLSX格式的导出配置就完成了。
