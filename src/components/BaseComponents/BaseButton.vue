<template>
  <button 
    :class="[{button__notPrimary: notPrimary}, 'button']"
    v-on="listeners"
    :active="isActive"
    :disabled="isDisable"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        click: this.onClick
      }
    }
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    notPrimary: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    }
  }
};
</script>

<style lang="scss" scoped>

.button {
  background-color: #ff6a5e;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  cursor: pointer;
  transition: 0.2s ease-in;
  text-align: center;
  max-width: max-content;
  flex-shrink: 0;
  box-sizing: border-box;
  border: 2px solid #ff6a5e;

  &__notPrimary {
    background-color: white;
    color: #ff6a5e;

    &:hover {
      color: white;
    }
  }

  &:hover {
    background-color: #ff4f43;
    border: 2px solid #ff4f43;
  }

  &:active {
    background-color: #fc847b;
    box-shadow: 0 0 5px 0 rgba(0, 91, 255, 0.5);
  }

  &:disabled {
    background-color: #9b605c;
  }


}
</style>
