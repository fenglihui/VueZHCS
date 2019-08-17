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
    <el-submenu index="数据汇总">
      <template slot="title">
        <i class="el-icon-s-marketing flh-icon-style"></i>
        <span slot="title">数据汇总</span>
      </template>
        <el-menu-item index="/searchpage1" style="text-align: center" v-if="isDisplay">分类统计</el-menu-item>
        <el-menu-item index="/searchpage2" style="text-align: center" >历史查询</el-menu-item>
    </el-submenu>
    <el-submenu index="数据处理" v-if="isAdmin">
      <template slot="title">
        <i class="el-icon-s-grid flh-icon-style"></i>
        <span slot="title">数据处理</span>
      </template>
      <el-menu-item index="/searchpage3" style="text-align: center">不合格数据查询</el-menu-item>
      <el-menu-item index="/operTable" style="text-align: center">不合格数据处理</el-menu-item>
    </el-submenu>
    <el-submenu index="员工功能" v-if="isPersion">
      <template slot="title">
        <i class="el-icon-s-custom flh-icon-style"></i>
        <span slot="title">员工功能</span>
      </template>
      <el-menu-item index="/todayData" style="text-align: center">当日数据统计</el-menu-item>
      <el-menu-item index="/inputData" style="text-align: center">快检数据录入</el-menu-item>
      <el-menu-item index="" style="text-align: center">快检数据上传</el-menu-item>
    </el-submenu>
    <el-menu-item index="/PriceData">
      <i class="el-icon-s-data flh-icon-style"></i>
      <span slot="title">菜价统计</span>
    </el-menu-item>
    <el-menu-item index="/mappage">
      <i class="el-icon-location flh-icon-style"></i>
      <span slot="title">市场定位</span>
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
            active:'flh-icon-style',
            isAdmin:false,
            isPersion:false,
            isDisplay:true
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
      },
      created() {
          if (this.$store.state.authority==1){
            this.isAdmin=true
            this.isPersion=true

          }
          else if (this.$store.state.authority==2) {
            this.isPersion=true
          }
          else if (this.$store.state.authority==3){
            this.isAdmin=true
          }
          else{
            this.isDisplay=false
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
