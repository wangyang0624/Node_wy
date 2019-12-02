### commander
### commander.js 是node.js的轻量级，富有表现力和强大的命令行框架。

### 安装：
npm install commander --save

### 相关api：
version方法：定义命令行程序的版本号

### 参数说明：

版本号<必须>
自定义flag<可省略>,默认为-V和--version
使用：

#### 1. 只传入版本信息

//index.js

const program = require('commander');

program
    .version('1.0.0')
    .parse(process.argv);
执行 node index.js -V 或者 node index.js --version得到版本号
#### 2. 自定义flag

//index.js

const pargram = require('commander');

program
    .version('1.0.0','-v, --version')
    .parse(process.argv);
当自定义flag时,--version不能被忽略
执行node index.js -v 或者node index.js --version的到版本号。
option方法：定义命令的选项

#### 参数说明:

自定义flag<必须>
一长一短的flag，中间可以逗号/竖线或空格隔开
flag后面可以跟参数,<>定义必须的参数，[]定义可选参数
当选项的描述<可省略>:在使用-h或者--help时会显示
选项的默认值<可省略>
使用：

##### 1.定义多个选项

const program = require('commander');

program
    .version('1.0.0')
    .option('-a,--add','add something')
    .option('-u,--update','update something')
    .option('-r,--remove','remove somthing')
    .parse(process.argv)
    
console.log('You choose:');

if(program.add) console.log(' add somthing')
if(parogram.update) console.log(' update something')
if(program.remove) console.log(' remove something')
短flag使用-，长flag使用--
program.xxx可以得到输入的选项
执行 node index.js -a 或者 node index.js -add 会打印You choose:add something
##### 2.多个单词形式

const program = require('commander');

program
    .version('1.0.0')
    .option('--add-file','add a file')
    .parse(process.argv);
if(program.addFile) console.log('add a file')

当选项为多单词形式时，使用驼峰形式得到输入项
执行 node index.js --add-file 会打印add a file
##### 3.以--no形式开头的选项,代表后面紧跟单词的相反面

//index.js

const program = require('commander');

program
    .version('1.0.0')
    .option('--no-add','not add a file')
    .parse(process.argv)
    
if(program.add) console.log('add a file')
else console.log('not add a file')
执行 node index.js --no-add 会打印not add a file
##### 4.选项后面使用<>或[]

const program = require('commander');
program
    .version('1.0.0')
    .option('-a,--add <filename>','add a file')
    .parse(process.argv)
console.log('add a file named:'+program.add)

执行node index.js -a demo.js 会打印 add a file named:demo.js
command方法：自定义命令

#### 参数说明：

自定义命令名称：
名称<必须>
命令参数<可选>:
<>和[]定义参数
命令的最后一个参数可以是可变的，需要在数组后加入...标志：在命令后面传入的参数
命令描述<可省略>
配置选项<可省略>：可配置noHelp、isDefault等
const program = require('commander');
program
    .version('1.0.0')
    .command('my-cli <path>')
    .option('-a,--add <filename>','add a file')
    .option('-u,--update <filename>','update a file')
    .option('-r,--remove <filename>','remove a file')
    .action(function(path,cmd){
        console.log(path)
        console.log(cmd.Add)
    })

program.parse(process.argv)
    
使用action后会开启输入的选项校验，若输入了未定义的选项，则抛出错误
执行 node index.js my-cli C -a demo.js 会打印C demo.js
注：一个command对应一个命令，也对应一个文件lixd-cli 命令对应bin目录下的index-init.js

##### description方法：命令的描述性语句

#### 参数说明：

命令的描述
//index.js

const program = require('commander');

program
    .version('1.0.0')
    .description('It is my cli')
    .parse(process.argv)
action 方法：定义命令的回调函数

##### 参数说明：

1 回调函数
parse方法：用于解析process.argv

2 参数说明：

process.argv