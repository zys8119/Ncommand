var command = require("./index");
new command()
    .Commands({
        log:["aa","asdasdas","<a>",{},[1],"AAAA...red('sdfsd')...success('成功')","...info('1/2')8778","left...info('content')right",".red('A')","..red('B')","weqw...info('2')wqe..info()...red('asda')","testTxt","...abc('155')",`asa`],
    })
    .Commands({
        log:["left<...red('标签')>right","脚本,测试"],
    })
    .Commands({
        log:["left<...red('标签')>right","脚本,测试","...info(1)"],
    })
    .Commands({
        log:["left<...red('标签')>right","脚本,测试...info(1)",""],
    })
    .Commands({
        log:["...info(1)"],
    })
    .Commands({
        log:["  ...info(2)"],
    })
    .Options({log:["a"]})
    .Options({log:["b...info(3)"]})
    .Options({log:[""]})
    .Options({log:[]})