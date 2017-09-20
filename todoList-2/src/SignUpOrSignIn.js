import React from 'react';
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default class SignUpOrSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'signUp'
        }
    }
    switch(e) {
        this.setState({
            selected: e.target.value,
            selectedTab: 'signUpOrSignIn'
        })
    }
    render () {
        return (
            <div className="onSignUpOrSignIn">
                <nav>
                    <label><input type="radio" value='signUp' checked={this.state.selected === 'signUp'} onChange={this.switch.bind(this)}/>注册</label>
                    <label><input type="radio" value="signIn" checked={this.state.selected === 'signIn'} onChange={this.switch.bind(this)}/>登录</label>
                </nav>

                <div className="panes">
                    {/*如果目前上面nav中选中的是signUp，那么只return signUpForm,如果是signIn,只return signInForm*/}
                    {this.state.selected === 'signUp' ? <SignUpForm formData={this.props.formData}
                                                                    onSubmit={this.props.onSignUp}
                                                                    onChange={this.props.onChange}>
                    </SignUpForm> : null}
                    {this.state.selected === 'signIn' ? <SignInForm formData={this.props.formData}
                                                                    onSubmit={this.props.onSignIn}
                                                                    onChange={this.props.onChange}
                                                                    onForgotPassword={this.props.onForgotPassword}>
                    </SignInForm> : null}
                </div>
            </div>
        );
    }
}