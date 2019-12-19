import React, { Component } from 'react';

class Person_set extends Component {
    render() {
        return (
            <div className='personset'>
                <div className="personset-box">
                    <h3>个人信息</h3>
                    <div className="personset-bottom">
                        <div className="personset-item">
                            <p className='personset-left'>姓名</p><p>{localStorage.username}</p>
                        </div>

                        <div className="personset-item">
                            <p className='personset-left'>{localStorage.roleId === 1 ? "教师号" : "学号"}</p><p>{localStorage.num}</p>
                        </div>

                        <div className="personset-item">
                            <p className='personset-left'>密码</p><p>{localStorage.password}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Person_set;