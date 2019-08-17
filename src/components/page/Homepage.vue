<template>
  <div id="main">
      <el-row :gutter="20">
        <template v-for="(title,index) in titles">
          <el-col :span="8">
            <div class="flh-style-a">
              <Totaldata :marketcount="title.countdata" :detection="title.detection" :result="title.result| numFilter">
                <template v-slot:title>
                  {{title.value}}数据汇总
                </template>
                <template v-slot:date>
                  <el-date-picker
                    v-model="title.value"
                    :type="title.type"
                    :placeholder="title.placeholder"
                    size="mini"
                    class="flh-data-style"
                    :format="title.format"
                    :value-format="title.valueformat"
                    @change="change(index)">
                  </el-date-picker>
                </template>
              </Totaldata>
            </div>
          </el-col>
        </template>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="flh-style-a">
            <el-row>
              <el-col :span="24" style="padding-top: 20px">
                <Titlename>快检样品种类总批次数</Titlename>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <Kinddata :countCharts="countCharts"></Kinddata>
              </el-col>
              <el-col :span="14">
                <Piecharts :countCharts="countCharts" :kindCharts="kindCharts"></Piecharts>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flh-style-a">
            <el-row>
              <el-col :span="24" style="padding-top: 20px">
                <Titlename>快检样品种类总合格率</Titlename>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <Kinddata :marcounts="marcounts"></Kinddata>
              </el-col>
              <el-col :span="14">
                <Shadowcharts :resultcounts="resultcounts"></Shadowcharts>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="flh-style-b">
            <el-row>
              <el-col :span="24" style="padding-top: 20px">
                <Titlename>
                  检测出不合格产品
                </Titlename>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <Disqualifitable
                :thTitle="thTitle"
                :tdData="tdData"
                :isActive="isActive"
                :height-size="320"></Disqualifitable>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flh-style-b">
            <el-row>
              <el-col :span="12" style="padding-top: 20px">
                <Titlename>
                  今日快检数据
                </Titlename>
              </el-col>
              <el-col :span="12" style="padding-top: 12px;">
                <SelectMarket :selectData="selectData" style="float: right;width: 180px;" @selectValue="getSonValue"></SelectMarket>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <Disqualifitable
                :thTitle="todayThTitle"
                :tdData="todayData"
                :isActive="isActive"
                :height-size="320"
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
    import Totaldata from "@/components/page/HomePgson/Totaldata";
    import Piecharts from "@/components/page/HomePgson/Piecharts";
    import Kinddata from "@/components/page/HomePgson/Kinddata";
    import Titlename from "@/components/page/HomePgson/Titlename";
    import Shadowcharts from  '@/components/page/HomePgson/Shadowcharts'
    import Disqualifitable from "@/components/page/HomePgson/Disqualifitable";
    import SelectMarket from "@/components/page/HomePgson/SelectMarket";
    export default {
      name: "homepage",
      components: {SelectMarket, Disqualifitable, Titlename, Kinddata, Piecharts, Totaldata,Shadowcharts},
      data(){
        return{
          titles:[
            {content:'',value:'',type:'year',placeholder:'选择年份',format:'yyyy年',valueformat:'yyyy',countdata:'',
              detection:'',result:''},
            {content:'',value:'',type:'month',placeholder:'选择月份',format:'yyyy年MM月',valueformat:'yyyy-MM',countdata:'',
              detection:'',result:''},
            {content:'',value:'',type:'date',placeholder:'选择日期',format:'yyyy年MM月dd日',valueformat:'yyyy-MM-dd',countdata:'',
              detection:'',result:''}
          ],
          kindCharts:[],
          countCharts:[],
          marcounts:[],
          resultcounts:[],
          thTitle:[
            {label:'样品编号',data:'id'},
            {label:'经营户',data:'manage'},
            {label:'样品名称',data:'sampname'},
            {label:'进货渠道',data:'channels'},
            {label:'所属市场',data:'testaddr'},
            {label:'检测项目',data:'testitem'},
            {label:'检测指标',data:'testidx'},
            {label:'检测结论',data:'result'},
            {label:'检测时间',data:'testtm'},
            {label:'处理结果',data:'precess'}
          ],
          todayThTitle:[
            {label:'样品编号',data:'id'},
            {label:'经营户',data:'manage'},
            {label:'样品名称',data:'sampname'},
            {label:'产地',data:'location'},
            {label:'进货渠道',data:'channels'},
            {label:'检测项目',data:'testitem'},
            {label:'检测指标',data:'testidx'},
            {label:'检测结论',data:'result'},
            {label:'检测时间',data:'testtm'},
            {label:'处理结果',data:'precess'}
          ],
          tdData:[],
          todayData:[],
          selectData:[],
          selectValue:'',
          todayDate:''
        }
      },
      watch:{
        selectValue:function (newvalue,oldvalue) {
          if (newvalue!==oldvalue){
            this.$axios.get('/Dataservlet$ajax.htm', {
              params:{
                date:this.todayDate,
                market:newvalue,
                pageSize:300
              }
            })
              .then((res) => {
                var _this = this
                this.todayData=[];
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
                    _this.todayData.push({id:index+1,manage:item.manage,sampname:item.sampname,location:item.location,channels:item.channels,testitem:item.testitem,testidx:item.testidx,result:item.result,testtm:_this.$moment(item.testtm).format('YYYY-MM-DD'),precess:item.precess})
                  })
              })
              .catch((error) => {
                console.log(error);
              })
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
        },
        getTodayDate(){
          this.todayDate=this.$moment().format('YYYY-MM-DD');
        },
        marketcount(){
          //循环加载市场总数、数据总数、合格率
          for (let i=0;i<this.titles.length;i++) {
            this.$axios.get('/Yearcouservlet$ajax.htm', {
              params:{
                date:this.titles[i].value,
                area:'青羊区'
              }
            })
              .then((res) => {
                this.titles[i].countdata=res.data.marcount
              })
              .catch((error) => {
                console.log(error);
              })
            this.$axios.get('/Countservlet$ajax.htm', {
              params:{
                date:this.titles[i].value,
                area:'青羊区'
              }
            })
              .then((res) => {
                this.titles[i].detection=res.data.marcount
              })
              .catch((error) => {
                console.log(error);
              })
            this.$axios.get('/Resultservlet$ajax.htm', {
              params:{
                date:this.titles[i].value,
                area:'青羊区'
              }
            })
              .then((res) => {
                this.titles[i].result=res.data.data*100
              })
              .catch((error) => {
                console.log(error);
              })
          }
          //加载图表数据
          this.$axios.get('/obtain/kinds_data_count$ajax.htm', {
            params:{
              area:'青羊区'
            }
          })
            .then((res) => {
              var _this = this
              res.data.resultList.map(function (item,index) {
                _this.kindCharts.push(item.kind)
                _this.countCharts.push({name:item.kind,value:item.count})
                _this.marcounts.push({name:item.kind,value:_this.numFilter(item.pass_rate*100)+'%'})
                _this.resultcounts.push({name:item.kind,value:_this.numFilter(item.pass_rate*100)})
              })
            })
            .catch((error) => {
              console.log(error);
            })
          this.$axios.get('/DataFservlet$ajax.htm')
            .then((res) => {
              var _this = this
              this.tdData=[]
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
                _this.tdData.push({id:index+1,manage:item.manage,sampname:item.sampname,channels:item.channels,
                  testaddr:item.testaddr,testitem:item.testitem,testidx:item.testidx,result:item.result,testtm:_this.$moment(item.testtm).format('YYYY-MM-DD'),precess:item.precess})
              })

            })
            .catch((error) => {
              console.log(error);
            })
        },
        change(index){
          this.$axios.get('/Yearcouservlet$ajax.htm', {
            params:{
              date:this.titles[index].value,
              area:'青羊区'
            }
          })
            .then((res) => {
              this.titles[index].countdata=res.data.marcount
            })
            .catch((error) => {
              console.log(error);
            })
          this.$axios.get('/Countservlet$ajax.htm', {
            params:{
              date:this.titles[index].value,
              area:'青羊区'
            }
          })
            .then((res) => {
              this.titles[index].detection=res.data.marcount
            })
            .catch((error) => {
              console.log(error);
            })
          this.$axios.get('/Resultservlet$ajax.htm', {
            params:{
              date:this.titles[index].value,
              area:'青羊区'
            }
          })
            .then((res) => {
              this.titles[index].result=res.data.data*100
            })
            .catch((error) => {
              console.log(error);
            })
        },
        computeddate(){
          this.titles[0].value=this.$moment().format('YYYY')
          this.titles[1].value=this.$moment().format('YYYY-MM')
          this.titles[2].value=this.$moment().format('YYYY-MM-DD')
        },
        numFilter (value) {
          // 截取当前数据到小数点后两位
          let tempVal = parseFloat(value).toFixed(2)
          let realVal = tempVal.substring(0, tempVal.length - 1)
          return realVal
        },
        getSonValue(data){
          this.selectValue=data
        }
      },
      filters: {
        numFilter (value) {
          // 截取当前数据到小数点后两位
          let tempVal = parseFloat(value).toFixed(2)
          let realVal = tempVal.substring(0, tempVal.length - 1)
          return realVal
        }
      },
      created(){
        //加载市场名
        this.$axios.get('http://localhost:8080/static/market.json')
          .then((res)=>{
            this.selectData=res.data.qyArea
          })
          .catch((error)=>{
            console.log(error);
          })
        //年月日分别从后台取市场总数
        this.getTodayDate()
        this.computeddate()
        this.marketcount()

      }
    }
</script>

<style scoped>
  #main{
    width: 100%;
    height: 100%;
  }
  .flh-style-a{
    background-color: #FFFFFF;
    min-height: 200px;
    padding: 0 20px ;
  }
  .flh-style-b{
    background-color: #FFFFFF;
    min-height: 400px;
    padding: 0 20px ;
  }
  .flh-data-style{
    width: 160px;
    float: right;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
     margin-bottom: 0;
   }

</style>
