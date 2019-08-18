<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="flh-background-style">
            <el-row>
              <el-col :span="24" style="padding-top: 20px">
                <Titlename>农贸市场快检总批次数</Titlename>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <pie-charts :countCharts="countCharts" :kindCharts="kindCharts" :titleData="selectMarket"></pie-charts>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flh-background-style" >
            <el-row>
              <el-col :span="24" style="padding-top: 20px">
                <Titlename>农贸市场快检总合格率</Titlename>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <ShadowCharts :resultcounts="resultcounts" :kindCharts="kindCharts" :titleData="selectMarket"></ShadowCharts>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="flh-background-map">
            <el-row>
              <el-col :span="17" style="padding-top: 20px">
                <Titlename>市场定位</Titlename>
              </el-col>
              <el-col :span="7" style="padding-top: 12px">
                <el-select style="width: 180px;" v-model="selectData" clearable placeholder="选择地区" size="mini">
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
              <el-col :span="24" style="width:100%;height: 360px">
                <div id="vegeMap"></div>
                <ul id="myList"></ul>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>

    import Titlename from "@/components/page/HomePgson/Titlename";
    import AMap from 'AMap'
    import PieCharts from "@/components/page/MapPgson/pieCharts";
    import ShadowCharts from "@/components/page/MapPgson/shadowCharts";
    export default {
      name: "Mappage",
      components: {ShadowCharts, PieCharts, Titlename},
      data(){
        return{
          selectData:'青羊区',
          selectMarket:'益民菜市(长顺街店)',
          selectDatas:[
            {label:'青羊区',value:'青羊区'},
            {label:'武侯区',value:'武侯区'},
            {label:'金牛区',value:'金牛区'},
            {label:'锦江区',value:'锦江区'},
            {label:'成华区',value:'成华区'},
            {label:'双流区',value:'双流区'}
          ],
          marketJson:{},
          markets:[],
          markerList:null,
          map:null,
          kindCharts:[],
          countCharts:[],
          resultcounts:[]

        }
      },
      watch:{
        selectData:function (newval,oldval) {
          if (newval!==oldval){
            this.selectData=newval
            this.changeS()
          }
        }
      },
      methods:{
        init(){
          var _this = this
           _this.map = new AMap.Map('vegeMap',{
            zoom:9,
            mapStyle: 'amap://styles/81cc4daf033e4b46d95a11bf3e75c0d3'
          });
          AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation'],function(){//异步加载插件
            let ToolBar = new AMap.ToolBar({
              offset: new AMap.Pixel(10,12),
              position:'LT'
            });
           _this.map.addControl(ToolBar)
           _this.map.addControl(new AMap.Scale())
            // map.addControl(new AMap.OverView({isOpen:true}));
            let Geolocation = new AMap.Geolocation({
              buttonPosition:'LB',
              buttonOffset: new AMap.Pixel(18, 50)
            });
            _this.map.addControl(Geolocation)
          });
          AMapUI.loadUI(['misc/MarkerList','overlay/SimpleMarker'], function(MarkerList,SimpleMarker) {
            //启动页面
            _this.$options.methods.initPage(MarkerList,SimpleMarker,_this);
          });
        },
        initPage(MarkerList,SimpleMarker,_this) {

          //创建一个实例
          _this.markerList = new MarkerList({
            map:_this.map, //关联的map对象
            listContainer: 'myList', //列表的dom容器的节点或者id, 用于放置getListElement返回的内容
            getDataId: function(dataItem, index) {
              //返回数据项的Id
              return dataItem.id;
            },
            getPosition: function(dataItem) {
              //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
              return dataItem.position;
            },
            getMarker: function(dataItem, context, recycledMarker) {
              if (context.index<9){
                var label = String.fromCharCode('1'.charCodeAt(0) + context.index);
              }
              else if(context.index>=9&&context.index<19){
                var label = String.fromCharCode('1'.charCodeAt(0),'0'.charCodeAt(0) + (context.index-9));
              }
              else if(context.index>=19&&context.index<29){
                var label = String.fromCharCode('2'.charCodeAt(0),'0'.charCodeAt(0) + (context.index-19));
              }
              else if(context.index>=29&&context.index<39){
                var label = String.fromCharCode('3'.charCodeAt(0),'0'.charCodeAt(0) + (context.index-29));
              }
              //console.log(context.index);
              /* if (recycledMarker) {
                   //存在可回收利用的marker,直接setLabel返回
                   recycledMarker.setLabel(label);
                   return recycledMarker;
               }
               //返回一个新的Marker
              /*return new AMap.Marker({
                   label: label
               });*/
              return new SimpleMarker({
                iconTheme: 'fresh',
                //背景图标样式
                iconStyle: 'lightgreen',
                iconLabel: {
                  innerHTML:label,
                  style: {
                    color: '#ff29c0',
                    fontSize:'13px'
                  } //设置文字颜色
                },
                offset: new AMap.Pixel(16, 18)
              });
            },
            getInfoWindow: function(dataItem, context, recycledInfoWindow) {
              var tpl = '<p class="my-btn1"><%- dataItem.id %>：<%- dataItem.desc %></p><div class="bottom-link"></div><p class="address1">地址：<%- dataItem.address %></p>';
              //MarkerList.utils.template支持underscore语法的模板
              var content = MarkerList.utils.template(tpl, {
                dataItem: dataItem,
                dataIndex: context.index
              });
              if (recycledInfoWindow) {
                //存在可回收利用的infoWindow, 直接setContent返回
                recycledInfoWindow.setContent(content);
                return recycledInfoWindow;
              }
              //返回一个新的InfoWindow
              return new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -23),
                content: content
              });
            },
            getListElement: function(dataItem, context, recycledListElement) {
              var tpl = '<p class="my-btn2"><%- dataItem.id %>：<%- dataItem.desc %></p><p class="address2">地址：<%- dataItem.address %></p><div class="bottom-link"></div>';
              var content = MarkerList.utils.template(tpl, {
                dataItem: dataItem,
                dataIndex: context.index
              });
              if (recycledListElement) {
                //存在可回收利用的listElement, 直接更新内容返回
                recycledListElement.innerHTML = content;
                return recycledListElement;
              }
              //返回一段html，MarkerList将利用此html构建一个新的dom节点
              return '<li class="li-hover">' + content + '</li>';
            }
          });
          //监听选中改变
          _this.markerList.on('selectedChanged', function(event, info) {
          });
          //监听Marker和ListElement上的点击，详见markerEvents，listElementEvents
          _this.markerList.on('markerClick listElementClick', function(event, record) {
            _this.selectMarket = record.data.desc;
            _this.$options.methods.excelmap(_this);
          });
          //利用created中获取的数据初始化
          _this.markerList.render(_this.markets)
          //构建数据源，数据项本身没有格式要求，但需要支持getDataId和getPosition

          //清除数据
          //markerList.render([]);
        },
        changeS(){
          if (this.selectData=='青羊区') {
            this.markets = this.marketJson.market1
            this.markerList.render(this.markets)
          }
          else if (this.selectData=='武侯区') {
            this.markets=this.marketJson.market2
            this.markerList.render(this.markets)
          }
          else if (this.selectData=='金牛区') {
            this.markets=this.marketJson.market3
            this.markerList.render(this.markets)
          }
          else if (this.selectData=='锦江区') {
            this.markets=this.marketJson.market4
            this.markerList.render(this.markets)
          }
          else if (this.selectData=='成华区') {
            this.markets=this.marketJson.market5
            this.markerList.render(this.markets)
          }
          else if (this.selectData=='双流区') {
            this.markets=this.marketJson.market6
            this.markerList.render(this.markets)
          }

        },
        numFilter (value) {
          // 截取当前数据到小数点后两位
          let tempVal = parseFloat(value).toFixed(2)
          let realVal = tempVal.substring(0, tempVal.length - 1)
          return realVal
        },
        excelmap(_this) {
          _this.$axios.get('/obtain/kinds_data_count$ajax.htm',{
            params:{
              addr:_this.selectMarket,
              area:_this.selectData
            }
          })
            .then((res)=> {
              _this.kindCharts=[]
              _this.countCharts=[]
              _this.resultcounts=[]
              res.data.resultList.map(function (item,index) {
                _this.kindCharts.push(item.kind)
                _this.countCharts.push({name:item.kind,value:item.count})
                _this.resultcounts.push({name:item.kind,value:_this.numFilter(item.pass_rate*100)})
              })
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      },

      created() {
        this.$axios.get('http://localhost:8080/static/area.json')
          .then((res)=> {
            this.marketJson=res.data
            this.markets=res.data.market1
          })

          .catch((err)=>{
            console.log(err)
          })
        this.$axios.get('/obtain/kinds_data_count$ajax.htm',{
          params:{
            addr:this.selectMarket,
            area:this.$store.state.area
          }
        })
          .then((res)=> {
            var _this = this
            res.data.resultList.map(function (item,index) {
              _this.kindCharts.push(item.kind)
              _this.countCharts.push({name:item.kind,value:item.count})
              _this.resultcounts.push({name:item.kind,value:_this.numFilter(item.pass_rate*100)})
            })
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      mounted(){
        let _this = this
        this.init()
      }
    }
</script>

<style scoped>
  .flh-background-style{
    min-height: 400px;
    background-color: #FFFFFF;
    padding: 0 20px ;
  }
  .flh-background-map{
    min-height: 450px;
    background-color: #FFFFFF;
    padding: 0 20px ;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  #vegeMap{
    width: 100%;
    height: 100%;
  }
  #myList{
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 20px;
    right: 80px;
    overflow-y:auto ;
    font-size: 12px;
    text-align: center;
    list-style-type: none;
    padding-left: 0;
  }
  #myList,#myList li{
    border: 1px solid #f1f1f1;
  }

</style>
