import React from 'react';

export default function (props) {
    return (
        <form className="signUp" onSubmit={props.onSubmit.bind(this)}>
            <div className="rowOuter">

                <div className="row">
                    <label></label>
                    <span className="iconfont">&#xe609;</span>
                    <input placeholder="用户名" type="text" value={props.formData.username} onChange={props.onChange.bind(this,'username')}/>
                </div>
            </div>
            <div className="rowOuter">
                <div className="row">
                    <span className="iconfont">&#xe637;</span>
                    <label></label>
                    <input placeholder="密码" type="password" value={props.formData.password} onChange={props.onChange.bind(this,'password')}/>
                </div>
            </div>
            <div className="rowOuter">
                <div className="row">
                    <span className="iconfont">&#xe604;</span>
                    <label></label>
                    <input placeholder="邮箱" type="email" value={props.formData.email} onChange={props.onChange.bind(this,'email')}/>
                </div>
            </div>
            <div className="row actions">
                <button className="submit">注册</button>
            </div>
        </form>
    );
}