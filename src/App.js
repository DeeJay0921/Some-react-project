import React, { Component } from 'react';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: 'test',
            todoList: [
                {id:1,title:'first-todo'},
                {id:2,title:'second-todo'}
            ]
        }
    }
    render() {
        let todos = this.state.todoList.map( (item,index) => {
            return (
                <li>
                    <TodoItem todo={item}></TodoItem>
                </li>
            )
        })

        return (
          <div className="App">
              <h1>我的待办</h1>
              <div className="inputWrapper">
                  <TodoInput content={this.state.newTodo}></TodoInput>
              </div>
              <ol>
                  {todos}
              </ol>
          </div>
        );
  }
}

export default App;
