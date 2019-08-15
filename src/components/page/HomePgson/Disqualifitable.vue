<template>
    <el-table
      v-loading="this.loading"
      :data="tableData"
      border
      max-height="320"
      :cell-style="isActive"
      class="flh"
      style="width: 100%">

      <template v-for="(table,index) in thTables">
        <el-table-column
          :prop="table.data"
          :label="table.label"
          min-width="9.9%"
          >

        </el-table-column>
      </template>

    </el-table>
</template>

<script>
    export default {
      name: "Disqualifitable",
      props:['thTitle','tdData','loading'],
      data(){
        return{
          thTables:[],
          tableData:[]
        }
      },
      watch:{
        thTitle:function (newvalue,oldvalue) {
          if (newvalue!==oldvalue){
            this.thTables=newvalue
          }
        },
        tdData:function (newvalue,oldvalue) {
          if (newvalue!==oldvalue){
            this.tableData=newvalue
          }
        }
      },
      methods:{
        isActive:function ({row,column,rowIndex,columnIndex}) {
          if (row.result=='不合格'&&columnIndex==7){
            return 'color:#e1312c'
          }
          if (row.precess=='待处理'&&columnIndex==9){
            return  'color:#ff9c14'
          }
          if (row.result=='合格'&&columnIndex==7){
            return 'color:#2fbb50'
          }
          if (row.precess=='已处理'&&columnIndex==9){
            return 'color:#2fbb50'
          }
        }
      },
      created() {
        this.thTables=this.thTitle;
        this.tableData=this.tdData;
      },
      mounted() {
      },
      
    }
</script>

<style scoped>
  .table-style{
    width: 100%;
    height: 100%;
  }
</style>
