
import React, { Component } from 'react';

import {Switch,Route,Redirect} from "react-router-dom"


let routeslist=(props)=>{
    let {routes}=props
    let role=localStorage.role
    return (
        <Switch>
            {
                routes.map((item,index)=>{
                    return item.redirect?<Redirect to={role==1?"/api/home/teacherinde":item.redirect} key={index}></Redirect>:
                    <Route key={index} path={item.path} render={(props)=>{
                        return <item.component {...props} routes={item.children}></item.component>
                    }}></Route>
                })
            }
        </Switch>
    )
}

export default routeslist