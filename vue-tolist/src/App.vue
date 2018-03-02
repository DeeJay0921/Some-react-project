<template>
    <div id="app" v-cloak>
        <div class="wrapper">
            <div class="newTask">
                <input type="text"
                       :value='this.$store.state.newTodo'
                       @input='commitModifyValue("change",$event)'
                       @keypress.enter="commitModifyValue('addTo',$event)">
            </div>
            <ul class="todos">
                <li v-for='(todo,index) in list' :key="index">
                    <input type="checkbox"
                           :checked="todo.done"
                           @change="commitDoneOrDelete('isDone',index)">{{ todo.title }}
                    <span v-if="todo.done">已完成</span>
                    <span v-else>未完成</span>
                    <button @click="commitDoneOrDelete('remove',index)">X</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'App',
        created() {
            console.log(this.$store)
            let savedList = JSON.parse(window.localStorage.getItem('myTodo'))
            this.list = savedList || []
            window.onbeforeunload = () => {
                let myTodo = JSON.stringify(this.$store.state.todoList)
                window.localStorage.setItem('myTodo',myTodo)
            }
        },
        methods: {
            commitModifyValue(type,e) {
                this.$store.commit(type,e.target.value)
            },
            commitDoneOrDelete(type,index) {
                this.$store.commit(type,index)
            },
        },
        computed: {
            list: {
                get () {
                    return this.$store.state.todoList
                },
                set (val) {
                    this.$store.commit('initValue',val)
                }
            }
        },
        mounted() {

        }
    }
</script>
<style lang="less"}>
    @import "~normalize.css";
    [v-cloak] { display: none }
    body {
        background: #1e1e1e;
    }
    @media (max-width: 425px) {
        #app {
            padding-top: 30%;
        }
    }
    @media (min-width: 426px) {
        #app {
            padding-top: 5%;
        }
    }
    .wrapper {
        width: 80%;
        /*margin-top: 5%;*/
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #ccc;
        &>ul {
            list-style: none;
        }
    }
</style>