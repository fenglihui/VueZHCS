<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="flh-background-style">
            <el-row>
              <el-col :span="12" style="padding-top: 20px">
                <Titlename>
                  快检数据历史查询
                </Titlename>
              </el-col>
              <el-col :span="4" style="padding-top: 12px;text-align: center">
                <el-date-picker
                  v-model="selectDate"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  class="flh-data-style"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd">
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
                  :isActive="isActive"
                  :height-size="320"
                >

                </Disqualifitable>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="flh-background-style">
            <el-row>
              <el-col :span="24" style="padding-top:20px ">
                <Titlename>
                  {{message}}快检批次数图表查询
                </Titlename>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <NormalCharts :resultcounts="chartsData" :rowValue="chartsX">

                </NormalCharts>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flh-background-style">
            <el-row>
              <el-col :span="24" style="padding-top:20px ">
                <Titlename>
                  {{message}}快检合格率图表查询
                </Titlename>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <NormalChartsS :resultcounts="chartsResult" :rowValue="chartsX">

                </NormalChartsS>
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
    import NormalCharts from "@/components/page/HomePgson/NormalCharts";
    import NormalChartsS from "@/components/page/HomePgson/NormalChartsS"
    import FileSaver from "file-saver";
    import XLSX from "xlsx";
    export default {
      name: "Searchpage2",
      components: {NormalCharts, Disqualifitable, Titlename,NormalChartsS},
      data(){
        return{
          yearDate:'',
          selectDate:'',
          selectData:'',
          selectDatas:[],
          todayThTitle:[
            {label:'编号',data:'id'},
            {label:'经营户',data:'manage'},
            {label:'样品种类',data:'kind'},
            {label:'样品名称',data:'sampname'},
            {label:'产地',data:'location'},
            {label:'进货渠道',data:'channels'},
            {label:'检测项目',data:'testitem'},
            {label:'检测指标',data:'testidx'},
            {label:'检测结论',data:'result'},
            {label:'处理结果',data:'precess'},
            {label:'检测时间',data:'testtm'},
          ],
          tdData:[],
          loading:false,
          message:'',
          chartsX:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          chartsData:[],
          chartsResult:[]
        }
      },
      watch:{
        selectDate:function (newval,oldval) {
          this.yearDate=this.$moment(newval).format('YYYY')
        }
      },
      methods:{
        exportExcel() {
          let name=this.selectDate + this.selectData
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
              name + '快检数据查询' + ".xlsx"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
        },
        numFilter (value) {
          // 截取当前数据到小数点后两位
          let tempVal = parseFloat(value).toFixed(2)
          let realVal = tempVal.substring(0, tempVal.length - 1)
          return realVal
        },
        isActive:function ({row,column,rowIndex,columnIndex}) {
          if (row.result=='不合格'&&columnIndex==8){
            return 'color:#e1312c'
          }
          if (row.precess=='待处理'&&columnIndex==9){
            return  'color:#ff9c14'
          }
          if (row.result=='合格'&&columnIndex==8){
            return 'color:#2fbb50'
          }
          if (row.precess=='已处理'&&columnIndex==9){
            return 'color:#2fbb50'
          }
        },
        search(){
          this.message=this.yearDate+'年'+this.selectData
          this.loading=true
          this.tdData=[]
          this.$axios.get('/Dataservlet$ajax.htm',{
            params:{
              date:this.selectDate,
              market:this.selectData,
              pageSize:3000
            }
          })
            .then((res)=>{
              this.loading=false
              var _this=this
                res.data.resultList.map(function (item,index) {
                  if(item.testidx==-1){
                    item.testidx="阴性";
                  }
                  else if (item.testidx==-2){
                    item.testidx="阳性";
                  }
                  else if(item.testidx!=-1&&item.testidx!=-2){
                    if(item.testitem=='二氧化硫'||item.testitem=='吊白块'||item.testitem=='甲醛'||item.testitem=='亚硝酸盐'){
                      item.testidx=item.testidx+"mg/kg";
                    }
                    else if(item.testitem=='农药残留'){
                      item.testidx=item.testidx+"%";
                    }
                  }
                  if(item.result=="合格") {
                    if (item.precess == null) {
                      item.precess = "";
                    }
                  }
                  else {
                    if (item.precess=="已下架"||item.precess=="已处理"){

                    }
                    else{
                      item.precess = "待处理";
                    }
                  }
                  _this.tdData.push({id:index+1,manage:item.manage,kind:item.kind,sampname:item.sampname,location:item.location,channels:item.channels,
                    testitem:item.testitem,testidx:item.testidx,result:item.result,precess:item.precess,testtm:_this.$moment(item.testtm).format('YYYY-MM-DD')})
                })
            })
            .catch((error)=>{
              console.log(error);
            })
          this.$axios.get('/obtain/testtb_by_year$ajax.htm',{
            params:{
              year:this.yearDate,
              addr:this.selectData,
            }
          })
            .then((res)=>{
              this.chartsData=[]
              var _this=this
              res.data.resultList.map(function (item,index) {
                _this.chartsData.push(item.count)
              })
            })
            .catch((error)=>{
              console.log(error)
            })
          this.$axios.get('/obtain/testtb_by_year$ajax.htm',{
            params:{
              year:this.yearDate,
              addr:this.selectData,
            }
          })
            .then((res)=>{
              this.chartsResult=[]
              var _this=this
              res.data.resultList.map(function (item,index) {
                _this.chartsResult.push(_this.numFilter(item.pass_rate*100))
              })
            })
            .catch((error)=>{
              console.log(error)
            })
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
    min-height: 400px;
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
