var command = require("./index");
new command()
    .Commands({
        log:["a","这是一个命令",{},[]],
        callback:function () {
            console.log(123)
        }
    })
    .Commands({
        log:["b"],
    })
    .Commands({
        log:["c"],
    })
    .init();