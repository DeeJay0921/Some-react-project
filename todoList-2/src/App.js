import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import './App.css'
import './TodoItem.css'
import './TodoInput.css'
import leanCloud from './leanCloud'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut,TodoModel} from './leanCloud'
import AV from './leanCloud'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            TodoList: []
        }
        let user = getCurrentUser()
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state))
                stateCopy.TodoList = todos
                this.setState(stateCopy)
            },(error)=> {
                console.log(error)
            })
        }
    }

    render() {
        let todos = this.state.TodoList.filter((item) => {
            return !item.deleted;
        }).map((item,index) => {
            return (
                <li key={index}>
                    <TodoItem todo={item} toggle={this.toggle.bind(this)}
                              delete={this.delete.bind(this)}></TodoItem>
                </li>
            )
        })
        return (
            <div className="App">
                <h1>{this.state.user.username || '我'}的待办事项
                    {this.state.user.id ? <button onClick={this.signOut.bind(this)}><span className="iconfont">&#xe601;</span></button> : null}
                </h1>
                <TodoInput content={this.state.newTodo} onSubmit={this.addTo.bind(this)} onChange={this.changeTitle.bind(this)}></TodoInput>
                <ol className="TodoList">
                    {todos}
                </ol>
                {/*如果已经登录/注册，就关闭登录/注册界面*/}
                {this.state.user.id  ? null : <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this)} onSignIn={this.onSignUpOrSignIn.bind(this)}></UserDialog>}
            </div>
        )
    }
    onSignUpOrSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = user;
        this.setState(stateCopy);
    }
    signOut () {
        signOut();
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = {};
        this.setState(stateCopy);
    }
    addTo (e) {
        let newTodo = {
            title: e.target.value,
            status: '',
            deleted: false
        }
        TodoModel.create(newTodo,(id)=>{
            newTodo.id = id;
            console.log('userID: ' + id);
            this.state.TodoList.push(newTodo);
            this.setState({
                newTodo: '',
                TodoList: this.state.TodoList,
            })
        },(error) => {
            console.log(error);
        })
    }


    changeTitle(e){
        this.setState({
            newTodo: e.target.value,
            TodoList: this.state.TodoList
        })
    }
    toggle (todo,e) {
        let oldStatus = todo.status;
        todo.status = todo.status === 'completed' ? '' : 'completed';
        TodoModel.update(todo,()=>{
            this.setState(this.state);
        },(error)=> {
            todo.status = oldStatus;
            this.setState(this.state);
        })
    }
    delete (todo,e) {
        TodoModel.destroy(todo.id,()=>{
            todo.deleted = true;
            this.setState(this.state);
        })
    }
}
export default App;