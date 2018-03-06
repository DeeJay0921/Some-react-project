import React, {Component} from 'react';
import 'normalize.css/normalize.css'
import './App.css';
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import UserDialog from './components/UserDialog'

import {Button} from 'antd';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        return (
            <div className="App">
                <div className="logined">
                    <h1>todos</h1>
                    <div className="inputWrapper">
                        <TodoInput content={this.state.newTodo}
                                   onSubmit={this.addTodo}
                                   onChange={this.change.bind(this)}></TodoInput>
                    </div>
                    <ul>
                        {todos}
                    </ul>
                </div>
                <div className="notLogined">
                    <UserDialog></UserDialog>
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
}

export default App;
