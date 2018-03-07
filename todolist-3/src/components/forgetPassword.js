import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';

const FormItem = Form.Item;

class _ForgetPassword extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form>
                <FormItem>
                    {getFieldDecorator('forgot-password', {
                        rules: [{
                            type: 'email', message: '请输入合法的邮箱地址',
                        }, {
                            required: true, message: '请输入合法的邮箱地址',
                        }],
                    })(<Input type="email"
                              prefix={<Icon type="mail"></Icon>}
                              onChange={this.props.changeInfo.bind(null, 'resetEmail')}
                              placeholder="邮箱"
                              size="large"/>)}
                </FormItem>
                <Button type="primary" style={{width: '100%'}} onClick={this.props.resetEmail}>发送重置邮件</Button>
                <div className="swtichLoginAndRegister">
                    <span onClick={this.props.returnToLogin} style={{cursor: 'pointer', color: '#1890ff'}}>返回登录</span>
                </div>
            </Form>
        )
    }
}

const ForgetPassword = Form.create()(_ForgetPassword)
export default ForgetPassword