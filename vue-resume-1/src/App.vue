<template>
  <div id="app">
    <Topbar class="topbar"></Topbar>
    <main>
      <Editor class="editor"></Editor>
      <Preview class="preview"></Preview>
    </main>
  </div>
</template>

<script>
  import Topbar from './components/Topbar.vue'
  import Editor from './components/Editor.vue'
  import Preview from './components/Preview.vue'

  export default {
    components: {
      Topbar,Editor,Preview
    }
  }
</script>

<style>
  /*<!--让app高度为一个屏幕，必须要让其父元素高度都为100%，否则可以使用100vh-->*/
  html,body,#app {
    height: 100%;
    overflow: hidden;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
}
  .topbar {
    border: 1px solid #c2e6fc;
  }
  main {
    border: 1px solid #fc64af;
    display: flex;

    flex: 1;
  }
  main .editor {
    width: 20em;
  }
  main .preview {
    flex: 1;
  }
</style>
