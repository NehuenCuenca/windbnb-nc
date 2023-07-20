<template>
  <ul class="stays-grid-list">
    <StayGridItem v-if="actualStays.length > 0" v-for="(stay, stayIndex) in actualStays" :key="stayIndex" :stayInfo="stay" />
    <li id="msg-no-found" v-else>NO STAYS FOUND 😬</li>
  </ul>

</template>

<script>
import StayGridItem from './StayGridItem.vue';

export default {
  name: 'StaysGridList',

  props: {
    'actualStays': {
      type: Array,
      default: []
    }
  },

  components: { StayGridItem }
}
</script>

<style>
.stays-section ul.stays-grid-list {
  grid-area: stays-list;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: auto;
  justify-items: center;
  gap: 5vh 0;
}

.stays-grid-list #msg-no-found {
  font: 700 1.25rem 'Mulish', sans-serif;
  color: #eb5757;
  text-decoration: underline;
  text-underline-offset: 6px;
  place-self: center;
}


@media (max-width: 375px) {
  .stays-section ul.stays-grid-list {
    grid-template-columns: 1fr ;
    grid-auto-rows: auto;
    gap: 5vh 0;
  }
}
</style>