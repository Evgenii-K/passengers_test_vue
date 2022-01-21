<template>
  <div class="card">
    <div class="card__person">
      <div class="card__title">{{passenger.name ? passenger.name : 'No name'}}</div>
      <div class="card__content">Trips: {{passenger.trips ? passenger.trips : '___'}}</div>
      <Button
        @click="$emit('deleteCard', passenger._id)"
      >
        Удалить
      </Button>
    </div>
    <div class="card__airlines">
      <div class="card__title">Airline: {{passenger.airline[0].name}}</div>
      <img alt="Airline Logo" :src="passenger.airline[0].logo" class="card__airlines-image"/>
      <Button
        @click="$emit('showAbout', passenger.airline[0])"
      >
        Подробнее
      </Button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'PassengerCard',
  props: {
    passenger: Object,
    default: () => {}
  },
}
</script>

<style lang="scss" scoped>
.card {
  background: #4e567d;
  width: 748px;
  height: 220px;
  box-shadow: 0 20px 40px -15px rgb(0 0 0 / 25%);
  border-radius: 5px;
  margin: 10px;
  overflow: hidden;
  transform: translateY(48px) scale(0.9);
  transition: all 0.8s;
  opacity: 0;
  display: grid;
  grid-template-columns: 1fr 2fr;

  &__title {
    font-size: 20px;
  }

  &__person {
    color: white;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  &__button {
    background: #ff6a5e;
    height: 40px;
    border-radius: 3px;
    cursor: pointer;
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    color: white;
    border: none;
    min-width: 120px;

    &:hover {
      background: #ff4d40;
    }
  }

  &__airlines {
    background: #fff;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &-image {
      max-height: 100px;
    }
  }
}

@media (max-width: 767px) {
  .card {
    width: 100%;
  }
}

@media (max-width: 575px) {
  .card {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1.5fr;
    height: 340px;
  }
}
</style>