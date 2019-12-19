import React, { Component } from 'react';

import Home from "../views/Home"
import Login from "../views/Login"
import Register from "../views/Register"

import Person_set from "../views/home/Person_set"
import Score_manger from "../views/home/Score_manger"
import Student_inde from "../views/home/Student_inde"
import Student_man from "../views/home/Student_man"
import Teacher_inde from "../views/home/Teacher_inde"
import Delit from "../views/home/Delit"

let routes = [
    {
        path: "/api/home", component: Home,
        children: [
            { path: "/api/home/presonset", component: Person_set },
            { path: "/api/home/scoremanger", component: Score_manger },
            { path: "/api/home/studentinde", component: Student_inde },
            { path: "/api/home/studentman", component: Student_man },
            { path: "/api/home/teacherinde", component: Teacher_inde },
            { path: "/api/home/delit/:num", component: Delit},
            { redirect: "/api/home/studentinde" }
        ]
    },
    { path: "/api/login", component: Login },
    { path: "/api/register", component: Register },
    { redirect: "/api/home" }
]

export default routes