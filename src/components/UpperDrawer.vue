<template>
    <div class="drawer" @click="clickShadowDrawer" ref="drawer">
        <form @submit.prevent class="grid-progress-locations-form" :class="isOnMobileMediumMQ ? 'mobile' : ''">

            <div class="progress-section" id="location" ref="locationSection"
                @click="setActiveHeaderSection(locationSection)">
                <div class="header-progress active">
                    <span class="title-section">Location</span>
                    <span class="name-location">{{ selectedLocation }}</span>
                </div>
                <ul class="locations-list">
                    <template v-for="([country, cities], indexStay) in Object.entries(allLocations)" :key="indexStay">
                        <li class="location-item" v-for="(city, cityIndex) in cities" :key="cityIndex">
                            <button @click="() => selectedLocation = `${city}, ${country}`">{{ city }}, {{ country }}</button>
                        </li>
                    </template>
                </ul>
            </div>

            <div class="progress-section" id="guests" ref="guestsSection" @click="setActiveHeaderSection(guestsSection)">
                <div class="header-progress">
                    <span class="title-section">Guests</span>
                    <span class="name-location">{{ selectedGuests.total }} guests</span>
                </div>
                <div class="content">
                    <div class="type-age-guests">
                        <span class="type">Adult</span>
                        <span class="type-aclaration">Ages 13 or above</span>
                        <div class="guests-quantity">
                            <button @click="doOperationByTypeGuest('adults', 'rest')">-</button>
                            <span>{{ selectedGuests.adults }}</span>
                            <button @click="doOperationByTypeGuest('adults', 'sum')">+</button>
                        </div>
                    </div>
                    <div class="type-age-guests">
                        <span class="type">Children</span>
                        <span class="type-aclaration">Ages 2-12</span>
                        <div class="guests-quantity">
                            <button @click="doOperationByTypeGuest('childrens', 'rest')">-</button>
                            <span>{{ selectedGuests.childrens }}</span>
                            <button @click="doOperationByTypeGuest('childrens', 'sum')">+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="progress-section" id="btn-submit">
                <div class="header-progress">
                    <button type="submit" @click="searchStays">🔍 Search</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import useStays from '../composables/useStays'

import { onMounted, ref, toRef, watch } from 'vue'

export default {
    name: 'UpperDrawer',

    props: {
        'visibility': {
            type: Boolean,
            required: true,
        }
    },

    emits: ['change-drawer-visibility-to', 'filter-stays'],

    setup(props, { emit }) {
        const isOnMobileMediumMQ = ref(window.matchMedia('(max-width: 375px)').matches)

        const drawer = ref(null);
        const isDrawerOpen = toRef(props, 'visibility');

        watch(isDrawerOpen, () => { toggleDrawer() });

        const toggleDrawer = () => { drawer.value.classList.toggle('active') }
        const closeDrawer = () => { emit('change-drawer-visibility-to', false) }

        const clickShadowDrawer = (e) => {
            if (e.target != drawer.value) { return }
            closeDrawer();
        }

        const locationSection = ref(null);
        const guestsSection = ref(null);

        const setActiveHeaderSection = (sectionSelected) => {
            const previousActiveSection = drawer.value.querySelector('form').querySelector('.progress-section:has(.header-progress.active)');
            if (sectionSelected === previousActiveSection) return
            if (previousActiveSection) { previousActiveSection.querySelector('.header-progress.active').classList.remove('active') }
            sectionSelected.querySelector('.progress-section .header-progress').classList.add('active')
        }


        const allStays = ref([]);
        const allLocations = ref([]);
        const { getAllStays, getAllLocations } = useStays();

        onMounted(async () => {
            allStays.value = await getAllStays();
            allLocations.value = await getAllLocations()
        })


        const selectedLocation = ref('No selected :(')
        const selectedGuests = ref({ adults: 0, childrens: 0, total: 0 })

        const doOperationByTypeGuest = (type, operation) => {
            if (selectedGuests.value[type] === 0 && operation === 'rest') return
            (operation === 'sum' && selectedGuests.value[type] >= 0)
                ? selectedGuests.value[type]++
                : selectedGuests.value[type]--;

            selectedGuests.value.total = selectedGuests.value.adults + selectedGuests.value.childrens
        }

        const searchStays = (e) => {
            const filtersStays = {
                location: selectedLocation.value,
                guests: selectedGuests.value.total
            }

            const { location, guests } = filtersStays

            if (location === 'No selected :(' || guests === 0) {
                return alert('Error: location is not selected or guests section is no fullfiled')
            }

            emit('filter-stays', filtersStays)
            closeDrawer()
        }

        return {
            isOnMobileMediumMQ,

            drawer,
            isDrawerOpen,
            closeDrawer,
            clickShadowDrawer,

            locationSection,
            guestsSection,
            setActiveHeaderSection,

            allStays,
            allLocations,
            selectedLocation,
            selectedGuests,
            doOperationByTypeGuest,
            searchStays
        }
    }
}
</script>

<style>
header .drawer {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    opacity: 0;
    transition: opacity .4s ease;
}

.drawer.active {
    pointer-events: all;
    background-color: rgba(51, 51, 51, 0.454);
    opacity: 1;
}

.drawer .grid-progress-locations-form {
    background-color: #FFFFFF;
    width: 100%;
    height: 50vh;
    padding: 5vh 5vw;
    display: grid;
    grid-template-columns: 1fr 1fr 20%;
    grid-auto-rows: auto;
}

/* .grid-progress-locations-form .progress-section .header-progress {} */

.grid-progress-locations-form .progress-section .header-progress {
    font-family: 'Mulish', sans-serif;
    color: var(--titleBlackStrong);
    padding: .5rem 1rem;
    box-shadow: 0px 1px 6px 0px #0000001A;
    border-radius: 16px;
    min-height: 8vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    transition: border .4s ease;
}

.header-progress { border: 1px solid transparent; }
.header-progress.active { border-color: #333333; }

.header-progress .title-section {
    font-size: 12px;
    font-weight: 800;
}

.header-progress .name-section {
    font-size: 16px;
    font-weight: 400;
}

.progress-section#location ul.locations-list {
    padding: 3vh 3vw;
    overflow: auto;
    max-height: 30vh;
    display: flex;
    flex-direction: column;
    gap: 2vh 0;
}

/* .locations-list li.location-item {} */

li.location-item button {
    background-color: transparent;
    padding: 0;
    border: 0;
    font: 400 1rem 'Mulish', sans-serif;
    color: var(--subtitleBlackSoft);
}

li.location-item::marker {
    content: '📍  ';
    font-size: 1.2rem;
}



/* .grid-progress-locations-form .progress-section #guests {} */

#guests .content {
    padding: 2vh 1vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5vh 0;
}

#guests .content .type-age-guests {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1vh 0;
}

.type-age-guests .type {
    font: 700 14px 'Mulish', sans-serif;
    color: var(--titleBlackStrong)
}
.type-age-guests .type-aclaration {
    font: 400 14px 'Mulish', sans-serif;
    color: var(--placeholderGrey)
}

.content .type-age-guests .guests-quantity {
    display: flex;
    gap: 0 1vw;
}

.guests-quantity span { font-weight: 600; }
.guests-quantity button {
    border: 1px solid #828282;
    border-radius: 4px;
    background-color: transparent;
}

.progress-section#btn-submit .header-progress button {
    color: #F2F2F2;
    font: 700 1rem 'Mulish', sans-serif;
    padding: 8px 15px;
    border-radius: 16px;
    background-color: #EB5757;
    box-shadow: 0px 1px 6px 0px #0000001A;
    outline: none;
    border: none;
}


@media (max-width: 375px) {

    .drawer .grid-progress-locations-form {
        height: 93vh;
        grid-template-columns: 90%;
        grid-auto-rows: auto;
        gap: 1vh 0;
    }

    .progress-section#location ul.locations-list {
        padding: 3vh 3vw;
        max-height: 20vh;
        gap: 2vh 0;
    }

    .content .type-age-guests .guests-quantity{
        gap: 0 5vw;
    }
}
</style>