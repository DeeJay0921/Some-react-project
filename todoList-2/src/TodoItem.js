import React from 'react';

class TodoItem extends React.Component {
    render () {
        return (
            <div className="TodoItem">
                <input type="checkbox" checked={this.props.todo.status === 'completed'}
                onChange={this.toggle.bind(this)}/>
                <span className="title">{this.props.todo.title}</span>
                <button onClick={this.delete.bind(this)}>Delete</button>
            </div>
        )
    }
    toggle(e) {
        this.props.toggle(this.props.todo,e);
    }
    delete(e) {
        console.log(1)
        this.props.delete(this.props.todo,e)
    }
}
export default TodoItem;