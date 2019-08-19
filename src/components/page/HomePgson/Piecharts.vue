<template>
    <div id="myCcharts"></div>
</template>

<script>
    export default {
      name: "Piecharts",
      props:['countCharts','kindCharts'],
      data(){
        return{
          kind:[],
          count:[],
          myCcharts:null
        }
      },
      watch:{
        countCharts:function (newvalue,oldvalue) {
          this.count=newvalue;
          this.drawCharts();
        },
        kindCharts:function (newvalue,oldvalue) {
          this.kind=newvalue;
          this.drawCharts();
        },
        getStoreItem(newval,oldval){
          if (newval!==oldval){
            this.myCcharts.resize();
          }
        }
      },
      mounted() {
        this.drawCharts()
      },
      computed:{
        getStoreItem(){
          return this.$store.state.windowSize
        }
      },
      methods:{
        drawCharts(){
          this.myCcharts = this.$echarts.init(document.getElementById('myCcharts'),'wonderland');
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left:'10%',
              data:this.kindCharts
            },
            series: [
              {
                name:'检测类型',
                type:'pie',
                radius: ['60%', '80%'],
                center:['70%','50%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '14',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:this.countCharts
              }
            ]
          }
          this.myCcharts.setOption(option,true)
        },

      }
    }
</script>

<style scoped>
  #myCcharts{
    width: 100%;
    height: 140px;
  }
</style>
