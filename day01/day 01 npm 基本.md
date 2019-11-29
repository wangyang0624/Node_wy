## npm
#### npm (node package manger) node包管理器

npm的中文网:https://www.npmjs.com.cn/

模块：js文件   commonjs规范
 
包：把多个模块组织到一个目录中，该目录中有package.json(包的描述文件)



### commonjs规范:

##### 抛出模块：

module.exports和exports的区别和关系；

exports是module.exports的别名

module.exports：后者覆盖前者

exports:已属性的形式添加，不能直接赋值

引入模块：require() 默认他会找module.exports 抛出的内容

### npm 的作用

1.安装

2.卸载

3.查看

4.使用

5.更新

### npm管理包的那些方面

##### 下载

1. 本地下载
    安装本地开发依赖  ---->devDependencies字段内
   
    npm install/i 包名 --save-dev/-D
    
    安装本地线上依赖 ---->dependencies字段内

    npminstall/i 包名 --save/-S
    
2. 全局下载
    
    npm i 包名 -g

##### 更新
 
 npm update 包名 -S/-D/-g

##### 卸载

1.本地卸载
 
  npm uninstall 包名 -D/-S
  
2.全局卸载

  npm uninstall 包名 -g
  
#### npm 包查找规则 

require(模块标识)
1>路径(相对路径和绝对路径)2>包名

1>./相对(当前目录) 2>/绝对(磁盘目录)
 
2>包名

第一步：node_modules文件的查找规则

1)先当前文件下找---->一层一层向上找直到磁盘根目录 ---> 全局配置环境变量NODE_PATH查找报错：Error:Cannot find module '包名'

第二步：
1)先对应包名文件夹 ---> package.json main字段 没有--->index.js

### npm root -g 是查看全局下载包的路径
报错：不是内部外部命令：解决方法：执行文件所在目录配置到全局环境变量的path下
    
### 设置镜像源：
国外：http://registry.npmjs.org/

淘宝：https://registry.npm.taobao.org

npm config set registry <镜像源地址>   设置镜像源地址
 
npm config get registry                查看镜像源地址 

### npm 下载包的步骤：
 
 1>对应的镜像源查看是否存在执行包
  
 2>把指定的压缩包下载到指定的缓存目录下  npm config get cache
 
 3>把压缩包解压到指定目录：npm config set prefix <绝对路径>
 
 npm config get prefix 
 
### npm常用的命令
 
 npm view 包名 versions 所有版本 
  
 npm view 包名 versions 所有版本
 
 npm search 包名
 
 
### git生成公钥和密钥  ssh-keygen
 
 github支持两种协议：https  ssh
 
 https:每次提交代码，都需要输入用户名和密码
 
 ssh:配置公钥和密钥
 
### 发包
 
 1.npm 镜像源必须是国外的
 
 2.必须要有package.json文件 name名一定不能和现有的包名重复
 
 3.新建入口文件 编写功能
 
 4.npm login
 
 5.npm publish
 
 6.npm unpublish 包名 --force 在24小时内发的包可以删除