import React from 'react';

class TodoItem extends React.Component {
    render () {
        return (
            <div className="TodoItem">
                <input type="checkbox" checked={this.props.todo.status === 'completed'}
                onChange={this.toggle.bind(this)}/>
                <span className="title">{this.props.todo.title}</span>
                <button className="iconfont" onClick={this.delete.bind(this)}>&#xe600;</button>
            </div>
        )
    }
    toggle(e) {
        this.props.toggle(this.props.todo,e);
    }
    delete(e) {
        this.props.delete(this.props.todo,e)
    }
}
export default TodoItem;