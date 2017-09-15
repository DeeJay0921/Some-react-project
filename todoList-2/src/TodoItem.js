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
        this.props.toggle(e,this.props.todo);
    }
    delete(e) {
        this.props.delete(e,this.props.todo)
    }
}
export default TodoItem;