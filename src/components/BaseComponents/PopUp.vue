<template>
<div 
  :class="['popup', {'popup__active': isPopupShow}]"
  @click="clickOutside" 
>
  <div class="popup__body">
    <div 
      class="popup__content" 
      :style="{ minWidth: minWidth }"
    >
      <slot></slot>
      <Button
        class="popup__button"
        v-if="isShowButton"
        @click="popupClose" 
      >
        Закрыть
      </Button>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      body: null,
    }
  },
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
  watch: {
    isPopupShow() {
      if (this.isPopupShow) {
        return this.scrollBarHidden()
      }
      setTimeout(() => {
        this.scrollBarShow()
      }, 500);
    }
  },
  methods: {
    popupClose() {
      this.$emit('close')
    },
    clickOutside(event) {
      if(!event.target.closest('.popup__content')) {
        this.$emit('close')
      }
    },
    onKeyDown(event) {
      if (event.which === 27) {
        this.$emit('close')
      }
    },
    scrollBarHidden() {
      this.body.style.paddingRight = this.scrollBarWidth
      this.body.style.overflow = 'hidden';
    },
    scrollBarShow() {
      this.body.style.paddingRight = '0px'
      this.body.style.overflow = 'auto'
    }
  },
  computed: {
    scrollBarWidth() {
      return window.innerWidth - document.querySelector('#app').offsetWidth + 'px'
    }
  },
  mounted () {
    this.body = document.querySelector('body')
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.onKeyDown)
  }
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
  overflow-y: auto;
  overflow-x: hidden;
  transition: all .5s ease 0s;

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
    z-index: 20;
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
  }
}
</style>