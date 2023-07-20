<template>
  <li class="stay-grid-item">
    <img :src="stayInfo.photo" :alt="stayInfo.title">
    <div class="info-stay">
      <span class="tag-super-host" v-if="stayInfo.superHost">Super host</span>
      <span class="type-stay">{{ stayInfo.type }}. {{ stayInfo.beds ? stayInfo.beds : 'NO' }} beds </span>
      <span class="stars-rating">⭐ {{ stayInfo.rating }}</span>
      <p class="title-stay">{{ stayInfo.title }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'StayGridItem',
  props: {
    stayInfo: { type: Object, }
  },
  setup() {


    return {}
  }
}
</script>

<style>
.stays-grid-list .stay-grid-item {
  display: grid;
  width: 90%;
  gap: 2vh 0;
}

.stay-grid-item img {
  width: 100%;
  height: 50vh;
  object-fit: cover;
  border-radius: 24px;
  place-self: center;
}

.stay-grid-item .info-stay {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.info-stay .tag-super-host {
  border: 1px solid var(--subtitleBlackSoft);
  border-radius: 12px;
  padding: 5px;
  font: 700 12px 'Montserrat', sans-serif;
  text-transform: uppercase;
  color: var(--subtitleBlackSoft);
}

.info-stay .type-stay {
  font: 500 14px 'Montserrat', sans-serif;
  color: var(--contentGreySoft)
}

.info-stay .stars-rating {
  font: 500 14px 'Montserrat', sans-serif;
  color: var(--subtitleBlackSoft)
}

.info-stay .title-stay {
  width: 100%;
  font: 600 1rem 'Montserrat', sans-serif;
  color: var(--titleBlackStrong);
}

@media (max-width: 375px) {
  .stay-grid-item {
    width: 100%;
  }
}


</style>