import _ from 'lodash';
function componet() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['hello,webpack'],'');
    // _.join()中的_是lodash暴露的全局变量
    return element;
}
document.body.appendChild(componet());