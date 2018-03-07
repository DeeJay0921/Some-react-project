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
export function resetPassword (email,resolve,reject) {
    AV.User.requestPasswordReset(email).then( ()=> {
        resolve()
    }, (error) => {
        reject(error)
    })
}