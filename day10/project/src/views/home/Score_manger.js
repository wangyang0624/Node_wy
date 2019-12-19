import React, { Component } from 'react';
import { Table, Button, Modal, Input, Select } from 'antd';
import http from "../../uilt/axios2"
const { Option } = Select;
class Score_manger extends Component {
  state = {
    data: [],//未录入成绩的人员
    visible: false,//弹出框
    usernames: "",//姓名
    theory: 0,//理论  
    skill: 0,//技能
    userlist: [],//要添加成绩的人员
    id: null,
    editname: [],
    text: '',
    newdata: [],
    pageSize: 1,
    limit: 3,
    pagenum: 0
  }
  render() {

    let { data, userlist, theory, skill, id, editname, text, newdata } = this.state
    const columns = [
      {
        title: '姓名',
        key: "7",
        render: (item) => <span>{item.username}-{item.num}</span>
      },
      {
        title: '理论', key: "8",
        dataIndex: 'theory',
      },
      {
        title: '技能', key: "9",
        dataIndex: 'skill',
      },
      {
        title: "操作",
        render: (item) => <div>
          <Button type="primary" onClick={() => { this.edit(item) }}>编辑</Button>
          <Button type="danger" onClick={() => { this.del(item.id) }}>删除</Button>
        </div>
      }
    ];
    return (
      <div className="CJ">
        <h3>成绩管理</h3>
        <div className="C-main">
          <p >姓名：<input type="text" value={text} onChange={(e) => { this.setState({ text: e.target.value }) }}></input>
            {/* <button >搜索</button> */}
            <Button onClick={() => { this.like() }}>搜索</Button>
            <Button onClick={() => { this.off() }}>取消</Button>
            <Button onClick={this.showModal}>添加</Button>
          </p>
        </div>
        <div>
          <div>
            <Table columns={columns} dataSource={data} size="small" rowKey={record => record.id}
              pagination={{
                total: this.state.pagenum,
                pageSize: this.state.limit,
                current: this.state.pageSize,
                onChange: this.onchange
              }} />
          </div>
        </div>

        <div className="TC">
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {id ? editname : <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.onChange}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {userlist.length && userlist.map((item, index) => <Option value={`${item.username}-${item.num}`} key={index}>{item.username}-{item.id}</Option>)}
            </Select>}
            <Input placeholder="理论" name="theory" value={theory} onChange={this.OK}></Input>
            <Input placeholder="技能" name="skill" value={skill} onChange={this.OK}></Input>
          </Modal>
        </div>

      </div>
    );
  }
  //获取表格内容
  componentDidMount() {
    this.getdata()
  }

  getdata = () => {
    let { pageSize, limit } = this.state

    http.post('/paging', { pageSize, limit }).then(res => {
      if (res.data.code == 1) {
        this.setState({
          pagenum: res.data.pagenum,
          data: res.data.data
        })
      }
    })
  }
  onchange = (index) => {
    this.setState({
      pageSize: index
    }, () => {

      this.getdata()
    })
  }

  // getdata = () => {
  //   http.get("/scorelist").then(({ data }) => {
  //     if (data.code == 1) {
  //       this.setState({
  //         data: data.data,
  //         newdata: JSON.parse(JSON.stringify(data.data))
  //       })
  //     }
  //   })
  // }
  //点击获取查询未录入成绩的学生
  showModal = () => {
    http.get("/students").then(({ data }) => {
      if (data.code == 1) {
        this.setState({
          userlist: data.msg
        })
      } else {
        alert("获取失败")
      }
    })
    this.setState({
      visible: true
    });

  };

  //获取人名
  onChange = (value) => {
    this.setState({
      usernames: value
    })
  }

  //受控组件
  OK = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //录入成绩
  handleOk = e => {
    let { id, theory, skill, usernames } = this.state
    let num = usernames.split("-")[1]
    let username = usernames.split("-")[0]
    let url = ""
    if (id) {
      url += "/update"
    } else {
      url += "/score"
    }
    http.post(url, { num, theory, skill, username, id }).then(({ data }) => {
      if (data.code == 1) {
        this.getdata()
        alert(data.msg)
      } else {
        alert(data.msg)

        this.getdata()
      }
      this.setState({
        visible: false,
      });
    })
  };

  //删除信息
  del = (id) => {
    http.get("/del", { id }).then(({ data }) => {
      if (data.code == 1) {
        alert(data.msg)
      } else {
        alert(data.msg)
      }
      this.getdata()
    })
  }
  //编辑信息
  edit = (item) => {
    this.setState({
      visible: true,
      id: item.id,
      editname: item.username,
      theory: item.theory,
      skill: item.skill
    });
    this.getdata()
    this.setlist()
  }

  //重置框
  setlist = () => {
    this.setState({
      id: null,
      editname: '',
      theory: 0,
      skill: 0
    })
  }
  //点击X关闭
  handleCancel = e => {
    this.setState({
      visible: false,
    });
    this.setlist()
  };

  //模糊搜索
  like = () => {
    let { text, newdata } = this.state
    http.get("/like", { key: text }).then(res => {
      if (res.data.code == 1) {
        this.setState({
          data: res.data.data,
          text: ""
        })
      } else {
        this.setState({
          data: newdata
        })
      }
    })
  }

  //取消
  off = () => {
    let { newdata } = this.state
    this.setState({
      data: newdata
    })
  }
}

export default Score_manger;