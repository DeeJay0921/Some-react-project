import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:　{
        newTodo: '123',
        todoList: []
    },
    mutations: {
        //修改值
        change (s,val) {
            console.log('vuex:' + val)
            s.newTodo = val
        },
        //添加一项新todo
        addTo(s,val) {
            s.todoList.push({
                title: val,
                time: new Date().toLocaleString(),
                done: false
            })
            s.newTodo = ''
            console.log('vuex-Array:' + s.todoList)
        },
        // 该todo是否已经完成
        isDone(state,index) {
            state.todoList[index]['done'] = !state.todoList[index]['done']
        },
        //  删除代办
        remove(state, index) {
            state.todoList.splice(index,1)
        },
        // 初始读取localstorage赋值
        initValue(state,arr) {
            state.todoList = arr
        }
    }
})