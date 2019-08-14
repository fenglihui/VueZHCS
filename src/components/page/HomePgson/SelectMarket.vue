<template>
    <el-select v-model="value" clearable placeholder="选择市场" size="mini" @change="change">
      <el-option
      v-for="market in markets"
      :key="market.value"
      :value="market.value"
      :label="market.label">
      </el-option>

    </el-select>
</template>

<script>
    export default {
      name: "SelectMarket",
      props:['selectData'],
      data(){
        return{
          markets:[],
          value:'',
          selectValue:''
        }
      },
      watch:{
        selectData:function (newvalue,oldvalue) {
          this.markets=newvalue
        }
      },
      methods:{
        change(value){
          this.selectValue=value
          this.$emit('selectValue',this.selectValue)
        }
      },
      created() {
        this.markets=this.selectData
      },
    }
</script>

<style scoped>

</style>
