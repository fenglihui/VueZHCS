<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo nav-style"
           :collapse="isCollapse"
           background-color="#32323a"
           text-color="#abb1b7"
           active-text-color="#ffd04b"
           width="60px"
           :unique-opened="isOpen"
           :router=true>
    <el-menu-item index="" @click="openclose">
      <i :class="[icon ? open : close , active ]"></i>
      <span slot="title" >{{oc}}</span>
    </el-menu-item>
    <el-menu-item index="/homepage">
      <i class="el-icon-s-home flh-icon-style"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="">
      <template slot="title">
        <i class="el-icon-s-marketing flh-icon-style"></i>
        <span slot="title">数据汇总</span>
      </template>
        <el-menu-item index="/searchpage1" style="text-align: center">分类统计</el-menu-item>
        <el-menu-item index="/searchpage2" style="text-align: center">历史查询</el-menu-item>
    </el-submenu>
    <el-menu-item index="/searchpage3">
      <i class="el-icon-s-data flh-icon-style"></i>
      <span slot="title">菜价统计</span>
    </el-menu-item>
    <el-menu-item index="/mappage">
      <i class="el-icon-location flh-icon-style"></i>
      <span slot="title">地图定位</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
    export default {
        name: "Aside",
      data(){
          return{
            isCollapse:true,
            isOpen:true,
            oc:'展开',
            icon:true,
            open:'el-icon-s-unfold',
            close:'el-icon-s-fold',
            active:'flh-icon-style'
          };
      },
      methods: {
        openclose(){
          if(this.isCollapse){
            this.isCollapse=false
            this.oc='折叠'
            this.icon=false
          }
          else{
            this.isCollapse=true
            this.oc='展开'
            this.icon=true
          }

        }
      }

    }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 220px;
  }
  .nav-style{
    border: 0 ;
  }
  .flh-icon-style{
    font-size: 20px;
  }
  .el-menu-item{
    height: 50px;
    line-height: 50px;
  }
  .el-menu--collapse{
    width: 64px;
  }
</style>
