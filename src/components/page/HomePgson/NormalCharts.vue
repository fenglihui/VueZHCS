<template>
    <div id="searchChartsF"></div>
</template>

<script>
    export default {
      name: "NormalCharts",
      props:['resultcounts','rowValue'],
      data(){
        return{
          kind:[],
          count:[],
          chartsX:this.rowValue,
          myRcharts:null
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
          this.myRcharts = this.$echarts.init(document.getElementById('searchChartsF'));
          let option = {
            tooltip : {

            },
            legend: {
              textStyle:{
                color:'#a3a3a3'
              },
              data:['批次数']
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
                name:'批次数',
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
          this.myRcharts.setOption(option, true);
        },

      }
    }
</script>

<style scoped>
  #searchChartsF{
    width: 100%;
    height: 340px;
  }
</style>

