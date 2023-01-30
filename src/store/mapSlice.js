import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    centerData:{
      lng:51.33801773402661,
      lat:35.699864699856676,
      zoom: 15,
      detail:{
        name:null,
        state:null,
      }
    },
    coordinates:[],
    actions:{
      isDrag: false,
      isDirection: false,
      isSearch: false, // handle search open and close
      onSearch:false, // handle search loading 
      isSetLocationByMarker: false,
      mobileSearch:false,
      showSearchBar:false,
      showDirection:true,
    },
    search:{
      searchResult:[]
    },
    locations:{
      inputIndexSelected: null,
      routedType: "car", // car , foot , bike
      locations:[
         {
            value: "",
            location: {}
        }
        ,
        {
            value: "",
            location: {}
        }
      ] 
    }
};


export const counterSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setDrag: (state,action) => {
      state.actions.isDrag = action.payload
    },
    setIsDirection: (state,action) => {
      state.actions.isDirection = action.payload
    },
    setIsSearch: (state,action) => {
      state.actions.isSearch = action.payload
    },
    setShowDirection: (state, action) => {
      state.actions.showDirection = action.payload
    },
    setShowSearchBar: (state, action) => {
      state.actions.showSearchBar = action.payload
    }, 
    setOnSearch: (state,action) => {
      state.actions.onSearch = action.payload
    },
    mapCenter: (state, action) => {
      state.centerData.lat = action.payload.lat;
      state.centerData.lng = action.payload.lng;
      state.centerData.zoom = action.payload.zoom
    },
    setSearchResult: (state, action) => {
      state.search.searchResult = action.payload
    },
    setInputIndexSelected: (state, action) => {
      state.locations.inputIndexSelected = action.payload
    },
    setLocations: (state, action) => {
      state.locations.locations = action.payload
    },
    setLocationsRoutedType : (state, action) =>{
      state.locations.routedType = action.payload
    },
    resetLocations: (state) => {
      state.locations.locations = {
      inputIndexSelected: null,
      locations:[
         {  
            value: "",
            location: {}
        }
        ,
        {
            value: "",
            location: {}
        }
      ] 
    }
    },
     addCoordinates: (state,action) => {
      state.coordinates = action.payload
    },
    removeCoordinates: (state) => {
     console.log( state.coordinates.pop())
    }
  },
 
 
});

export const { mapCenter,
  setDrag,
  addCoordinates,
  removeCoordinates,
  setIsDirection,
  setSearchResult,
  setIsSearch,
  setOnSearch,
  setInputIndexSelected,
  setLocations,
  resetLocations,
  setLocationsRoutedType,
  setShowDirection,
  setShowSearchBar
} = counterSlice.actions;


export const selectCenter = (state) => {
    return {
        lat:state.mapStore.centerData.lat,
        lng:state.mapStore.centerData.lng,
        zoom:state.mapStore.centerData.zoom,
    }
};
export const selectAction = (state) => {
  return {
    ...state.mapStore.actions
  }
}
export const selectCoordinates = (state) => {
    return state.mapStore.coordinates
}
export const selectSearchResult = (state) => {
    return state.mapStore.search.searchResult
}
export const selectLocations = (state) => {
  return state.mapStore.locations
}
export const LocationsReady = async (state) => {
    let arr = []
        await state.mapStore.locations.locations.some(v => {
            arr.push(Object.keys(v.location).some(key => key === "lon"))
    })
    // console.log(arr.every(Boolean));
    return arr.every(Boolean)
}
export default counterSlice.reducer;
