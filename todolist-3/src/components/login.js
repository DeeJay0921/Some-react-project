import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';

const FormItem = Form.Item;

class _Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form className="signIn"> {/* 登录*/}
                <FormItem className="row">
                    {getFieldDecorator('userName-login', {
                        rules: [{required: true, message: '用户名不能为空！'}],
                    })(<Input type="text"
                              prefix={<Icon type="user"></Icon>}
                        // value={this.state.formData.username}
                              onChange={this.props.changeInfo.bind(null,'username')}
                              placeholder="用户名" size="large"/>)}
                </FormItem>
                <FormItem className="row">
                    {getFieldDecorator('password-login', {
                        rules: [{required: true, min: 6, message: '密码不能小于6位'}],
                    })(<Input type="password"
                              prefix={<Icon type="lock"></Icon>}
                              onChange={this.props.changeInfo.bind(null, 'password')}
                              placeholder="密码"
                              size="large"/>)}
                </FormItem>
                <div className="row actions">
                    <Button type="primary" style={{width: '390px'}}
                            onClick={this.props.handleSubmit.bind(null, 'signIn')}>登录</Button>
                </div>
                <div className="swtichLoginAndRegister">
                    <div>
                        还没有账号？<span onClick={this.props.switch.bind(this, false)} style={{cursor: 'pointer', color: '#1890ff'}}>点击注册</span>
                    </div>
                    <div>
                        <span style={{cursor: 'pointer', color: '#1890ff'}} onClick={this.props.toForgetPassword}>忘记密码了？</span>
                    </div>
                </div>
            </Form>
        )
    }
}

const Login = Form.create()(_Login)
export default Login