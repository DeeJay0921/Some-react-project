import React from 'react'
import './style/TodoInput.css'
import {Input, Icon} from 'antd'

class TodoInput extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <div className="TodoInput">
                <Input type="text"
                       size="large"
                       prefix={<Icon type="profile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       suffix={<Icon type="enter" />}
                       value={this.props.content}
                       placeholder="输入您的todo,按下回车键添加"
                       onKeyPress={this.submit.bind(this)}
                       onChange={this.changeTitle.bind(this)}/>
            </div>
        )
    }

    submit(e) {
        if (e.key === 'Enter') {
            console.log(this)
            this.props.onSubmit(e)
        }
    }

    changeTitle(e) {
        this.props.onChange(e)
    }
}

export default TodoInput