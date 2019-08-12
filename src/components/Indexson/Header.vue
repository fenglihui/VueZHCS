<template>
    <div id="Header-container" class="head-style">
      <img src="../../assets/loginlogo.png" class="logo">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="icon-style"></el-avatar>
      <p class="username">游客</p>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  .head-style{
    width: 100%;
    height: 50px;
    background-color: #FFFFFF;
  }
  .logo{
    display: block;
    float: left;
    margin-top: 10px;
    margin-left: 90px;
    width: 140px;
    height: 30px;
  }
  .icon-style{
    margin-left: 58%;
    margin-top: 5px;
    float: left;
    cursor: pointer;
  }
  .username{
    font-size: 16px;
    font-family: "Microsoft YaHei";
    float: left;
    margin: 13px 16px;
  }
</style>
