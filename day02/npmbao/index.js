#! /usr/bin/env node

const fs=require("fs")
const program = require("commander");
const inquirer = require('inquirer');
const userlist= fs.readFileSync("./datalist.json","utf-8")

const promptList = [{
     type: 'input',
     message: '设置一个用户名:',
     name: 'name',
     default:"wangyang"
 },{
     type: 'password',
     message: '设置一个密码:',
     name: 'password',
 },{
     type: 'ID',
     message: '设置一个ID(身份证):',
     name: 'ID',
 },{
     type: 'sex',
     message: '请选择性别:',
     name: 'sex',
     choices: [
         "男",
         "女",
     ]}
];

program
     .version("1.0.0")
     .command('create')
     .action(()=>{
          inquirer.prompt(promptList).then(answers => {
               let user=JSON.parse(userlist)
               if(answers.ID.match(/\d{18}/g)){
                    if(user.some(item=>item.ID==answers.ID)){
                         console.log("用户存在")
                    }else{
                         console.log("保存成功")
                         user.push(answers)
                         fs.writeFileSync ('./datalist.json', JSON.stringify(user))
                    }
               }else{
                    console.log("请重新认证身份证")
               }
           })
     })
     program.parse(process.argv)


// if(program.add){console.log("a,456")}

// fs.writeFileSync('./src/data/user.json', JSON.stringify(user))

