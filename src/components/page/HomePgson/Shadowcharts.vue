<template>
  <div id="myRcharts"></div>
</template>

<script>
  export default {
    name: "Shadowcharts",
    props:['resultcounts'],
    data(){
      return{
        kind:[],
        count:[]
      }
    },
    watch:{
      resultcounts:function (newvalue,oldvalue) {
        this.count=newvalue;
        this.drawCharts();
      }
    },
    mounted() {
      this.drawCharts()
    },
    methods:{
      drawCharts(){
        let myRcharts = this.$echarts.init(document.getElementById('myRcharts'),'wonderland');
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            height:'90%',
            top:'6%',
            left: '3%',
            right: '4%',
            bottom: '2%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['蔬菜类', '水果类', '禽蛋类', '水产类','肉类','干制品'],
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
        myRcharts.setOption(option, true);
      },

    }
  }
</script>

<style scoped>
  #myRcharts{
    width: 100%;
    height: 140px;
  }
</style>

