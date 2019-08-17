<template>
  <div id="searchChartsS"></div>
</template>

<script>
  export default {
    name: "NormalChartsS",
    props:['resultcounts','rowValue'],
    data(){
      return{
        kind:[],
        count:[],
        chartsX:this.rowValue
      }
    },
    watch:{
      resultcounts:function (newvalue,oldvalue) {
        this.count=newvalue;
        this.drawCharts();
      },
      rowValue:function (newvalue,oldvalue) {
        this.chartsX=newvalue;
        this.drawCharts();
      }
    },
    mounted() {
      this.drawCharts()
    },
    methods:{
      drawCharts(){
        let myRcharts = this.$echarts.init(document.getElementById('searchChartsS'));
        let option = {
          tooltip : {

          },
          legend: {
            textStyle:{
              color:'#a3a3a3'
            },
            data:['合格率']
          },
          grid:{
            show:true,
            borderColor: '#cecece'
          },
          xAxis : [
            {
              data :this.chartsX,
              axisLine:{
                lineStyle:{
                  color:'#cecece'
                }
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLine:{
                lineStyle:{
                  color:'#cecece'
                }
              }
            }
          ],
          series : [
            {
              name:'合格率',
              type:'bar',
              data:this.count,
              itemStyle:{
                normal:{
                  color:'#24ad83'
                }
              }
            }
          ],
          textStyle:{
            color:'#a3a3a3'
          }
        };
        myRcharts.setOption(option, true);
      },

    }
  }
</script>

<style scoped>
  #searchChartsS{
    width: 100%;
    height: 340px;
  }
</style>

