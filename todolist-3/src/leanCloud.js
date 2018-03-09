import AV from 'leancloud-storage'

const appId = 'mXewA6lqOAUDeu74VkiaT6X9-gzGzoHsz';
const appKey = 'oUS2seIRCh0NMScGrXL043ac';
AV.init({appId, appKey});

export default AV

//注册新用户
export function signUp(username, password, email, resolve, reject) {
    var user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.setEmail(email)
    let userInfo = {}


    user.signUp().then(function (loginedUser) {
        userInfo = {
            id: loginedUser.id, ...loginedUser.attributes
        }
        resolve(userInfo)
    }, (error) => {
        reject(error)
    })
    return
}

// 用户登录
export function signIn(username, password, resolve, reject) {
    AV.User.logIn(username, password).then((user) => {
        let userInfo = {
            id: user.id, ...user.attributes
        }
        resolve(userInfo)
    }, (error) => {
        reject(error)
    })
}

// 进入页面时获取当前用户
export function getCurrentUser() {
    let user = AV.User.current()
    if (user) {
        return {
            id: user.id, ...user.attributes
        }
    } else {
        return null
    }
}

// 登出
export function signOut() {
    AV.User.logOut()
    return
}

//重置密码
export function resetPassword(email, resolve, reject) {
    AV.User.requestPasswordReset(email).then(() => {
        resolve()
    }, (error) => {
        reject(error)
    })
}

// 数据存储的一些操作
export const TodoModel = {
    getByUser(user, resolve, reject) { // 查询所有todo
        let query = new AV.Query('Todo')
        query.find().then((todos) => {
            let arr = todos.map( (item) => {
                return {id: item.id, ...item.attributes}
            } )
            resolve(arr)
        })
    },
    create({status, title, deleted}, resolve, reject) { // 存储todo
        let Todo = AV.Object.extend('Todo')
        let todo = new Todo()
        todo.set('title', title)
        todo.set('status', status)
        todo.set('deleted', deleted)

        //设置权限
        var acl = new AV.ACL();
        acl.setPublicReadAccess(false); //不是所有人都可读  只能当前用户读取
        acl.setWriteAccess(AV.User.current(),true); // 当前用户可写
        acl.setReadAccess(AV.User.current(), true)// 当前用户可读

        todo.setACL(acl); // 给当前class应用这个权限
        todo.save().then((response) => {
            console.log(response)
            resolve(response.id)
        },(error) =>{
            reject(error)
        })
    },
    update({id, title, status, deleted}, resolve, reject) { // 更新编辑todo
        let todo = AV.Object.createWithoutData('Todo', id)
        todo.set('title',title)
        todo.set('status',status)
        todo.set('deleted',deleted)
        todo.save().then( (response) => {
            console.log(response)
            resolve(response)
        },(error) => {
            reject(error)
        })
    },
    destory(todoId, resolve, reject) { // 删除todo
        let todo = AV.Object.createWithoutData('Todo', todoId)
        todo.destroy().then(function (response) {
            resolve(response)
        }, function (error) {
            reject(error)
        });
    }
}