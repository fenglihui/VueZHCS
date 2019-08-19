<template>
  <div id="myRcharts"></div>
</template>

<script>
  export default {
    name: "shadowCharts",
    props:['resultcounts','kindCharts','titleData'],
    data(){
      return{
        kind:this.kindCharts,
        count:this.resultcounts,
        myRcharts:null
      }
    },
    watch:{
      resultcounts:function (newvalue,oldvalue) {
        this.count=newvalue;
        this.drawCharts();
      },
      kindCharts:function (newvalue,oldvalue) {
        this.kind=newvalue
        this.drawCharts()
      },
      getStoreItem(newval,oldval){
        if (newval!==oldval){
          this.myRcharts.resize();
        }
      }
    },
    computed:{
      getStoreItem(){
        return this.$store.state.windowSize
      }
    },
    mounted() {
      this.drawCharts()
    },
    methods:{
      drawCharts(){
        this.myRcharts = this.$echarts.init(document.getElementById('myRcharts'),'wonderland');
        let option = {
          title:{
            show:true,
            text:this.titleData,
            textStyle:{
              color:'#333',
              fontSize:14
            }
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            height:'90%',
            left: '3%',
            right: '4%',
            bottom: '2%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.kind,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel:{
                interval:0
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'合格率',
              type:'bar',
              barWidth: '70%',
              data:this.count,
              itemStyle:{
                normal:{
                  color:function(params) {
                    // build a color map as your need.
                    var colorList = [
                      "#24ad83",
                      "#eb8c97",
                      "#fac168",
                      "#66dff5",
                      "#d0648a",
                      "#e8f26e"
                    ];
                    return colorList[params.dataIndex]
                  },
                }
              }
            }
          ]
        };
        this.myRcharts.setOption(option, true);
      },

    }
  }
</script>

<style scoped>
  #myRcharts{
    width: 100%;
    height: 340px;
  }
</style>


