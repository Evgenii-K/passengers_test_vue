<template>
  <div class="wrapper">

    <transition-group name="fade" tag="div">
      <div 
        v-for="passenger in passengers"
        :key="passenger._id"
        class="card"
      >
        <div class="card__person">
          <div class="card__title">{{passenger.name ? passenger.name : 'No name'}}</div>
          <div class="card__content">Trips: {{passenger.trips ? passenger.trips : '___'}}</div>

          <button 
            @click="deleteItem(passenger._id)"
            class="card__button"
          >
            Удалить
          </button>
        </div>
        <div class="card__airlines">
          <div class="card__title">Airline: {{passenger.airline[0].name}}</div>
          <img alt="Airline Logo" :src="passenger.airline[0].logo" class="card__airlines-image"/>
          <button 
            @click="showPopUp(passenger.airline[0])"
            class="card__button"  
          >
            Подробнее
          </button>
        </div>
      </div>
    </transition-group>

    <div
      class="scroll"
      v-detect-viewport="{callback: this.getData}"
    />

    <PopUp
      :isPopupShow="isPopupShow"
      minWidth="600px"
      @close="isPopupShow = false"
    >
      <AirlineInfo
        :aboutAirline="aboutAirline"
      />
    </PopUp>

  </div>
</template>

<script>
import PopUp from './PopUp.vue'
import AirlineInfo from './AirlineInfo.vue'

export default {
  name: 'HelloWorld',
  components: {
    PopUp,
    AirlineInfo,
  },
  data() {
    return {
      passengers: [],
      currentPage: 0,
      isPopupShow: false,
      aboutAirline: {}
    }
  },
  methods: {
    showPopUp(aboutAirline) {
      this.isPopupShow = true
      this.aboutAirline = aboutAirline
    },
    deleteItem(id) {
      this.passengers = this.passengers.filter(item => item._id !== id)
    },
    async getFirstPage() {
      try {
        const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=0&size=10`)

        const passengersData = await response.json()
        
        if(!passengersData.data) return console.log('Нет данных')

        this.passengers = passengersData.data

        this.currentPage++
        
      } catch (error) {
        console.log(error)
      }
    },
    async getData() {
      try {
        await this.blockingPromise

        const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${this.currentPage}&size=10`)

        const {data} = await response.json()
        
        if(!data) return console.log('Нет данных')

        this.passengers = [...this.passengers, ...data]
        
        this.currentPage++

        console.log(this.passengers)
      } catch (error) {
        console.log(error)
      }
    },
    async init() {
      return this.blockingPromise = this.getFirstPage()
    },
    setPostsObserver() {
      /* создаём наблюдение */
      const postsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => { /* для каждого элемента */
          if (entry.isIntersecting) { /* если элемент в видимой области браузера */
            entry.target.classList.add('post_active') /* добавляем активный класс наблюдаемому элементу, то есть карточки */
            observer.unobserve(entry.target); /* и отключаем наблюдение за этим постом */
          }
        })
      });

      this.$el.querySelectorAll('.card:not(.post_active)').forEach(post => { /* получаем только неактивные карточки */
        postsObserver.observe(post) /* указываем, что наблюдаем за ними */
      })
    },
  },
  created() {
    this.init()
  },
  updated() {
    this.setPostsObserver()
    if (this.currentPage === 3) {
      const cards = this.$el.querySelectorAll('.card')
      for(let key = 0; key < 10; key++) {
        cards[key].classList.add('post_active')
      }
    }
  }
}
</script>

<style scoped lang="scss">

.scroll {
  width: 100%;
  height: 32px;
  background: center center no-repeat url('../assets/dost-loader.svg');
}

.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  background: #4e567d;
  width: 800px;
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

  &__content {

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

.post_active {
  transform: translateY(0px) scale(1);
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(48px) scale(0.9);
}

.fade-leave-active {
  position: absolute;
}

</style>
