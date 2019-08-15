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
                  <el-select style="float: right;width: 180px;" v-model="value" clearable placeholder="选择市场" size="mini" @change="((val)=>{changeS(val,index)})">
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
          selectDatas:[
            {value:'益民菜市(长顺街店)',label:'益民菜市(长顺街店)'},
            {value:'益民菜市(北东街店)',label:'益民菜市(北东街店)'},
            {value:'福美优鲜(科联路店)',label:'福美优鲜(科联路店)'},
            {value:'益民菜市(家园店)',label:'益民菜市(家园店)'},
            {value:'欢腾农贸市场',label:'欢腾农贸市场'},
            {value:'金沙农贸市场',label:'金沙农贸市场'},
            {value:'民生菜市(牧电路店)',label:'民生菜市(牧电路店)'},
            {value:'民生菜市(牧电巷店)',label:'民生菜市(牧电巷店)'},
            {value:'培风农贸市场',label:'培风农贸市场'},
            {value:'石人农贸市场',label:'石人农贸市场'},
            {value:'苏坡农贸市场',label:'苏坡农贸市场'},
            {value:'汪家拐农贸市场',label:'汪家拐农贸市场'},
            {value:'文家综合农贸市场',label:'文家综合农贸市场'},
            {value:'优品汇民市场',label:'优品汇民市场'},
            {value:'益民菜市(中铁西城店)',label:'益民菜市(中铁西城店)'},
            {value:'双顺农贸市场',label:'双顺农贸市场'},
            {value:'三合农贸市场',label:'三合农贸市场'},
            {value:'东坡现代农贸市场',label:'东坡现代农贸市场'},
            {value:'贝森农贸市场',label:'贝森农贸市场'},
            {value:'益民菜市(锦西店)',label:'益民菜市(锦西店)'},
            {value:'清溪菜市',label:'清溪菜市'},
            {value:'群康菜市',label:'群康菜市'},
            {value:'水木光华农贸市场',label:'水木光华农贸市场'},
            {value:'成航农贸市场',label:'成航农贸市场'},
            {value:'龙嘴农贸市场',label:'龙嘴农贸市场'},
            {value:'百仁润禾农贸市场',label:'百仁润禾农贸市场'},
            {value:'益民菜市(清波店)',label:'益民菜市(清波店)'},
            {value:'益民菜市(清源店)',label:'益民菜市(清源店)'},
            {value:'益民菜市(万家湾店)',label:'益民菜市(万家湾店)'},
            {value:'联合一百生活广场',label:'联合一百生活广场'},
            {value:'益民菜市(英国小镇店)',label:'益民菜市(英国小镇店)'},
            {value:'幸福里农贸市场',label:'幸福里农贸市场'},
            {value:'益民菜市(浣花溪店)',label:'益民菜市(浣花溪店)'},
            {value:'益民菜市(小关庙店)',label:'益民菜市(小关庙店)'},
          ],
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
          value:'',

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
