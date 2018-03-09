import React, {Component} from 'react';
import 'normalize.css/normalize.css'
import './App.css';
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import UserDialog from './components/UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'

import {Button, Icon, Badge, Tooltip, Modal} from 'antd';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            todoList: [],
            hasFinished: 0,
            visible: false,
            confirmLoading: false
        }
        this.getAllTodoList()
    }

    render() {
        let todos = this.state.todoList.filter((item) => !item.deleted).map((item, index) => {
            return (
                <TodoItem todo={item}
                          onDelete={this.delete.bind(this)}
                          onToggle={this.toggle.bind(this)}
                          key={index}></TodoItem>
            )
        })
        const isLogined = (<div className="logined">
            <div className="topInfo">
                <div className="bell">
                    <Tooltip title={"共完成了" + this.state.hasFinished + '个todo'}>
                        <Badge count={this.state.hasFinished} showZero style={{}}>
                            <Icon type="bell" style={{fontSize: '24px', cursor: 'pointer'}}/>
                        </Badge>
                    </Tooltip>
                </div>
                <h1 className="title">Welcome, {this.state.user.username || 'stranger'}</h1>
                <Button onClick={this.signOut.bind(this)}
                        type={"primary"}
                        icon="logout" shape={"circle"}></Button>
                <Modal title="退出登录"
                       visible={this.state.visible}
                       onOk={this.handleOk.bind(this)}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.handleCancel.bind(this)}
                >
                    <p>确定退出登录么？</p>
                </Modal>
            </div>
            <div className="inputWrapper">
                <TodoInput content={this.state.newTodo}
                           onSubmit={this.addTodo.bind(this)}
                           onChange={this.change.bind(this)}></TodoInput>
            </div>
            <ul>
                {todos}
            </ul>
        </div>)
        return (
            <div className="App">
                {this.state.user.id ? isLogined : null}
                <div className="notLogined">
                    {this.state.user.id ? null :
                        <UserDialog onSignUpOrSignIn={this.getUserName.bind(this)}
                                    getAllTodoList={this.getAllTodoList.bind(this)}></UserDialog>}
                </div>
            </div>
        );
    }

    //初始化获得当前用户所有的todoList
    getAllTodoList() {
        let user = getCurrentUser()
        let resolve = (todos) => {
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.todoList = todos
            stateCopy.hasFinished = this.getFinishedTodoNum(stateCopy.todoList)
            this.setState(stateCopy)
        }
        if (user) { //如果目前已经登录
            TodoModel.getByUser(user, resolve)
        }
    }

    // 输入newTodo更改值
    change(e) {
        this.setState({
            newTodo: e.target.value
        })
    }

    //添加一项新todo
    addTodo(e) {
        let newTodo = {
            title: e.target.value,
            status: '',
            deleted: false
        }
        let resolve = (id) => {
            newTodo.id = id
            this.state.todoList.push(newTodo)
            this.setState({
                newTodo: '',
                todoList: this.state.todoList
            })
        }
        let reject = (error) => {
            console.log(error)
        }
        TodoModel.create(newTodo, resolve, reject) // 新增一项
    }

    toggle(todo, e) { // 更新操作
        let prevStatus = todo.status
        todo.status = todo.status === 'completed' ? '' : 'completed'
        let resolve = () => {
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.hasFinished = this.getFinishedTodoNum(stateCopy.todoList)
            this.setState(stateCopy)
        }
        let reject = (error) => {
            todo.status = prevStatus
            console.log(error)
        }
        TodoModel.update(todo, resolve, reject)
    }

    delete(todo) {
        let resolve = () => {
            todo.deleted = true
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.hasFinished = this.getFinishedTodoNum(stateCopy.todoList)
            this.setState(stateCopy)
        }
        TodoModel.destory(todo.id, resolve)
    }

    //  注册之后拿到用户名
    getUserName(userInfo) {
        console.log(userInfo)
        this.setState({
            user: userInfo
        })
    }

    // 退出登录
    signOut(e) {
        this.setState({
            visible: true,
        })
    }

    //  获取到当前已经标记完成的todo的数量
    getFinishedTodoNum(arr) {
        let num = 0
        arr.map((item) => {
            if (item.status === 'completed' && item.deleted === false) {
                num += 1
            }
        })
        return num
    }

    // Modal的一些交互处理
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        }, signOut)
        this.setState({
            user: {},
            visible: false,
            confirmLoading: false,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
}

export default App;