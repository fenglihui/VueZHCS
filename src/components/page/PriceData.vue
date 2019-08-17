<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="flh-background-style">
            <el-row>
              <el-col :span="12" style="padding-top: 20px">
                <Titlename>
                  检测样品平均价格查询
                </Titlename>
              </el-col>
              <el-col :span="4" style="padding-top: 12px;text-align: center">
                <el-date-picker
                  v-model="selectDate"
                  type="month"
                  placeholder="选择月份"
                  size="mini"
                  class="flh-data-style"
                  format="yyyy年MM月"
                  value-format="yyyy-MM">
                </el-date-picker>
              </el-col>
              <el-col :span="4 " style="padding-top: 12px;text-align: center">
                <el-select style="width: 180px;" v-model="selectData" clearable placeholder="选择市场" size="mini">
                  <el-option
                    v-for="selectData in selectDatas"
                    :key="selectData.value"
                    :value="selectData.value"
                    :label="selectData.label">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2" style="padding-top: 12px;text-align: center">
                <el-button type="success" size="mini" @click="search">查询</el-button>
              </el-col>
              <el-col :span="2" style="padding-top: 12px;text-align: center">
                <el-button size="mini" @click="exportExcel">导出Excel</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <Disqualifitable
                  :thTitle="todayThTitle"
                  :tdData="tdData"
                  :loading="loading"
                  :heightSize="660"
                >

                </Disqualifitable>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import Titlename from "@/components/page/HomePgson/Titlename";
    import Disqualifitable from "@/components/page/HomePgson/Disqualifitable";
    export default {
      name: "PriceData",
      components: {Disqualifitable, Titlename},
      data(){
        return{
          selectDate:'',
          selectDatas:[],
          selectData:'',
          todayThTitle:[
            {label:'编号',data:'id'},
            {label:'样品种类',data:'kind'},
            {label:'样品名称',data:'sampname'},
            {label:'平均价格',data:'avgPrice'},
            {label:'统计时间',data:'testtm'}
          ],
          loading:false,
          tdData:[]
        }
      },
      created() {
        this.$axios.get('http://localhost:8080/static/market.json')
          .then((res)=>{
            this.selectDatas=res.data.qyArea
          })
          .catch((error)=>{
            console.log(error);
          })
      }
    }
</script>

<style scoped>
  .flh-background-style{
    min-height: 800px;
    background-color: #FFFFFF;
    padding: 0 20px ;
  }
  .flh-data-style{
    width: 160px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
</style>
