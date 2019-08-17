<template>
    <div>
      <el-row :gutter="20">
        <template v-for="(search,index) in searchs">
          <el-col :span="12">
            <div class="flh-background-style">
              <el-row>
                <el-col :span="12" style="padding-top: 20px">
                  <Titlename>
                    {{search.title}}
                  </Titlename>
                </el-col>
                <el-col :span="12" style="padding-top: 12px;">
                  <el-date-picker
                    v-model="search.selectDate"
                    :type="search.type"
                    :placeholder="search.placeholder"
                    size="mini"
                    class="flh-data-style"
                    :format="search.format"
                    :value-format="search.valueformat"
                    @change="changeF(index)">
                  </el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <Disqualifitable
                    :thTitle="todayThTitle"
                    :tdData="search.data"
                    :loading="search.loading"
                    :height-size="320"
                  >

                  </Disqualifitable>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </template>
      </el-row>
      <el-row :gutter="20">
        <template v-for="(kind,index) in kinds">
          <el-col :span="12">
            <div class="flh-background-style">
              <el-row>
                <el-col :span="12" style="padding-top: 20px">
                  <Titlename>
                    {{kind.title}}
                  </Titlename>
                </el-col>
                <el-col :span="12" style="padding-top: 12px;">
                  <el-select style="float: right;width: 180px;" v-model="kind.selectData" clearable placeholder="选择市场" size="mini" @change="((val)=>{changeS(val,index)})">
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
                    :thTitle="kindsThTitle"
                    :tdData="kind.data"
                    :loading="kind.loading"
                    :height-size="320"
                  >
                  </Disqualifitable>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
</template>

<script>
    import Titlename from "@/components/page/HomePgson/Titlename";
    import SelectMarket from "@/components/page/HomePgson/SelectMarket";
    import Disqualifitable from "@/components/page/HomePgson/Disqualifitable";
    export default {
      name: "Searchpage1",
      components: {Disqualifitable, SelectMarket, Titlename},
      data(){
        return{
          searchs:[
            {title:'快检数据按年份统计',selectDate:'',type:'year',placeholder:'选择年份',format:'yyyy年',valueformat:'yyyy',method:'changeF',data:[],loading:false},
            {title:'快检数据按月份统计',selectDate:'',type:'month',placeholder:'选择月份',format:'yyyy年MM月',valueformat:'yyyy-MM',method:'changeF',data:[],loading:false},
          ],
          kinds:[
            {title:'快检数据按种类统计',selectData:'',data:[],loading:false},
            {title:'快检数据按种类统计',selectData:'',data:[],loading:false},
          ],
          selectDatas:[],
          todayThTitle:[
            {label:'市场名称',data:'name'},
            {label:'快检批次',data:'count'},
            {label:'合格率',data:'pass_rate'},
            {label:'市场负责人',data:'manageName'},
            {label:'联系电话',data:'managePhone'},
            {label:'检测时间',data:'testtm'},
          ],
          kindsThTitle:[
          {label:'种类名称',data:'kind'},
          {label:'快检批次',data:'count'},
          {label:'合格率',data:'pass_rate'},
          {label:'检测时间',data:'testtm'},
        ],
          selectData:'',

        }
      },
      methods:{
        changeF(index){
          this.searchs[index].loading=true
          this.$axios.get('/obtain/market_data$ajax.htm', {
            params:{
              date:this.searchs[index].selectDate,
              pageSize:3000
            }
          })
            .then((res) => {
              this.searchs[index].loading=false
              var _this=this
              var _index=index
              _this.searchs[_index].data=[];
              res.data.resultList.map(function (item,index){
                _this.searchs[_index].data.push({name:item.name,count:item.count,pass_rate:_this.numFilter(item.pass_rate*100)+'%',manageName:item.manageName,managePhone:item.managePhone,testtm:_this.searchs[_index].selectDate})
              })
            })
            .catch((error) => {
              console.log(error);
            })
        },
        changeS(val,index){
          this.kinds[index].loading=true
          this.kinds[index].selectData=val
          this.$axios.get('/obtain/kinds_data_count$ajax.htm', {
            params:{
              date:this.searchs[index].selectDate,
              addr:this.kinds[index].selectData,
              area:this.$store.state.area,
              pageSize:3000
            }
          })
            .then((res) => {
              this.kinds[index].loading=false
              var _this=this
              var _index=index
              _this.kinds[_index].data=[];
              res.data.resultList.map(function (item,index){
                _this.kinds[_index].data.push({kind:item.kind,count:item.count,pass_rate:_this.numFilter(item.pass_rate*100)+'%',testtm:_this.searchs[_index].selectDate})
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
    float: right;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
</style>
