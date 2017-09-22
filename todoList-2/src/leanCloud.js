import AV from 'leancloud-storage';

const APP_ID = 'AjE16hxJ7FoWt50DIOzIBczg-gzGzoHsz';
const APP_KEY = 'l8VXWgxndViUnePds1RKBuOi';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})


export default AV

export const TodoModel = {
    getByUser(user, successFn, errorFn){
        let query = new AV.Query('Todo')
        query.find().then((response) => {
            let array = response.map((t) => {
                return {id: t.id, ...t.attributes}
            })
            successFn.call(null,array)
        }, (error) => {
            errorFn.call(null, error)
        })
    },
    create({title,status,deleted},successFn,errorFn){
        // 声明类型
        var Todo = AV.Object.extend('Todo');
        // 新建对象
        var todo = new Todo();
        // 设置名称
        todo.set('title',title);
        todo.set('status',status);
        todo.set('deleted',deleted);

        // 这样做就可以让这个 Todo 只被当前用户看到
        let acl = new AV.ACL()
        acl.setPublicReadAccess(false) // 注意这里是 false 公共不可读
        acl.setWriteAccess(AV.User.current(), true) //当前用户可读可写
        acl.setReadAccess(AV.User.current(), true)

        todo.setACL(acl);

        todo.save().then(function (todo) {
            successFn.call(null,todo.id);
        }, function (error) {
            errorFn.call(null,error);
        });
    },

    update({id,title,status,deleted},successFn,errorFn){
        let todo = AV.Object.createWithoutData('Todo', id);
        //判断用户是否设置了空的属性
        title !== undefined && todo.set('title',title);
        status !== undefined && todo.set('status',status);
        deleted !== undefined && todo.set('deleted',deleted);
        todo.save().then(function (response) {
            successFn.call(null)
        }),(error)=> {
            errorFn.call(null);
        };
    },

    destroy(todoId,successFn,errorFn){
        let todo = AV.Object.createWithoutData('Todo', todoId)
        todo.destroy().then(function (response) {
            successFn.call(null)
        }, function (error) {
            errorFn.call(null,)
        });
    }
}
export function signUp(username, password, email, successFn, errorFn){
    // 新建 AVUser 对象实例
    var user = new AV.User()
    // 设置用户名
    user.setUsername(username)
    // 设置密码
    user.setPassword(password)
    // 设置邮箱
    user.setEmail(email);
    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })

    return undefined;

}
export function signIn(username,password,successFn,errorFn) {
    AV.User.logIn(username, password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser);
        successFn.call(null,user);
    }, function (error) {
        errorFn.call(null,error);
    });
}
export function getCurrentUser() {
    let user = AV.User.current();
    if (user) {
        return getUserFromAVUser(user);
    }
    else{
        return null;
    }
}
export function signOut() {
    AV.User.logOut();
}
export function sendPasswordResetEmail(email,successFn,errorFn) {
    AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call();
    }, function (error) {
        console.dir(error);
        errorFn.call();
    });
}
function getUserFromAVUser(AVUser){
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}