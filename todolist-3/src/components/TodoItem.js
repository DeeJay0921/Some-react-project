import React from 'react'
import {Checkbox, Icon, Button} from 'antd';
import './style/TodoItem.css'


export default class TodoItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render(e) {
        return (
            <div className="TodoItem">
                <div className="checkAndContent">
                    <Checkbox onChange={this.toggle.bind(this)}
                              checked={this.props.todo.status === 'completed'}/>
                    <span
                        className={this.props.todo.status === 'completed' ? 'finished' : ''}>{this.props.todo.title}</span>
                </div>
                <Button type={"danger"} icon={"close"}
                        shape={"circle"}
                        onClick={this.props.onDelete.bind(null, this.props.todo)}>
                </Button>

            </div>
        )
    }

    toggle(e) {
        this.props.onToggle(this.props.todo, e)
    }

}