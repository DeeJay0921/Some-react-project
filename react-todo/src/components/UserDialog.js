import React, {Component} from 'react'
import {Form, message} from 'antd';
import './style/UserDialog.css'
import {Shake} from 'reshake'
import {signUp, signIn,resetPassword} from '../leanCloud'
import Register from './register'
import Login from './login'
import ForgotPassword from './forgetPassword'


class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true,
            hasForgot: false,
            formData: {
                username: '',
                password: '',
                email: '',
                resetEmail: ''
            },
            tips: ''
        }
    }

    render() {
        let renderPart
        if (this.state.isLogin && this.state.hasForgot) {
            renderPart = <ForgotPassword changeInfo={this.changeInfo.bind(this)}
                                         resetEmail={this.resetEmail.bind(this)}
                                         returnToLogin={this.returnToLogin.bind(this)}/>
        }else if (this.state.isLogin === true ) {
            renderPart = <Login
                changeInfo={this.changeInfo.bind(this)}
                switch={this.switch.bind(this)}
                toForgetPassword={this.toForgetPassword.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}/>
        }else {
            renderPart = <Register changeInfo={this.changeInfo.bind(this)}
                                   switch={this.switch.bind(this)}
                                   handleSubmit={this.handleSubmit.bind(this)}/>
        }
        return (
            <div className="UserDialog-Wrapper">
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
            this.signIn(this.state,this.props.getAllTodoList)
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

    // 重置密码
    resetEmail() {
        console.log(this.state.formData.resetEmail)
        let resolve = () => {
            message.success('发送重置邮件成功！')
        }
        resetPassword(this.state.formData.resetEmail,resolve,this.reject.bind(this))
    }

    //    重置密码之后返回登录
    returnToLogin() {
        this.setState({hasForgot: false})
    }

    //    跳转到忘记密码
    toForgetPassword() {
        this.setState({hasForgot: true})
    }
}

const UserDialog2 = Form.create()(UserDialog);

export default UserDialog2