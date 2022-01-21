<template>
  <div>
    <h4 class="confirm__title">Данные пассажира успешно удалены</h4>
    <Button
      @click="$emit('close')"
    >
      Закрыть
    </Button>
  </div>
</template>

<script>
export default {
  name: 'ConfirmForm',
}
</script>

<style lang="scss" scoped>
.confirm {
  &__title {
    padding-bottom: 30px;
  }
}
</style>