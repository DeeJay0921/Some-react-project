import _ from 'lodash';
import $ from 'jquery';
function componet() {
    var element = $('<div></div>');

    element.html(_.join(['hello','webpack'],''));
    // _.join()中的_是lodash暴露的全局变量

    return element.get(0);
}
document.body.appendChild(componet());