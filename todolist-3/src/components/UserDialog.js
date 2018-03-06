import React,{ Component } from 'react'
import './style/UserDialog.css'

class UserDialog extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    A Simple TodoList by DeeJay based on React.js
                </div>
            </div>
        )
    }
}
export default UserDialog