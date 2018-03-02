<template>
    <div id="app" v-cloak>
        <div class="wrapper">
            <div class="newTask">
                <div class="input">
                    <input type="text"
                           placeholder="输出代办事项，按下enter添加"
                           :value='this.$store.state.newTodo'
                           @input='commitModifyValue("change",$event)'
                           @keypress.enter="commitModifyValue('addTo',$event)">
                </div>
            </div>
            <ul class="todos">
                <li v-for='(todo,index) in list' :key="index">
                    <div>
                        <input type="checkbox"
                               :checked="todo.done"
                               @change="commitDoneOrDelete('isDone',index)">{{ todo.title }}
                    </div>
                    <!--<span v-if="todo.done">已完成</span>-->
                    <!--<span v-else>未完成</span>-->
                    <div @click="commitDoneOrDelete('remove',index)">
                        <img src="./img/del.png" height="32" width="32"/>
                    </div>
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
                if(e.target.value == '') {
                    alert('输入不能为空哦！~')
                    return
                }
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
    }
</script>
<style lang="less"}>
    @import "~normalize.css";
    [v-cloak] { display: none }
    html {
        height: 100%;
    }
    body {
        width: 100%;
        height: 100%;
        background: no-repeat;
        background-image: url("img/bg1.jpg");
        background-size: cover;
    }
    @media (max-width: 425px) {
        #app {
            /*margin-top: 30%;*/
            height: 100%;
        }
        .wrapper {
            width: 80%;
            height: 100%;
        }
        .newTask {
            .input {
                padding-top:  30%;
                width: 75%;
                input {
                    width: 85%;
                }
            }
        }
        .todos {
            padding: 0;
            height: 500px;
            overflow: auto;
        }
    }
    @media (min-width: 426px) {
        #app {
            height: 100%;
        }
        .wrapper {
            width: 60%;
            height: 100%;
        }
        .newTask {
            .input {
                padding-top: 5%;
                width: 30%;
                input {
                    width: 85%;
                }
            }
        }
        .todos {
            padding: 0;
            height: 82%;
            overflow: auto;
        }
    }
    .wrapper {
        margin-left: auto;
        margin-right: auto;
        .newTask {
            .input {
                margin-left: auto;
                margin-right: auto;
                overflow: hidden;
                input {
                    border-radius: 5px;
                    outline: none;
                    border: none;
                    height: 40px;
                    padding-left: 18px;
                    padding-right: 18px;
                }
            }
        }
        &>.todos {
            list-style: none;
            li {
                background: rgba(205,176,121,0.3);
                color: #fff;
                border-radius: 3px;
                padding: 5px 10px;
                margin: 0px 20px 5px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
</style>