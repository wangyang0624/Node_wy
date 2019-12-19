import React, { Component } from 'react';
import http from "../../uilt/axios2"
import echarts from "echarts"
import EchartsForReact from "echarts-for-react"

class Delit extends Component {
    state = {
        chengcai: [],
        buchengcai: [],
        data: [],
        option: {
            title: {
                text: "日考"
            },
            xAxis: {
                type: 'category',
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
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
        let { data, chengcai, buchengcai, option, optionz, optionb } = this.state
        
        console.log(chengcai,buchengcai)
        return (
            <div className="Tac">
                <div className="P"><span>总人数：{data.length}</span><span>成才人数：{chengcai.length}</span><span>不成材数：{buchengcai.length}</span></div>
                <h1>今日成才分析</h1>
                <EchartsForReact
                    option={option}
                    style={{ height: '250px', width: '400px' }}
                >
                </EchartsForReact>

                <EchartsForReact
                    option={optionz}
                    style={{ height: '250px', width: '400px' }}
                >
                </EchartsForReact>
            </div>
        );
    }
    componentDidMount() {
        this.ccrs()
        this.daycc()
        this.getxmlist()
    }
    //获取所有人的成绩
    getxmlist = () => {
        http.get("/getscorelist").then(res => {
            this.setState({
                optionz: {
                    title: {
                        text: "月"
                    },
                    xAxis: {
                        type: 'category',
                        data: res.data.list.timearr,
                        name: "时间"
                    },
                    yAxis: {
                        type: 'value',
                        name: "分数"
                    },
                    series: [{
                        data: res.data.list.theoryarr,
                        type: 'line'
                    }, {
                        data: res.data.list.skillarr,
                        type: 'line'
                    }]
                }
            })
        })
    }

    // 获取今天成绩
    daycc = () => {
        http.get("/area").then(res => {
            let newarr = [];
            let ll = [];
            let jn = [];
            res.data.data.arr.forEach(item => {
                newarr.push(item.product)
                ll.push(item.理论)
                jn.push(item.技能)
            })
            this.setState({
                option: {
                    title: {
                        text: "日考"
                    },
                    xAxis: {
                        type: 'category',
                        data: newarr,
                        name: "区间"
                    },
                    yAxis: {
                        type: 'value',
                        name: "人数"

                    },
                    series: [{
                        data: ll,
                        type: 'bar'
                    }]
                }
            })
        })
    }
    //获取成才人数
    ccrs = () => {
        http.get("/scorelist").then(res => {
            let chengcai = []
            let buchengcai = []
            res.data.data.forEach(item => {
                if (item.theory >= 90 && item.skill >= 90) {
                    chengcai.push(item)
                } else {
                    buchengcai.push(item)
                }
            })
            this.setState({
                data: res.data.data,
                chengcai,
                buchengcai
            })
        })
    }
    
}

export default Delit;