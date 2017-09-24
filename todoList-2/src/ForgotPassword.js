import React from 'react';

export default class ForgotPassword extends React.Component {
    render () {
        return (
            <div className="forgotPassword">
                <h3>重置密码</h3>
                <form className="forgotPassword" onSubmit={this.props.onSubmit.bind(this)}>
                    <div className="rowOuter">
                        <div className="row">
                            <span className="iconfont">&#xe604;</span>
                            <label></label>
                            <input placeholder="邮箱" type="text" value={this.props.formData.email} onChange={this.props.onChange.bind(this,'email')}/>
                        </div>
                    </div>
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.props.onReturn}>返回登录</a>
                    </div>
                </form>
            </div>
        );
    }
}