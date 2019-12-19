import React, { Component } from 'react';
import { Table, Button, Modal, Input } from 'antd';

import http from "../../uilt/axios2"
const { confirm } = Modal;
class Student_man extends Component {
    state = {
        data: [],
        visible: false,
        username: "",
        num: "",
        role: "",
        id: ""
    }

    showModal = (item) => {
        this.setState({
            visible: true,
            username: item.username,
            num: item.num,
            role: item.role,
            id: item.id
        });
    };

    handleOk = e => {
        let { username, num, role, id } = this.state
        http.post('/updateon', { username, num, role, id }).then(({ data }) => {
            if (data.code == 1) {
                alert(data.msg)
                this.getdata()
            } else {
                alert(data.msg)
            }
        })

        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const columns = [
            {
                title: '序号',
                key: "17",
                render: (item) => <span>{item.id}</span>
            },
            {
                title: '姓名',
                key: "12",
                render: (item) => <span>{item.username}</span>
            },
            {
                title: '学号',
                key: "13",
                render: (item) => <span>{item.num}</span>
            },
            {
                title: '职位',
                key: "14",
                render: (item) => <span>{item.role == 2 ? "学委" : "成员"}</span>
            },
            {
                title: '操作',
                key: "15",
                render: (item) => <div>
                    <Button type="primary" onClick={() => { this.showModal(item) }}>修改</Button>
                    <Button type="danger" onClick={() => { this.showConfirm(item.id) }}>删除</Button>
                    <Button type="primary" onClick={() => { this.props.history.push("/api/home/delit/" + item.num) }}>查看详情</Button>
                </div>
            }]
        let { data, username, num, role, id } = this.state
        return (
            <div className="students">
                <div className="students-table">
                    <h2>学生管理</h2>
                    <Table columns={columns} dataSource={data} rowKey='id' size="middle" />
                </div>
                <Modal
                    title="修改成员信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div className="login-input"><Input placeholder="姓名" name="username" value={username} onChange={this.OK}></Input></div>
                    <div className="login-input"><Input placeholder="学号" name="num" value={num} onChange={this.OK}></Input></div>
                    <div className="login-input"><Input placeholder="职位" name="role" value={role} onChange={this.OK}></Input></div>
                </Modal>
            </div>
        );
    }
    OK = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        this.getdata()
    }
    //获取全部成员
    getdata = () => {
        http.get("/getxmlist").then(({ data }) => {
            if (data.code == 1) {
                this.setState({
                    data: data.data
                })
            }
        })
    }
    //删除成员
    showConfirm = (id) => {
        let this_ = this
        confirm({
            title: '你确定要删除吗?',
            content: '确定删除后1秒内关闭弹框',
            onOk() {
                http.get("/delxmlist", { id }).then((data) => {
                    if (data.code == 1) {
                        alert(data.msg)
                    }
                    this_.getdata()
                })
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    }

}

export default Student_man;