<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="flh-background-style">
            <el-row>
              <el-col :span="14" style="padding-top: 20px">
                <Titlename>快检数据按日期统计</Titlename>
              </el-col>
              <el-col :span="6" style="padding-top:12px;text-align: right">
                <el-date-picker
                  v-model="selectDate"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  class="flh-data-style"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  @change="change">
                </el-date-picker>
              </el-col>
              <el-col :span="4" style="padding-top: 12px;text-align: center">
                <el-button size="mini" @click="exportExcel">导出Excel</el-button>
              </el-col>
            </el-row>
            <el-row>
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
    import FileSaver from "file-saver";
    import XLSX from "xlsx";
    export default {
      name: "TodayData",
      components: {Disqualifitable, Titlename},
      data(){
        return{
          selectDate:'',
          todayThTitle:[
            {label:'市场名称',data:'name'},
            {label:'快检批次',data:'count'},
            {label:'合格率',data:'pass_rate'},
            {label:'市场负责人',data:'manageName'},
            {label:'联系电话',data:'managePhone'},
            {label:'检测时间',data:'testtm'}
          ],
          tdData:[],
          loading:false

        }
      },
      methods:{
        change(){
          this.loading=true
          this.$axios.get('/obtain/market_data$ajax.htm', {
            params:{
              date:this.selectDate,
              pageSize:3000
            }
          })
            .then((res) => {
              this.tdData=[]
              this.loading=false
              var _this = this
              res.data.resultList.map(function (item,index) {
                _this.tdData.push({name:item.name,count:item.count,pass_rate:_this.numFilter(item.pass_rate*100)+'%',manageName:item.manageName,managePhone:item.managePhone,testtm:_this.selectDate})
              })
            })
            .catch((error) => {
              console.log(error);
            })
        },
        numFilter (value) {
          // 截取当前数据到小数点后两位
          let tempVal = parseFloat(value).toFixed(2)
          let realVal = tempVal.substring(0, tempVal.length - 1)
          return realVal
        },
        //导出表格方法
        exportExcel() {
          let name=this.selectDate
          /* generate workbook object from table */
          //  .table要导出的是哪一个表格
          var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
          /* get binary string as output */
          var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
          });
          try {
            //  name+'.xlsx'表示导出的excel表格名字
            FileSaver.saveAs(
              new Blob([wbout], { type: "application/octet-stream" }),
              name + '快检数据按市场分组查询' + ".xlsx"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
        }
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
