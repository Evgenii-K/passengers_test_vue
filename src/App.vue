<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <PassengersList/>
  </div>
</template>

<script>
import PassengersList from '@components/PassengersList.vue'

export default {
  name: 'App',
  components: {
    PassengersList,
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  border: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body  {
  height: 100%;
  background: #dfe1eb;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
