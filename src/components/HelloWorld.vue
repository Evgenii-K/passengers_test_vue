<template>
  <div class="wrapper">

    <transition-group name="fade" tag="div">
      <PassengerCard
        v-for="passenger in passengers"
        :key="passenger._id"
        :passenger="passenger"
        @deleteCard="showDeleteCardPopUp"
        @showAbout="showPopUp"
      />
    </transition-group>

    <div
      class="scroll"
      v-detect-viewport="{callback: this.getCurrentPage, detectHalf: true}"
    />

    <PopUp
      :isPopupShow="isPopupAirlineShow"
      minWidth="600px"
      @close="isPopupAirlineShow = false"
    >
      <AirlineInfo
        :aboutAirline="aboutAirline"
      />
    </PopUp>

    <PopUp
      :isPopupShow="isPopUpDeletePassShow"
      minWidth="300px"
      :isShowButton="false"
      @close="isPopUpDeletePassShow = false"
    >
      <DeleteForm
        @confirm="deleteCard"
        @cancel="isPopUpDeletePassShow = false"
      >
        <h4>Вы уверены что хотите удалить данные пассажира {{passengerName}}?</h4>
      </DeleteForm>
    </PopUp>

  </div>
</template>

<script>
import AirlineInfo from '@components/AirlineInfo.vue'
import PassengerCard from '@components/PassengerCard.vue'
import DeleteForm from '@components/DeleteForm.vue'

export default {
  name: 'HelloWorld',
  components: {
    AirlineInfo,
    PassengerCard,
    DeleteForm,
  },
  data() {
    return {
      passengers: [],
      currentPage: 0,
      isPopupAirlineShow: false,
      aboutAirline: {},
      passengerName: '',
      passengerId: null,
      isPopUpDeletePassShow: false,
    }
  },
  methods: {
    showPopUp(aboutAirline) {
      this.isPopupAirlineShow = true
      this.aboutAirline = aboutAirline
    },
    showDeleteCardPopUp(id) {
      this.passengerId = id
      this.passengerName = this.passengers.filter(item => item._id !== id)[0].name
      this.isPopUpDeletePassShow = true
    },
    deleteCard() {
      this.passengers = this.passengers.filter(item => item._id !== this.passengerId)
      this.isPopUpDeletePassShow = false
    },
    async getCurrentPage() {
      try {
        await this.blockingPromise
        await this.getPage(this.currentPage)
      } catch (error) {
        console.log(error)
      }
    },
    async getPage(page) {
      try {
        const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
        const {data} = await response.json()
        this.passengers = [...this.passengers, ...data]
        this.currentPage++
      } catch (error) {
        console.log(error)
      }
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
    this.blockingPromise = this.getPage(0)
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
  height: 128px;
  background: center center no-repeat url('../assets/dost-loader.svg');
}

.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
