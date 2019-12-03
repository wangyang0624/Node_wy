#! /usr/bin/env node

const program = require('commander');


let inquirer = require("inquirer")

const superagent = require('superagent');

let { version } = require("./package.json")



program
    .version(version)

    .action(() => {
        let list = [
            { message: "请输入", name: "name" }
        ]

inquirer.prompt(list).then((con) => {
    superagent
        .get(`http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1`)
        .query({ q: con.name })
        .end((err, res) => {
            console.log(res.body.translation[0])
        });
    })

})

program.parse(process.argv)
