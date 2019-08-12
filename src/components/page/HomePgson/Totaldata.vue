<template>
  <div class="flh-all">
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="flh-title flh-title-position">
          <span class="flh-font-style"><slot name="title"></slot></span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="flh-title">
          <slot name="date"></slot>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <template v-for="content in contents">
        <el-col :span="8">
          <div class="flh-content">
            <div class="flh-content-data">{{content.data}}</div>
            <div class="flh-content-title">{{content.title}}</div>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>

</template>

<script>
    export default {
      name: "Totaldata",
      props:['marketcount','detection','result'],
      data() {
        return {
          contents: [
            {data: '', title: '检测市场总数'},
            {data: '', title: '快检批次'},
            {data: '', title: '合格率'}
          ]
        }
      },
      watch:{
        marketcount:function (newvalue,oldvalue) {
            this.contents[0].data=newvalue
        },
        detection:function (newvalue,oldvalue) {
          this.contents[1].data=newvalue
        },
        result:function (newvalue,oldvalue) {
          this.contents[2].data=newvalue
          this.contents[2].data=this.contents[2].data+'%'
        }
      },
    }
</script>

<style scoped>
  .flh-all{
    width: 100%;
    height: 100%;
  }
  .flh-title{
    min-height:30px ;
  }
  .flh-content{
    min-height: 130px;
    background-color: #f1f1f1;
  }
  .flh-title-position{
    line-height: 30px;
    text-align: left;
  }
  .flh-font-style{
    font-size: 14px;
    color: #333333;
    font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
  }
  .flh-content-data{
    width: 100%;
    min-height: 50px;
    line-height: 50px;
    padding-top: 20px;
    text-align: center;
    font-size: 32px;
    color: #C6D0D4;;
  }
  .flh-content-data:hover{
    color:#03D8FF;
  }
  .flh-content-title{
    width: 100%;
    min-height: 40px;
    margin-top: 20px;
    font-size: 12px;
    text-align: center;
  }
  .flh-data-style{
    width: 150px;
    float: right;
  }
  .el-row {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-row:first-child{
    margin-top: 0;
    padding-top: 10px;
  }
</style>
