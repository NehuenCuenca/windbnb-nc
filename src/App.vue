

<template>
  <header>
    <i class="logo" @click="refreshPage">
      <img src="./assets/logos/logo.png" alt="">
    </i>

    <div class="filter-drawer">
      <button class="name-location" @click="openDrawer">Helsinki, Finland</button>
      <span class="guests">Add guests</span>
      <button class="search-btn">🔍</button>
    </div>

    <UpperDrawer 
      :visibility="drawerVisibility" 
      @change-drawer-visibility-to="closeDrawer"
      @filter-stays="applyFilter"
    />
  </header>

  <main>
    <div class="stays-section">
      <div class="header">
        <span class="title">Stays in Finland</span>
        <span class="total-stays">{{ actualStays.length }} stays</span>
      </div>

      <StaysGridList :actualStays="actualStays" />
    </div>
  </main>

  <footer>created by Nehuen - devChallenges.io</footer>
</template>

<script>
import { onMounted, ref } from 'vue';
import StaysGridList from './components/StaysGridList.vue';
import UpperDrawer from './components/UpperDrawer.vue';
import useStays from './composables/useStays';

export default {
  name: 'App',
  components: {
    StaysGridList,
    UpperDrawer
  },
  setup() {

    const drawerVisibility = ref(false);
    const actualStays = ref([]);

    const { getAllStays, getFilteredStays } = useStays()

    onMounted( async() => {
      actualStays.value = await getAllStays();
    })

    const applyFilter = async(filters) => { 
      actualStays.value = await getFilteredStays(filters)
    }


    return {
      drawerVisibility,
      openDrawer: () => { drawerVisibility.value = true },
      closeDrawer: () => { drawerVisibility.value = false },
      actualStays,
      applyFilter,
      refreshPage: () => window.location.reload()
    }
  }
}
</script>

<style>
header {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 5vh 5vw;
}

header .filter-drawer {
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 6px 0px #0000001A;
  border-radius: 16px;
  padding: 0 10px;
}

header .filter-drawer > * {
  padding: 10px;
}

.filter-drawer .name-location {
  font: 600 14px 'Mulish', sans-serif;
  color: var(--titleBlackStrong);
}

.filter-drawer .guests {
  font: 400 14px 'Mulish', sans-serif;
  color: var(--placeholderGrey);
  border-left: 1px solid #F2F2F2;
  border-right: 1px solid #F2F2F2;
}

.filter-drawer button {
  background-color: transparent;
  border: none;
}

.stays-section {
  width: 100%;
  padding: 5vh 5vw;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: auto;
  grid-template-areas:
    "header"
    "stays-list";
  gap: 4vh 2vw;
}

.stays-section .header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .title {
  font: 700 1.5rem 'Montserrat', sans-serif;
  color: var(--titleBlackStrong);
}

.header .total-stays {
  font: 400 14px 'Montserrat', sans-serif;
  color: var(--subtitleBlackSoft);
}

body:has(header .drawer.active) {
  overflow-y: hidden;
}


@media (max-width: 375px) {
  header {
    width: 100%;
    flex-wrap: wrap;
    gap: 6vh 0;
  }

  header .logo {
    width: 100%;
  }

  header .filter-drawer {
    width: 100%;
  }
}

</style>
