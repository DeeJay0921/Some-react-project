import React from 'react';

export default function (props) {
        return (
            <form className="signIn" onSubmit={props.onSubmit.bind(this)}>
                <div className="rowOuter">
                    <div className="row">
                        <span className="iconfont">&#xe609;</span>
                        <label></label>
                        <input placeholder="用户名" type="text" value={props.formData.username} onChange={props.onChange.bind(null,'username')}/>
                    </div>
                </div>
                <div className="rowOuter">
                    <div className="row">
                        <span className="iconfont">&#xe637;</span>
                        <label></label>
                        <input placeholder="密码" type="password" value={props.formData.password} onChange={props.onChange.bind(null,'password')}/>
                    </div>
                </div>
                    <div className="row actions">
                        <button className="submit" onClick={props.onReload.bind(null)}>登录</button>
                        <a href='#' onClick={props.onForgotPassword}>忘记密码</a>
                    </div>
            </form>
        )
}