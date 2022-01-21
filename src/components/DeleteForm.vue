<template>
  <div class="wrapper">
    <slot></slot>
    <div class="button__group">
      <Button notPrimary @click="$emit('confirm')">
        Удалить
      </Button>
      <Button @click="$emit('cancel')">
        Отмена
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChoiceForm',

}
</script>

<style lang="scss" scoped>
.button__group {
  display: flex;
  grid-gap: 30px;
  padding-top: 30px;
}
</style>