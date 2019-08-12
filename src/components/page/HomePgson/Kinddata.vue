<template>
    <div class="flh-kind-style">
      <div class="flh-kind-child">
        <template v-for="count in counts">
          <div class="flh-kind-layout">
            <div class="flh-layout-color">
              <div class="flh-name-style">{{count.name}}</div>
              <div class="flh-value-style">{{count.value}}</div>
            </div>
          </div>


        </template>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Kinddata",
      props:['countCharts','marcounts'],
      data(){
        return{
          counts:[]
        }
      },
      watch: {
        countCharts: function (newvalue, oldvalue) {
          this.counts = newvalue;
        },
        marcounts: function (newvalue, oldvalue) {
          this.counts = newvalue;
        }
      }
    }
</script>

<style scoped>
  .flh-kind-style{
    width: 100%;
    height: 130px;
    background-color: #f1f1f1;
    margin-bottom: 10px;
  }
  .flh-kind-layout{
    width: 50%;
    height: 31%;
    float: left;
    line-height: 40px;

  }
  .flh-kind-child{
    width: 100%;
    height: 100%;
  }
  .flh-name-style{
    font-size: 12px;
    text-align: center;
    float: left;
    width: 35%;
  }
  .flh-value-style{
    font-size: 20px;
    text-align: center;
    float: left;
    color: #C6D0D4;
    width: 65%;
  }
  .flh-value-style:hover{
    color: #03D8FF;
  }
  .flh-layout-color{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    border: 4px solid #f1f1f1;
  }
</style>
