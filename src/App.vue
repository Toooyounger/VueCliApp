<template>
  <div id="body">
    <router-view>

    </router-view>
  </div>

</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#body{
  height: 721px;
}
#nprogress .bar {
  background: rgb(64,158,255) !important;
  margin-top: 0 !important;
  height: 3px !important;
}
</style>
