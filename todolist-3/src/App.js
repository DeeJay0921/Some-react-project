import React, {Component} from 'react';
import 'normalize.css/normalize.css'
import './App.css';
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import UserDialog from './components/UserDialog'
import { getCurrentUser,signOut } from './leanCloud'

import {Button} from 'antd';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            todoList: [
                {id: 1, title: 'first todo', status: 'completed', deleted: false},
                {id: 1, title: 'first todo', status: 'completed', deleted: false}
            ]
        }
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
                <h1>{this.state.user.username||'我'}的待办</h1>
                <Button onClick={this.signOut.bind(this)}>LogOut</Button>
            </div>
            <div className="inputWrapper">
                <TodoInput content={this.state.newTodo}
                           onSubmit={this.addTodo}
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
                    {this.state.user.id ? null : <UserDialog onSignUpOrSignIn={this.getUserName.bind(this)}></UserDialog>}
                </div>
            </div>
        );
    }

    // 输入newTodo更改值
    change(e) {
        this.setState({
            newTodo: e.target.value
        })
    }

    //添加一项新todo
    addTodo(e) {
        console.log('我得添加一个 todo 了')
        console.log(e.target)
    }

    toggle(todo, e) {
        todo.status = todo.status === 'completed' ? '' : 'completed'
        this.setState((prevState) => {
            return prevState
        })
    }

    delete(todo, e) {
        todo.deleted = true
        this.setState(this.state)
        console.log(todo)
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
        signOut()
        this.setState({
            user: {}
        })
    }

}

export default App;
