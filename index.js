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
    if(Options.constructor.name != "Object"){
        this.ERR("command方法的Options参数类型错误,应该为一个Object对象,例如：{}");
    }
    if(["Object","Array"].indexOf(Options.input.constructor.name) < 0){
        this.ERR("command方法的Options.input参数类型错误,应该为一个Array对象，例如：[]");
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
        switch (input.constructor.name){
            case "String":
                this.onInput(input);
                break;
            case "Object":
                if(input.title && input.title.constructor.name != "String"){
                    this.ERR(`command方法的Options.input[0].title参数类型错误,
                        \n 应该为一个String对象，例如：[{title:"String"}]，说明：(选填，填后必须是字符串)`);
                }else
                if(!input.fnName || input.fnName.constructor.name != "String"){
                    this.ERR(`command方法的Options.input[0].fnName参数类型错误,
                        \n 应该为一个String对象，例如：[{fnName:"String"}，说明：(必填)]`);
                }
                this.onInput(input.fnName);
                break;
            default:
                this.ERR("command方法的Options.input参数类型错误,应该为一个Array对象，例如：[String|Object, ...]");
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
        //判断是否打印command标题
        if(this[Str+"Bool"]){
            this[Str+"Bool"] = false;
            console.log(Str)
        };
        var args = this[Str].arguments[0];
        // var args = this[Str].arguments;
        // for(var i in args){
        //     args[i] = ((i == 0)?"    ":" ")+args[i];
        // };
        // console.log(this[Str].arguments)
        //
        if(args){
            if(args.constructor.name == "Object"){
                if(args.fn && args.callback.constructor.name != "function"){
                    this.ERR(`command.${Str}方法的参数类型错误,
                        \n 应该为一个String对象，例如：[{title:"String"}]，说明：(选填，填后必须是字符串)`);
                }else
                if(!args.log || args.log.constructor.name != "Array"){
                    this.ERR(`command.${Str}方法的command.${Str}.log 参数类型错误,
                        \n 应该为一个Array对象，例如：[{fnName:"String"}，说明：(必填)]`);
                }
            }else{
                this.ERR(`command.${Str}方法参数类型错误,应该为一个Object队形，例如：{log:"String:必填",callback:"function:选填"}`);
            }
        }

    },
    /**
     *@备注方法
     *@param {String|Function} Opt
     */
    end:function (Opt) {
        Opt = Opt || '';
        switch (typeof Opt){
            case "string":
                console.log(Opt);
                break;
            case "function":
                Opt.call(this);
                break;
            default:
                this.ERR("command.end方法参数类型错误");
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