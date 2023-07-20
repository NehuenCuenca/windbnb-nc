import { ref } from "vue";

const useStays = () => {

  const getAllStays = async () => {
    try {
      const { origin } = new URL(window.location.href)
      console.log(origin);
      const resp  = await fetch(`${origin}/src/database/stays.json`);
      const stays = await resp.json();
      return [...stays];
    } catch (error) {
      console.error("EXPLOTO ESTO --->: ", error);
    }
  };

  const getFilteredStays = async ({ location, guests }) => { 
    const stays = await getAllStays()

    return stays.filter( stay => { 
      const [ city, country ] = location.split(', ')
      if( (stay.city === city && stay.country === country) && guests <= stay.maxGuests ){ return stay }
    })
  }

  const getAllLocations = async() => {
    const allStays = await getAllStays()

    const allLocations = allStays.reduce( (acumLocations, stay) => {
      if( !acumLocations[stay.country] ){
        return { ...acumLocations, [stay.country]: [ stay.city] }
      }

      acumLocations[stay.country] = [...new Set([...acumLocations[stay.country], stay.city])]
      return acumLocations
    }, {}) 

    return allLocations
  }
  
  return {
    getAllStays,
    getAllLocations,
    getFilteredStays
  };
};

export default useStays;
