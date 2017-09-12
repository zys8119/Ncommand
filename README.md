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
##### 2、初始化cmmmand方法
```javascript
new command(Options)
```
>###### 说明:
>######     Optionsc(Object),选填
>######     Optionsc.input {Object|Array}，默认为["Commands","Options"]，例如：
    new command({input:[]}) 
>######     Optionsc.input[args,...] {String|Object}，例如：
    new command({input:["name1","name2"]})
    new command({input:[{
        fnName:"name1",
        title:"我是附带说明" //选填
    },"name2"]})
    //如果更改了默认的Optionsc参数选项的话，那么后面就该调用对应方法，例如：
    new command({input:["name1","name2"]}).name1().name2();
##### 3、Ncommand方法
```javascript
new command()
    .Commands(param)
    //....
    .Options(param)
    //....
```
>###### 说明:
>######     param  {Object},选填，不填就不执行任何事物
>######     param.log {Array}，必填，例如：
    new command()
        .Commands({
            log:[args,...]
        })
>######     param.callback {Function}，选填，例如：
    new command()
        .Commands({
            log:["参数A"，args,...]，
            callback:function(agvs){
                //这里是当前参数的回调函数
                console.log(this);//this是new command()对象，承接上下文
                console.log(agvs);//agvs是当前执行参数，即 “ 参数A ”
                this
                .Commands({
                     log:["参数B"，args,...]，
                     callback:function(agvs){
                         //这里是当前参数的回调函数
                         console.log(this);//this是new command()对象，承接上下文
                         console.log(agvs);//agvs是当前执行参数，即 “ 参数B ”
                         //.....可以无限嵌套下去
                     }
                 })
                 //.....可以无限嵌套下去
            }
        })
##### 4、执行初始化 .init(callback,showCallback)
```javascript
new command()
    .Commands({
        log:["参数a"]
    })
    .init(callback,showCallback);
```
>###### 说明:
>######     callback {Function},选填，例如：
    new command()
        .Commands({
            log:[args,...]
        })
        .init(function(){
            //这是init的回调方法
            console.log(this);//this是new command()对象，承接上下文
        });
>######     showCallback {Array}，选填，例如：
    new command()
        .Commands({
            log:[args,...]
        })
        .init(new Function,function(){
            //帮助的回调方法
            console.log(this);//this是new command()对象，承接上下文
        });
    //备注：如果showCallback传，则会打印帮助提示信息
    //     如果showCallback不传，则不会打印帮助提示信息，等同于你在自定义帮助提示。
>######     param.callback(Function)，选填，例如：
    new command()
        .Commands({
            log:["参数A"，args,...]，
            callback:function(agvs){
                //这里是当前参数的回调函数
                console.log(this);//this是new command()对象，承接上下文
                console.log(agvs);//agvs是当前执行参数，即 “ 参数A ”
            }
        })
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
    .end("我是插入的信息")
    .Options({
        log:["c"],
        callback:function (w) {
            this.console.warn("我是当前的argv参数："+w)
        }
    })
    .init();
```