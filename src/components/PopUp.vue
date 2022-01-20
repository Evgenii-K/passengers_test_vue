<template>
<div 
  :class="['popup', {'popup__active': isPopupShow}]"
  @click="popupClose" 
>
  <div class="popup__body">
    <div 
      class="popup__content" 
      :style="{ minWidth: minWidth }"
    >
      <slot></slot>
      <button 
        v-show="isShowButton"
        @click="popupClose" 
        class="popup__button"
      >
        Close
      </button>
    </div>
  </div>
</div>
</template>

<script>

export default {
  props: {
    isPopupShow: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: String,
      default: '800px'
    },
    isShowButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    popupClose() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;

  &__active {
    opacity: 1;
    visibility: visible;
  }

  &__body {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;
  }

  &__content {
    background-color: #fff;
    color: black;
    padding: 30px;
    position: relative;
    border-radius: 10px;
  }

   &__button {
    position: absolute;
    right: 20px;
    bottom: 20px;
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
}
</style>