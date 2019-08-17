<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="flh-background-style">
            <el-row>
              <el-col :span="16" style="padding-top: 20px">
                <Titlename>
                  快检数据录入
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
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="flh-form-div" v-if="isDisplay">
                  <el-form  class="flh-form-style" :inline="true" :model="form" label-width="100px">
                    <el-form-item label="样品编号">
                      <el-input v-model="form.id" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="经营户">
                      <el-input v-model="form.manage"></el-input>
                    </el-form-item>
                    <el-form-item label="样品种类">
                      <el-select v-model="form.kind" placeholder="请选择样品种类" clearable style="width: 214px">
                        <el-option label="蔬菜" value="蔬菜"></el-option>
                        <el-option label="水果" value="水果"></el-option>
                        <el-option label="肉类" value="肉类"></el-option>
                        <el-option label="干制品" value="干制品"></el-option>
                        <el-option label="水产" value="水产"></el-option>
                        <el-option label="禽蛋" value="禽蛋"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="样品名称">
                      <el-input v-model="form.sampname" ></el-input>
                    </el-form-item>
                    <el-form-item label="产地">
                      <el-input v-model="form.location"></el-input>
                    </el-form-item>
                    <el-form-item label="进货渠道">
                      <el-input v-model="form.channels"></el-input>
                    </el-form-item>
                    <el-form-item label="检测项目">
                      <el-select v-model="form.testitem" placeholder="请选择检测项目" clearable style="width: 214px">
                        <template v-if="form.kind=='蔬菜'||form.kind=='水果'">
                          <el-option label="农药残留" value="农药残留"></el-option>
                        </template>
                        <template v-else-if="form.kind=='肉类'">
                          <el-option label="盐酸克伦特罗" value="盐酸克伦特罗"></el-option>
                          <el-option label="莱克多巴胺" value="莱克多巴胺"></el-option>
                          <el-option label="瘦肉精" value="瘦肉精"></el-option>
                        </template>
                        <template v-else-if="form.kind=='干制品'">
                          <el-option label="二氧化硫" value="二氧化硫"></el-option>
                          <el-option label="吊白块" value="吊白块"></el-option>
                          <el-option label="明矾" value="明矾"></el-option>
                          <el-option label="甜蜜素" value="甜蜜素"></el-option>
                          <el-option label="亚硝酸盐" value="亚硝酸盐"></el-option>
                        </template>
                        <template v-else-if="form.kind=='水产'">
                          <el-option label="甲醛" value="甲醛"></el-option>
                          <el-option label="孔雀石绿" value="孔雀石绿"></el-option>
                        </template>
                        <template v-else-if="form.kind=='禽蛋'">
                          <el-option label="氟苯尼考" value="氟苯尼考"></el-option>
                        </template>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="检测指标">
                      <el-input v-model="form.testidx"></el-input>
                    </el-form-item>
                    <el-form-item label="检测结论">
                      <el-select v-model="form.result" placeholder="请选择检测结论" style="width: 214px">
                        <el-option label="合格" value="合格"></el-option>
                        <el-option label="不合格" value="不合格"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="价格">
                      <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <div style="text-align: center;padding-top: 20px">
                      <el-button type="success" size="medium" @click="affirm">确认</el-button>
                    </div>

                  </el-form>
                </div>

                <Disqualifitable
                  :thTitle="todayThTitle"
                  :tdData="tdData"
                  :height-size="560"
                  :labelName="labelName"
                  @selectTd="selTd"
                  @delTd="delTd">
                </Disqualifitable>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="11" style="padding-top: 20px;text-align: right">
                <el-button size="normal" type="primary" style="width: 140px" @click="append">添加</el-button>
              </el-col>
              <el-col :span="2" style="padding-top: 20px"></el-col>
              <el-col :span="11" style="padding-top: 20px">
                <el-button size="normal" type="success" style="width: 140px" @click="submit">提交</el-button>
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
      name: "InputPage",
      components: {Disqualifitable, Titlename},
      data(){
        return{
          selectData:'',
          selectDate:'',
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
            {label:'价格',data:'price'}
          ],
          tdData:[],
          form: {
            id:'',
            manage:'',
            kind:'',
            sampname:'',
            location: '',
            channels:'',
            testitem:'',
            testidx:'',
            result:'',
            price:'',
            testtm:this.selectDate,
            area:this.$store.state.area,
            testaddr:this.selectData
          },
          isDisplay:false,
          labelName:'执行操作',
          amend:false,
          amendId:''
        }
      },
      watch:{
        selectDate:function (newval,oldval) {
          this.form.testtm=newval
        },
        selectData:function (newval,oldval) {
          this.form.testaddr=newval
        }
      },
      methods:{
        selTd(val){
          this.form=val
          this.isDisplay=true
        },
        delTd(val){

          this.tdData=val
          console.log('val',this.tdData)
        },
        append(){
          this.isDisplay=true
          this.form.id=this.tdData.length+1
          this.traverse()
        },
        submit(){
          if(this.selectDate==''){
            this.$message({
              message:'检测时间不能为空',
              type:'error',
              center:true
            })
          }
          else if (this.selectData==''){
            this.$message({
              message:'市场不能为空',
              type:'error',
              center:true
            })
          }

          else{
            this.$axios.get('/save_testtb$ajax.htm',{
              params:{
                list:JSON.stringify(this.tdData)
              }
            })
              .then((res)=>{
                if (res.data.msg=='成功'){
                  this.$message({
                    message:this.tdData.length +'条数据提交成功' ,
                    type:'success',
                    center:true
                  })
                  this.tdData=[]
                }
                else{
                  this.$message({
                    message:this.tdData.length +'条数据提交失败，请联系系统管理员',
                    type:'error',
                    center:true
                  })

                }
              })
              .catch((error)=>{
                this.$message({
                  message:this.tdData.length +'条数据提交失败，请联系系统管理员',
                  type:'error',
                  center:true
                })
                console.log(error);
              })
          }
        },
        affirm(){
          var _this = this
          if (this.tdData.length<1){
            this.tdData.push(JSON.parse(JSON.stringify(this.form)))
            this.$message({
              message: '添加成功',
              type: 'success',
              center:true
            });
          }
          else{
            for (let i=0;i<_this.tdData.length;i++){
              if (_this.tdData[i].id==_this.form.id){
                _this.amend=true
                _this.amendId=i
              }
            }
            if (_this.amend){
              _this.$set(_this.tdData,_this.amendId,JSON.parse(JSON.stringify(_this.form)))
              this.$message({
                message: '修改成功',
                type: 'success',
                center:true
              });
            }
            else{
              this.tdData.push(JSON.parse(JSON.stringify(this.form)))
              this.$message({
                message: '添加成功',
                type: 'success',
                center:true
              });
            }
          }
          this.isDisplay=false
          this.amend=false
          this.traverse()
        },
        traverse(){
          this.form.manage='',
          this.form.kind='',
          this.form.sampname='',
          this.form.location= '',
          this.form.channels='',
          this.form.testitem='',
          this.form.testidx='',
          this.form.result='',
          this.form.price=''
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
  .flh-form-div{
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 300px);
    width: 700px;
    height: 450px;
    z-index: 99;
    background-color: #FFFFFF;
    border: 1px solid #bababa;
  }
  .flh-form-style{
    width: 100%;
    height: 100%;
    padding-top: 40px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .another /deep/ .el-input__inner{
    padding-left: 8px;
    padding-right: 8px;
  }

</style>
