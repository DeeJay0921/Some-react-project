import React from 'react';
import './UserDialog.css'
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud'
import ForgotPassword from './ForgotPassword'
import SignUpOrSignIn from './SignUpOrSignIn'

export default class UserDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'signUp',
            selectedTab: 'signUpOrSignIn', //忘记密码
            formData: {
                username: '',
                password: '',
                email: ''
            }
        }
    }
    //切换登录和注册两个按钮的selected属性

    signUp(e){
        e.preventDefault()
        let {username, password, email} = this.state.formData
        let successFn = (user)=>{
            this.props.onSignUp(user);
        }
        let errorFn = (error)=>{
            switch (error.code){
                case 202:
                    alert('用户名已被占用');
                    break;
                case 124:
                    alert('请求超时');
                    break;
                case 126:
                    alert('无效的用户 Id，可能用户不存在');
                    break;
                case 139:
                    alert('角色名称非法，角色名称只能以英文字母、数字或下划线组成');
                    break;
                case 200:
                    alert('没有提供用户名，或者用户名为空');
                    break;
                case 201:
                    alert('没有提供密码，或者密码为空');
                    break;
                case 217:
                    alert('无效的用户名，不允许空白用户名');
                    break;
                case 218:
                    alert('无效的密码，不允许空白密码');
                    break;
                default:
                    alert(error);
                    break;
            }
        }
        signUp(username, password, email, successFn, errorFn)
    }
    signIn(e){
        e.preventDefault()
        let {username, password} = this.state.formData
        let successFn = (user)=>{
            this.props.onSignIn(user);
        }
        let errorFn = (error)=>{
            switch (error.code) {
                case 210:
                    alert('用户名和密码不匹配');
                    break;
                case 139:
                    alert('角色名称非法，角色名称只能以英文字母、数字或下划线组成');
                    break;
                case 200:
                    alert('没有提供用户名，或者用户名为空');
                    break;
                case 201:
                    alert('没有提供密码，或者密码为空');
                    break;
                case 210:
                    alert('用户名和密码不匹配');
                    break;
                case 211:
                    alert('找不到用户');
                    break;
                case 219:
                    alert('登录失败次数超过限制，请稍候15分钟再试');
                    break;
                default:
                    alert(error);
                    break;
            }
        }
        signIn(username, password, successFn, errorFn)
    }
    changeFormDate(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state)); //深拷贝this.state,改变值之后在进行setState,直接赋值this.state会warning
        stateCopy.formData[key] = e.target.value;
        this.setState(stateCopy);
    }
    showForgetPassword() {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = 'forgotPassword';
        this.setState(stateCopy);
    }
    resetPassword(e) {
        e.preventDefault();
        sendPasswordResetEmail(this.state.formData.email);
    }
    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = 'signUpOrSignIn';
        this.setState(stateCopy);
    }
    //render
    render () {
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signUpOrSignIn' ?
                        <SignUpOrSignIn
                            formData={this.state.formData}
                            onSignUp={this.signUp.bind(this)}
                            onSignIn={this.signIn.bind(this)}
                            onChange={this.changeFormDate.bind(this)}
                            onForgotPassword={this.showForgetPassword.bind(this)}>
                        </SignUpOrSignIn> :
                        <ForgotPassword
                            formData={this.state.formData}
                            onSubmit={this.resetPassword.bind(this)}
                            onChange={this.changeFormDate.bind(this)}
                            onReturn={this.returnToSignIn.bind(this)}>
                        </ForgotPassword>}
                </div>
            </div>
        )
    }
}