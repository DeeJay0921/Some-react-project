import React from 'react';

function submit (props,e) {
    if (e.key === 'Enter') {
        if (e.target.value.trim() !== '') {
            props.onSubmit(e)
        }
    }
}
function changeTitle(props,e) {
    props.onChange(e);
}
export default function (props) {
    return (
        <div>
            <input className="TodoInput" type="text" value={props.content}
                   onKeyPress={submit.bind(null,props)} placeholder="输入待办事项，按下Enter添加"
                   onChange={changeTitle.bind(null,props)}/>
        </div>
    )
}