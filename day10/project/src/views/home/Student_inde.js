import React, { Component } from 'react';
import http from "../../uilt/axios2"
import echarts from "echarts"
import EchartsForReact from "echarts-for-react"

class Delit extends Component {
    state = {
        option: {
            title: {
                text: "今日班级成绩分布图"
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                name: "区间"
            },
            yAxis: {
                type: 'value',
                name: "分数"
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }, {
                data: [80, 32, 91, 94, 190, 130, 120],
                type: 'line'
            }]
        },
        optionz: {
            title: {
                text: "月"
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }, {
                data: [82, 942, 981, 994, 1390, 1300, 1300],
                type: 'line'
            }]
        }
    }
    render() {
        let { option, optionz } = this.state
        return (
            <div className="STU">
                <EchartsForReact
                    option={option}
                    style={{ height: '250px', width: '400px' }}
                ></EchartsForReact>

                <EchartsForReact
                    option={optionz}
                    style={{ height: '250px', width: '400px' }}
                ></EchartsForReact>
            </div>
        );
    }
    componentDidMount() {
        let num = localStorage.num
        http.get('/getdayscore', { num }).then(({ data }) => {
            if (data.code == 1) {
                this.setState({
                    option: {
                        xAxis: {
                            type: 'category',
                            data: data.list.timearr
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: data.list.theoryarr,
                            type: 'bar'
                        }, {
                            data: data.list.skillarr,
                            type: 'bar'
                        }]
                    }
                })
            }
        })
        http.get("/getscorelist").then(res=>{
            this.setState({
                optionz : {
                    title:{
                        text:"月"  
                      },
                    xAxis: {
                        type: 'category',
                        data: res.data.list.timearr,
                        name: "时间"
                    },
                    yAxis: {
                        type: 'value',
                        name:"分数"
                    },
                    series: [{
                        data: res.data.list.theoryarr,
                        type: 'line'
                    },{
                        data:res.data.list.skillarr,
                        type: 'line'
                    }]
                }
            })
        })
        http.get("/area").then(res=>{
            console.log(res)
            let newarr=[];
            res.data.data.arr.forEach(item=>{
                newarr.push(item.product)
            })
            this.setState({
                option : {
                    title:{
                      text:"日考"  
                    },
                    xAxis: {
                        type: 'category',
                        data:newarr,
                        name: "区间"
                    },
                    yAxis: {
                        type: 'value',
                        name: "分数"
    
                    },
                    series: [{
                        type: 'bar'
                    }]
                }
               })
        })
    }
}

export default Delit;