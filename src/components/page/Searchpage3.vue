<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="flh-background-style">
          <el-row>
            <el-col :span="20" style="padding-top: 20px">
              <Titlename>不合格数据查询</Titlename>
            </el-col>
            <el-col :span="4" style="padding-top: 14px">
              <el-select style="width: 140px;" v-model="selectData" clearable placeholder="选择分类" size="mini" @change="change">
                <el-option
                  v-for="selectData in selectDatas"
                  :key="selectData.value"
                  :value="selectData.value"
                  :label="selectData.label">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <Disqualifitable
                :thTitle="todayThTitle"
                :tdData="tdData"
                :loading="loading"
                :isActive="isActive"
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
      name: "Searchpage3",
      components: {Disqualifitable, Titlename},
      data(){
        return{
          selectData:'',
          selectDatas:[
            {value:' ',label:'全部'},
            {value:'已下架',label:'已下架'},
            {value:'待处理',label:'待处理'}
          ],
          todayThTitle:[
            {label:'编号',data:'id'},
            {label:'市场名称',data:'testaddr'},
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
          loading:false
        }
      },
      methods:{
        isActive:function ({row,column,rowIndex,columnIndex}) {
          if (row.result=='不合格'&&columnIndex==9){
            return 'color:#e1312c'
          }
          if (row.precess=='待处理'&&columnIndex==10){
            return  'color:#ff9c14'
          }
          if (row.result=='合格'&&columnIndex==9){
            return 'color:#2fbb50'
          }
          if (row.precess=='已下架'&&columnIndex==10){
            return 'color:#2fbb50'
          }
        },
        change(val){
          this.loading=true
          this.tdData=[]
          if (val==' '||val=='已下架'){
            this.$axios.get('/obtain/testtb$ajax.htm',{
              params:{
                area:this.$store.state.area,
                result:'不合格',
                precess:val,
                pageSize:3000
              }
            })
              .then((res)=>{
                var _this=this
                this.loading=false
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
                  _this.tdData.push({id:index+1,testaddr:item.testaddr,manage:item.manage,kind:item.kind,sampname:item.sampname,location:item.location,channels:item.channels,
                    testitem:item.testitem,testidx:item.testidx,result:item.result,precess:item.precess,testtm:_this.$moment(item.testtm).format('YYYY-MM-DD')})
                })
              })
              .catch((error)=>{
                console.log(error)
              })
          }
          else{
            this.$axios.get('DataFservlet$ajax.htm',{
              params:{
                area:this.$store.state.area,
                pageSize:3000
              }
            })
              .then((res)=>{
                var _this=this
                this.loading=false
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
                  _this.tdData.push({id:index+1,testaddr:item.testaddr,manage:item.manage,kind:item.kind,sampname:item.sampname,location:item.location,channels:item.channels,
                    testitem:item.testitem,testidx:item.testidx,result:item.result,precess:item.precess,testtm:_this.$moment(item.testtm).format('YYYY-MM-DD')})
                })
              })
              .catch((error)=>{
                console.log(error)
              })
          }
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
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
</style>
