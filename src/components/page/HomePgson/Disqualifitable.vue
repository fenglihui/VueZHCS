<template>
  <div class="table-style">
    <el-scrollbar style="height: 320px;padding-right: 17px">
    <el-table
      :data="tableData"
      style="width: 100%"
      class="flh"
      border
      height="320"
      :class="{active:isactive}">

      <template v-for="(table,index) in thTables">
        <el-table-column
          :prop="table.data"
          :label="table.label"
          min-width="9.9%"
          >

        </el-table-column>
      </template>

    </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
    export default {
      name: "Disqualifitable",
      props:['thTitle','tdData'],
      data(){
        return{
          thTables:[],
          tableData:[],
          isactive:false
        }
      },
      watch:{
        thTitle:function (newvalue,oldvalue) {
          this.thTables=newvalue
        },
        tdData:function (newvalue,oldvalue) {
          this.tableData=newvalue
        }
      },
      created() {
        this.thTables=this.thTitle;
        this.tableData=this.tdData;
      }
    }
</script>

<style scoped>
  .table-style{
    width: 100%;
    height: 100%;
  }
  .el-table td{
    text-align: center;
  }
  .active{
    color: red;
  }
</style>
