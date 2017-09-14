import _ from 'lodash';
import $ from 'jquery';
import foo from './foo';
function componet() {
    var element = $('<div></div>');

    element.html(_.join(['hi  ',' webpack'],''));
    // _.join()中的_是lodash暴露的全局变量

    return element.get(0);
}
document.body.appendChild(componet());
console.log(foo);
console.log(foo());