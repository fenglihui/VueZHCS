<template>


      <el-container >

        <el-aside width="auto">
          <Aside></Aside>
        </el-aside>
        <el-container>

          <el-header>
            <Header></Header>
          </el-header >

          <div id="main" :style="{height:size}">
            <el-scrollbar class="flh page-component__scroll">
              <el-main style="height: 930px" class="page-component">
                <router-view></router-view>
              </el-main>
            </el-scrollbar>
          </div>

        </el-container>

      </el-container>


</template>

<script>
  import Aside from "@/components/Indexson/Aside";
  import Header from "@/components/Indexson/Header";

    export default {
      name: "Index",
      data(){
        return{
          size:''
        }
      },
      components: {Header, Aside},
      created() {
        if (this.$store.state.nickname==''||this.$store.state.nickname==null) {
          this.$router.push({name:'Login'})
        }
      },
      mounted(){
        this.hh()
      },
      methods:{
        hh() {
          this.size = document.documentElement.clientHeight + 'px';
          window.onresize = () => {
            return (() => {
              this.size = document.documentElement.clientHeight + 'px';
            })();
          }
        }
      },
    }
</script>

<style scoped>
  .el-container{
    background-color: #f1f1f1;
  }
  .el-aside{
    height: 100%;
    position: fixed;
    z-index: 3;
    background-color: #32323a;
  }
  .el-header{
    padding: 0 0;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .el-main{
    padding-left: 80px;

  }
  #main{
    height: 100%;
  }
  .page-component__scroll {
    height: 100%;
    margin-top: 50px;
  }
  .page-component{
    height: 100%
  }
  .list {
    max-height: 200px;
  }
</style>
