import React, { Component } from 'react';
import Axios from 'axios';

class Register extends Component {
    state = {
        username: "",
        password: "",
        num: ""
    }
    render() {
        let { username, password, num } = this.state
        return (
            <div className="login">
                <div className="login-box">
                    <h3 className="TS">请输入完整</h3>
                    <div className="login-input"><input type="text" value={username} placeholder="姓名" onChange={(e) => { this.setState({ username: e.target.value }) }}></input></div>
                    <div className="login-input"><input type="text" value={password} placeholder="密码" onChange={(e) => { this.setState({ password: e.target.value }) }}></input></div>
                    <div className="login-input"><input type="text" value={num} placeholder="学号" onChange={(e) => { this.setState({ num: e.target.value }) }}></input></div>
                    <button className='login-btn' onClick={() => { this.Register() }}>注册</button>
                </div>
            </div>
        );
    }
    Register = () => {
        let { username, password, num } = this.state

        if (username && password && num) {
            if (username.length > 1 && username.length < 6) {
                if (password.length > 3 && password.length < 7) {
                    if (num.length > 3 && num.length < 9) {
                        Axios.post("/register", { username, password, num }).then(({ data }) => {
                            if (data.code == 1) {
                                alert(data.msg)
                                setTimeout(() => {
                                    this.props.history.push("/api/login")
                                }, 1000)
                            } else {
                                alert(data.msg)
                            }
                        })
                    } else {
                        alert("请输入学号 4~8位")
                    }
                } else {
                    alert("请输入密码 4~6位")
                }
            } else {
                alert("请输入姓名 1~5字符")
            }
        } else {
            alert("请按照规定输入，缺少参数")
        }

    }
}

export default Register;