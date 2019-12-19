import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {
    state = {
        num: "",
        password: ""
    }
    render() {
        let { num, password } = this.state
            return (
                <div className="login">
                    <div className="login-box">
                        <h3>登录</h3>
                        <div className="login-input"><input value={num} placeholder="学号" type='text' onChange={(e) => {
                            this.setState({
                                num: e.target.value
                            })
                        }} /></div>
                        <div className="login-input"><input value={password} placeholder="密码" type='password' onChange={(e) => {
                            this.setState({
                                password: e.target.value
                            })
                        }} /></div>
                        <div className="login-button">
                            <h4 className="B-h4" onClick={() => {
                                this.login()
                            }}>登录</h4>
                            <h4  className="B-h4"  onClick={() => {
                                this.props.history.push('/api/register')
                            }}>注册用户</h4>
                        </div>
                    </div>
                </div>
            );
        }
        // );
    login = () => {
        let { num, password } = this.state
        if (num && password) {
            if (num.length > 3 && num.length < 8) {
                if (password.length > 3 && password.length < 7) {
                    Axios.post("/login", { num, password }).then(({ data }) => {
                        if (data.code == 1) {
                            localStorage.username = data.data[0].username
                            localStorage.num = num;
                            localStorage.password = password;
                            localStorage.token = data.token;
                            localStorage.role=data.data[0].role
                            alert(data.msg)
                            this.props.history.push("/api/home")
                        }else{
                            alert(data.msg)
                        }
                    })
                } else {
                    alert("密码输入有误")
                }
            } else {
                alert("账号输入有误")
            }
        } else {
            alert("输入有误")
        }
    }
    gologin = () => {
        this.props.history.push("/api/register")
    }
}

export default Login;
