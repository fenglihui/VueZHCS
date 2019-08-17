<template>
    <el-table
      v-loading="this.loading"
      :data="tableData"
      border
      :max-height="size"
      :cell-style="this.isActive"
      class="flh table"
      style="width: 100%">

      <template v-for="(table,index) in thTables">
        <el-table-column
          :prop="table.data"
          :label="table.label"
          min-width="9.9%"

          >
        </el-table-column>
      </template>
      <el-table-column
        :label="this.labelName"
        min-width="9.9%"
        style="text-align: center"
        v-if="this.labelName==='操作'" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, tableData)">点击处理</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="this.labelName"
        min-width="9.9%"
        style="text-align: center"
        v-if="this.labelName==='执行操作'" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="amendF(scope.$index, tableData)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteF(scope.$index, tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
    export default {
      name: "Disqualifitable",
      props:['thTitle','tdData','loading','isActive','heightSize','labelName'],
      data(){
        return{
          thTables:[],
          tableData:[],
          size:this.heightSize
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
        },
        height:function (newvalue,oldvalue) {
          if (newvalue!==oldvalue){
            this.size=newvalue
          }
        }
      },
      methods:{
        handleEdit(index, row) {
          this.$axios.get("update/testtb$ajax.htm",{
            params:{
              id:this.tableData[index].tdId,
              precess:'已下架'
            }
          })
            .then((res)=>{
              if (res.data.msg=='成功'){
                row.splice(index,1)
                this.$message({
                  message: '处理成功',
                  center: true
                });
              }
              else {
                this.$message({
                  message:'处理失败，请联系系统管理员',
                  center:true
                });
              }
            })
        },
        amendF(index,row){
          this.$emit('selectTd',row[index])
        },
        deleteF(index,row){
          row.splice(index,1)
          var _this =this
          for (let i=0;i<_this.tableData.length;i++){
            _this.$set(_this.tableData[i],'id',i+1)
          }
          this.$emit('delTd',this.tableData)
          this.$message({
            message: '删除成功',
            type:'success',
            center: true
          });
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
  .el-button--mini{

  }
  .el-button + .el-button{
    margin-left: 0;
  }
</style>
