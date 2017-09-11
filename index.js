/**
 * @依赖包
 * */
//颜色输出
const ncol = require("ncol");
/** 依赖包End*/
const process = require("process");
/**
 * @命令参数提示工具 by 张云山 on 2017/9/9.
 * @param {Object{input:Array(String...|Object{title:String,fnName:String}...)}} Options
 */
const command = function(Options){
    Options = Options || {};
    //默认["Commands","Options"]，命令和选项
    Options.input = Options.input || ["Commands","Options"];
    //判断数据
    if(Options.constructor.name != "Object"){
        this.ERR("command方法的Options参数类型错误,应该为一个Object对象,例如：command({})");
    }
    if(["Object","Array"].indexOf(Options.input.constructor.name) < 0){
        this.ERR("command方法的Options.input参数类型错误,应该为一个Array对象，例如：command({input:[]})");
    }
    //注册Options方法
    this.onInput = function (Str) {
        this[Options.input[i]+"Bool"] = true;
        command.prototype[Str] = function () {
            this.inptInit(Str);
            return this;
        };
    }
    for(var i = 0,len = Options.input.length ; i < len; i++){
        //注册Options.input相关事件
        let input = Options.input[i];
        //判断数据
        switch (input.constructor.name){
            case "String":
                this.onInput(input);
                break;
            case "Object":
                if(input.title && input.title.constructor.name != "String"){
                    this.ERR(`command方法的Options.input[0].title参数类型错误,
                        \n 应该为一个String对象，例如：command({input:[{title:"String",fnName:"String"}]})，说明：(title选填，填后必须是String)`);
                }else
                if(!input.fnName || input.fnName.constructor.name != "String"){
                    this.ERR(`command方法的Options.input[0].fnName参数类型错误,
                        \n 应该为一个String对象，例如：command({input:[{fnName:"String"}]})，说明：(fnName必填)`);
                }
                this.onInput(input.fnName);
                break;
            default:
                this.ERR(`command方法的Options.input参数类型错误,应该为一个Array对象，例如：command({input:["String"]})`);
                break;
        }
    }
    //参数
    this.argv = (function (argv) {
        var argvs = [];
        for(var i = 2,len = argv.length; i < len ;i++){
            argvs.push(argv[i]);
        };
        return argvs;
    })(process.argv);
};
command.prototype = {
    /**
     *@初始化命令方法
     *@param {String} Str
     */
    inptInit:function (Str) {
        Str = Str || "";
        var _this = this;
        //判断是否打印command标题
        if(this[Str+"Bool"]){
            this[Str+"Bool"] = false;
            console.log(Str)
        };
        var args = this[Str].arguments[0];
        if(args){
            if(args.constructor.name == "Object"){
                if(args.callback && args.callback.constructor.name != "Function"){
                    this.ERR(`command.${Str}方法的command.${Str}.callback 参数类型错误,
                        \n 应该为一个functiion对象，例如：${Str}({callback:"function"})，说明：(callback选填，填后必须是function)`);
                }else
                if(!args.log || args.log.constructor.name != "Array"){
                    this.ERR(`command.${Str}方法的command.${Str}.log 参数类型错误,
                        \n 应该为一个Array对象，例如：${Str}({log:"Array"})，说明：(必填)]`);
                }
            }else{
                this.ERR(`command.${Str}方法参数类型错误,应该为一个Object对象，例如：${Str}a({log:"String:必填",callback:"function:选填"})`);
            }
        }
        if(args && args.log){
            args.log = args.log.map(function(e,i){
                return ((i == 0)?"    ":" ")+JSON.stringify(e);
            });
            // console.log.apply(null,args.log);//原始写法
            //新增颜色输入控制,颜色使用说明：必须以 `...colorFn(content)` 形式使用
            this.console.color(function () {
                for(var i = 0 ,len = args.log.length ; i<len ; i++){
                    var newArgsLog = args.log[i].match(/\.{3}(\s|\w)*\(([^\(\)])*\)/img);
                    var newArgsLogOLd = newArgsLog;
                    if(newArgsLog){
                        newArgsLog = newArgsLog.map(function(p1){
                            return p1.replace(/^\.{3}/,"")
                        });
                        for(var j = 0 ,lenj = newArgsLog.length ; j<lenj ; j++){
                            var  name = newArgsLog[j].replace(/\(.*\)/img,"");
                            if(eval(`this.${name}`)){
                                //匹配除正确方法以外的内容
                                var newArgsLogExcept = args.log[i].match(/(.*?(\.{3}(\s|\w)*\(([^\(\)])*\)))|[^"]/img).map(function(e){
                                    return e.replace(/(\.{3}(\s|\w)*\(([^\(\)])*\))/img,"");
                                });
                                for(var jj = 0 ,lenjj = newArgsLogExcept.length ; jj<lenjj ; jj++){
                                    this.log(newArgsLogExcept[jj]);
                                };
                                //如果是一个正确的颜色方法，那么就使用对应的颜色方法渲染
                                eval(`this.${newArgsLog[j]}`);
                            }else{
                                //如果不是就用默认方法渲染
                                this.log(newArgsLogOLd);
                            };
                        };
                    }else{
                        //如果不包含颜色方法是内容就用默认渲染
                        this.log((function (s) {return (s)?s[0]:"";})(args.log[i].match(/^(\s)*/img))+args.log[i].replace(/^(\s)*"|"(\s)*$/img,""));
                    };
                };
            });
        }

    },
    /**
     *@备注方法
     *@param {String|Function} Opt
     */
    end:function (Opt) {
        Opt = Opt || '';
        //判断数据
        switch (typeof Opt){
            case "string":
                console.log(Opt);
                break;
            case "function":
                Opt.call(this);
                break;
            default:
                this.ERR("command.end方法参数类型错误,例如：end(string|function)");
                break;
        }
        return this;
    },
    /**
     * @颜色打印输出 继承ncl
     **/
    console:ncol,
    /**
     * @错误打印
     * @param {string} Str
     **/
    //字体颜色
    ERR:function (Str) {
        Str = Str || "错误";
        this.console.error(new Error(Str));
        process.exit();
    },
    //背景
    ERR_BG:function (Str) {
        Str = Str || "错误";
        this.console.errorBG(new Error(Str));
        process.exit();
    },
    /**
     * @参数回调
     * @param {function} callback
     */
    callback:function (callback) {
        callback = callback || new  Function;
        callback.call(this);
        return this;
    }
}
module.exports = command;