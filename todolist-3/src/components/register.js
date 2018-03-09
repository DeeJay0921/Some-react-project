import React, {Component} from 'react'
import {Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;

class _Register extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form className="signUp"> {/* 注册*/}
                <FormItem className="row">
                    {getFieldDecorator('userName-register', {
                        rules: [{required: true, message: '用户名不能为空！'}],
                    })(<Input type="text"
                              prefix={<Icon type="user"></Icon>}
                              onChange={this.props.changeInfo.bind(null, 'username')}
                              placeholder="用户名" size="large"/>)}
                </FormItem>
                <FormItem className="row">
                    {getFieldDecorator('password-register', {
                        rules: [{required: true, message: '密码不能小于6位'},
                            {required: true, min: 6, message: '密码不能小于6位'}],
                    })(<Input type="password"
                              prefix={<Icon type="lock"></Icon>}
                              onChange={this.props.changeInfo.bind(null, 'password')}
                              placeholder="密码"
                              size="large"/>)}
                </FormItem>
                <FormItem className="row">
                    {getFieldDecorator('email-register', {
                        rules: [{
                            type: 'email', message: '请输入合法的邮箱地址',
                        }, {
                            required: true, message: '请输入合法的邮箱地址',
                        }],
                    })(<Input type="email"
                              prefix={<Icon type="mail"></Icon>}
                              onChange={this.props.changeInfo.bind(null, 'email')}
                              placeholder="邮箱"
                              size="large"/>)}
                </FormItem>
                <div className="row actions">
                    <Button type="primary" style={{width: '390px'}}
                            onClick={this.props.handleSubmit.bind(null, 'signUp')}>注册</Button>
                </div>
                <div className="swtichLoginAndRegister">
                    <span onClick={this.props.switch.bind(this, true)}
                          style={{cursor: 'pointer', color: '#1890ff'}}>返回登录</span>
                </div>
            </Form>
        )
    }
}

const Register = Form.create()(_Register)
export default Register