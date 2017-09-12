# Ncommand [![npm](https://img.shields.io/badge/npm-Install-zys8119.svg?colorB=cb3837&style=flat-square)](https://www.npmjs.com/package/ncommand)  [![github](https://img.shields.io/badge/github-<Code>-zys8119.svg?colorB=000000&style=flat-square)](https://github.com/zys8119/Ncommand)
Ncommand是一个控制台交互式命令解析控制器。可以快速便捷的开发一个新的脚手架。

## 安装

```
npm i ncommand
```

## 教程
##### 1、引入Ncommand
```javascript
var command = require("Ncommand");
```
##### 2、new 一个 cmmmand
>###### 说明:
>######     Optionsc(Object),
>######     Optionsc.input(Object|Array)，默认为["Commands","Options"]，例如：
    new command({input:[]}) 
>######     Optionsc.input[0,1,2....] (String|Object)，例如：
    new command({input:["name1","name2"]})
    new command({input:[{
        fnName:"name1",
        title:"我是附带说明" //选填
    },"name2"]})
    //如果更改了默认的Optionsc参数选项的话，那么后面就该调用对应方法，例如：
    new command({input:["name1","name2"]}).name1().name2();
```javascript
new command(Options)
```
##### 3、引入Ncommand
```javascript
var command = require("Ncommand");
```
##### 4、引入Ncommand
```javascript
var command = require("Ncommand");
```
##### 5、引入Ncommand
```javascript
var command = require("Ncommand");
```
##### 6、引入Ncommand
```javascript
var command = require("Ncommand");
```
##### 7、引入Ncommand
```javascript
var command = require("Ncommand");
```
##### 8、引入Ncommand
```javascript
var command = require("Ncommand");
```
##### 9、引入Ncommand
```javascript
var command = require("Ncommand");
```
##### 10、引入Ncommand
```javascript
var command = require("Ncommand");
```
#### 例子如下

```javascript
var command = require("Ncommand");
new command()
    .Commands({
        log:["a","这是...red('一')个命令",{},[]],
        callback:function () {
            this
                .Commands({
                    log:["c","这是a命令下的c命令",{},[]],
                    callback:function () {
                        console.log(this)
                    }
                })
                .Commands({
                    log:["-h","这是帮助命令",{},[]],
                    callback:function () {
                        console.log(this)
                    }
                })
                .init();
        }
    })
    .Commands({
        log:["b"],
    })
    .Options({
        log:["c"],
        callback:function (w) {
            this.console.warn("我是当前的argv参数："+w)
        }
    })
    .init();
```