import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import './style/UserDialog.css'
import {Shake} from 'reshake'
import {signUp, signIn} from '../leanCloud'

const FormItem = Form.Item;

class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true,
            formData: {
                username: '',
                password: '',
                email: ''
            },
            tips: ''
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const register = <Form className="signUp"> {/* 注册*/}
            <FormItem className="row">
                {getFieldDecorator('userName-register', {
                    rules: [{required: true, message: '用户名不能为空！'}],
                })(<Input type="text"
                          prefix={<Icon type="user"></Icon>}
                          onChange={this.changeInfo.bind(this, 'username')}
                          placeholder="用户名" size="large"/>)}
            </FormItem>
            <FormItem className="row">
                {getFieldDecorator('password-register', {
                    rules: [{required: true, message: '密码不能小于6位'},
                        {required: true, min: 6, message: '密码不能小于6位'}],
                })(<Input type="password"
                          prefix={<Icon type="lock"></Icon>}
                          onChange={this.changeInfo.bind(this, 'password')}
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
                          onChange={this.changeInfo.bind(this, 'email')}
                          placeholder="邮箱"
                          size="large"/>)}
            </FormItem>
            <div className="row actions">
                <Button type="primary" style={{width: '390px'}}
                        onClick={this.handleSubmit.bind(this, 'signUp')}>注册</Button>
            </div>
        </Form>
        const login = <Form className="signIn"> {/* 登录*/}
            <FormItem className="row">
                {getFieldDecorator('userName-login', {
                    rules: [{required: true, message: '用户名不能为空！'}],
                })(<Input type="text"
                          prefix={<Icon type="user"></Icon>}
                    // value={this.state.formData.username}
                          onChange={this.changeInfo.bind(this, 'username')}
                          placeholder="用户名" size="large"/>)}
            </FormItem>
            <FormItem className="row">
                {getFieldDecorator('password-login', {
                    rules: [{required: true, min: 6, message: '密码不能小于6位'}],
                })(<Input type="password"
                          prefix={<Icon type="lock"></Icon>}
                          onChange={this.changeInfo.bind(this, 'password')}
                          placeholder="密码"
                          size="large"/>)}
            </FormItem>
            <div className="row actions">
                <Button type="primary" style={{width: '390px'}}
                        onClick={this.handleSubmit.bind(this, 'signIn')}>登录</Button>
            </div>
        </Form>
        let renderPart = this.state.isLogin ? login : register
        return (
            <div className="UserDialog-Wrapper">
                <Button onClick={this.alert.bind(this)}>Click to msg</Button>
                <div className="UserDialog">
                    <Shake className="title"
                           h={0}
                           v={40}
                           r={0}
                           dur={960}
                           int={53}
                           max={100}
                           fixed={true}
                           fixedStop={true}
                           freez={false}>
                        A simple and pithy TodoList
                    </Shake>
                    <div className="panes">

                        {renderPart}

                        <div className="line"></div>

                        <nav className="swtichLoginAndRegister">
                            <Button onClick={this.switch.bind(this, false)}>注册</Button>
                            <Button onClick={this.switch.bind(this, true)}>登录</Button>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }

    // 切换登录和注册表单
    switch(bool) {
        this.setState({
            isLogin: bool
        })
    }

    //提交处理函数
    handleSubmit(type, e) {
        if (type === 'signUp') {
            this.signUp(this.state)
        } else {
            this.signIn(this.state)
        }

    }

    // 输入信息处理逻辑
    changeInfo(key, e) {
        let tempState = JSON.parse(JSON.stringify(this.state))
        tempState.formData[key] = e.target.value
        this.setState(tempState)
    }

    //  使用leanClound 注册
    signUp(state) {
        signUp(state.formData.username, state.formData.password, state.formData.email, this.props.onSignUpOrSignIn, this.reject.bind(this))
    }

    //  使用leanClound 登录
    signIn(state) {
        signIn(state.formData.username, state.formData.password, this.props.onSignUpOrSignIn, this.reject.bind(this))
    }

    alert() {
        message.error(this.state.tips)
    }

    //错误提示信息
    reject(error) {
        switch (error.code) {
            case 200:
                this.setState({
                    tips: '没有提供用户名，或者用户名为空'
                }, this.alert)
                break
            case 201:
                this.setState({
                    tips: '没有提供密码，或者密码为空'
                }, this.alert)
                break
            case 202:
                this.setState({
                    tips: '用户名已被占用'
                }, this.alert)
                break
            case 203:
                this.setState({
                    tips: '电子邮箱地址已经被占用'
                }, this.alert)
                break
            case 204:
                this.setState({
                    tips: '没有提供电子邮箱地址'
                }, this.alert)
                break
            case 205:
                this.setState({
                    tips: '找不到电子邮箱地址对应的用户'
                }, this.alert)
                break
            case 210:
                this.setState({
                    tips: '用户名与密码不匹配'
                }, this.alert)
                break
            case 211:
                this.setState({
                    tips: '找不到用户'
                }, this.alert)
                break
            case 216:
                this.setState({
                    tips: '未验证的邮箱地址'
                }, this.alert)
                break
            case 217:
                this.setState({
                    tips: '无效的用户名，不允许空白用户名'
                }, this.alert)
                break
            case 218:
                this.setState({
                    tips: '无效的密码，不允许空白密码'
                }, this.alert)
                break
            case 219:
                this.setState({
                    tips: '登录失败次数超过限制，请稍候再试'
                }, this.alert)
                break
            default:
                this.setState({
                    tips: '发生错误，请重试'
                }, this.alert)
                break
        }
    }
}

const UserDialog2 = Form.create()(UserDialog);

export default UserDialog2