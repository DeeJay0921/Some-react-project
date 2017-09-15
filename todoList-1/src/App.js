import React, { Component } from 'react';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import './App.css'
import './TodoItem.css'
import './TodoInput.css'
import * as localStore from './localStore'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTodo: '',
            TodoList: localStore.load('TodoList') || []
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
                <h1>My-Todo-List</h1>
                <TodoInput content={this.state.newTodo} onSubmit={this.addTo.bind(this)} onChange={this.changeTitle.bind(this)}></TodoInput>
                <ol className="TodoList">
                    {todos}
                </ol>
            </div>
        )
    }
    componentDidUpdate () {
        localStore.save('TodoList',this.state.TodoList)
    }
    addTo (e) {
        this.state.TodoList.push({
            id: idMaker(),
            title: e.target.value,
            status: null,
            deleted: false
        })
        this.setState({
            newTodo: '',
            TodoList: this.state.TodoList
        })
    }
    changeTitle(e){
        this.setState({
            newTodo: e.target.value,
            TodoList: this.state.TodoList
        })
    }
    toggle (e,todoItem) {
        todoItem.status = todoItem.status === 'completed' ? '' : 'completed';
        this.setState(this.state)
    }
    delete (e,todoItem) {
        todoItem.deleted = true;
        this.setState(this.state);
    }
}
export default App;
let id = 0;
function idMaker() {
    id += 1;
    return id;
}