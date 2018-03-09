import React from 'react'
import {Checkbox, Icon} from 'antd';
import './style/TodoItem.css'


export default class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            act: false
        }
    }

    render(e) {
        return (
            <div className="TodoItem">
                <div className="checkAndContent">
                    <Checkbox onChange={this.toggle.bind(this)}
                              checked={this.props.todo.status === 'completed'}/>
                    <span className={this.props.todo.status === 'completed' ? 'finished' : ''}>{this.props.todo.title}</span>
                </div>
                <Icon type="delete" onClick={this.props.onDelete.bind(null, this.props.todo)} style={{fontSize: '18px',cursor:'pointer'}}/>
            </div>
        )
    }

    toggle(e) {
        this.props.onToggle(this.props.todo, e)
    }

}