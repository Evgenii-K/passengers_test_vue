<template>
  <div>
    <div class="paper__title">{{ aboutAirline.name }}</div>
    <div class="paper__text-container">
      <div class="paper__text"><p>Страна: </p>{{ aboutAirline.country }}</div>
      <div class="paper__text"><p>Год основания: </p>{{ aboutAirline.established }}</div>
      <div class="paper__text"><p>Штаб-квартира: </p>{{ aboutAirline.head_quaters }}</div>
      <div class="paper__text"><p>Слоган: </p>{{ aboutAirline.slogan }}</div>
      <div class="paper__text"><p>website: </p><a :href="'https://' + aboutAirline.website">{{ aboutAirline.website }}</a></div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    aboutAirline: {
      type: Object,
      default: () => {}
    },
  }
}
</script>

<style lang="scss">
.paper {
  &__content {
    background-color: #fff;
    color: black;
    padding: 30px;
    position: relative;
  }

  &__title {
    font-size: 40px;
    margin: 0px 0px 20px 0px;
  }

  &__text-container {
    text-align: left;
  }

  &__text-container p {
    font-weight: 600;
  }
}
</style>