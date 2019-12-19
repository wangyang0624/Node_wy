import React, { Component } from 'react';
import RouterView from "../router/RouterView"
import { NavLink } from "react-router-dom"
import {withRouter} from "react-router-dom"

import axios2 from "../uilt/axios2"

class Home extends Component {
    state = {
        menulist: []
    }
    render() {
        let { menulist } = this.state
        let { routes } = this.props
        return (
            <div className="home" >
                <div className="home-header" >
                    <p>
                        欢迎， {localStorage.username}
                        {localStorage.role==1? "老师" : "同学"}
                    </p>
                    <p onClick={()=>{
                        localStorage.clear()
                        this.props.history.push('/api/login')
                    }}>退出</p>
                </div>

                <div className="home-main" >
                    <div className="home-main-left">
                        {
                            menulist.map((item, index) => {
                                return <NavLink to={'/api/home' + item.menuapi} key={index} className="navlist">{item.menuname}</NavLink>
                            })
                        }
                    </div>

                    <div className="home-main-right">
                        <RouterView routes={routes} />
                    </div>
                </div >
            </div>
        );
    }
    componentDidMount() {
        if(!localStorage.token){
            this.props.history.push("/api/login")
        }else{
            axios2.get("/menu", { headers: { token: localStorage.token } }).then(({ data }) => {
                if (data.code === 1) {
                    this.setState({
                        menulist: data.data
                    })
                } else {
                    alert(data.msg)
                }
            })
        }
    }
    tuicu=()=>{
        localStorage.clear()
        this.props.history.push("/api/login")
    }
}

export default withRouter(Home);