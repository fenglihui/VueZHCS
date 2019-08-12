<template>
    <div class="flh-title-size">
      <span><slot></slot></span>
    </div>
</template>

<script>
    export default {
        name: "Titlename"
    }
</script>

<style scoped>
  .flh-title-size{
    width: 100%;
    min-height: 20px;
    text-align: left;
    font-size: 14px;
  }
</style>
