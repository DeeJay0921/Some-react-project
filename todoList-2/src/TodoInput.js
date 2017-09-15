import React from 'react';

class TodoInput extends React.Component {
    render () {
        return (
            <div>
                <input className="TodoInput" type="text" value={this.props.content}
                       onKeyPress={this.submit.bind(this)} placeholder="输入待办事项，按下Enter添加"
                       onChange={this.changeTitle.bind(this)}/>
            </div>
        )
    }
    submit (e) {
        if (e.key === 'Enter') {
            this.props.onSubmit(e)
        }
    }
    changeTitle(e) {
        this.props.onChange(e);
    }
}
export default TodoInput;