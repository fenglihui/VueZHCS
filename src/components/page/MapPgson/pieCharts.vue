<template>
    <div id="pieCharts"></div>
</template>

<script>
    export default {
      name: "pieCharts",
      props:['countCharts','kindCharts','titleData'],
      data(){
        return{
          kind:this.kindCharts,
          count:this.countCharts,
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
          this.myCcharts = this.$echarts.init(document.getElementById('pieCharts'),'wonderland');
          let option = {
            title:{
              show:true,
              text:this.titleData,
              textStyle:{
                color:'#333',
                fontSize:14
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              top:25,
              left:'5%',
              data:this.kind
            },
            series: [
              {
                name:'检测类型',
                type:'pie',
                radius: ['60%', '80%'],
                center:['65%','50%'],
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
                data:this.count
              }
            ]
          }
          this.myCcharts.setOption(option,true)
        },

      }
    }
</script>

<style scoped>
  #pieCharts{
    width: 100%;
    height: 340px;
  }
</style>
