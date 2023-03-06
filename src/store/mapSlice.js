import { createSlice } from '@reduxjs/toolkit';

const centerEnv = import.meta.env.VITE_DEFAULT_CENTER

const initialState = {
  centerData: {
    lng: centerEnv ? centerEnv.split(",")[1] : 51.33801773402661,
    lat: centerEnv ? centerEnv.split(",")[0] : 35.699864699856676,
    zoom: 11,
    detail: {
      name: null,
      state: null,
    }
  },
  coordinates: [],
  actions: {
    isDrag: false,
    isDirection: false,
    isSearch: false, // handle search open and close
    onSearch: false, // handle search loading 
    isSetLocationByMarker: false,
    mobileSearch: false,
    showSearchBar: true,
    showDirection: true,
    isMarkerLocked: false,
    isSearchBarCollapsed: false,
    chooseOnMap: false
  },
  search: {
    searchResult: []
  },
  locations: {
    inputIndexSelected: null,
    routedType: "car", // car , foot , bike
    locations: [
      {
        value: "",
        drag:true,
        location: {},
        color: ""
      }
      ,
      {
        value: "",
        drag:true,
        location: {},
        color: ""
      }
    ]
  },
  markers: [],
  mapLastRequest:{ // updated in  any request from routing-api
    lastLocation:null,
    lastDirection:null
  }
};


export const counterSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setActions: (state, action) => {
      state.actions = {
        ...state.actions,
        [Object.keys(action.payload)[0]]:Object.values(action.payload)[0]
      }
    },
    setDrag: (state, action) => {
      state.actions.isDrag = action.payload
    },
    setIsDirection: (state, action) => {
      state.actions.isDirection = action.payload
    },
    setIsSearch: (state, action) => {
      state.actions.isSearch = action.payload
    },
    setShowDirection: (state, action) => {
      state.actions.showDirection = action.payload
    },
    setShowSearchBar: (state, action) => {
      state.actions.showSearchBar = action.payload
    },
    setOnSearch: (state, action) => {
      state.actions.onSearch = action.payload
    },
    mapCenter: (state, action) => {
      state.centerData.lat = action.payload.lat ? action.payload.lat : state.centerData.lat;
      state.centerData.lng = action.payload.lng ? action.payload.lng : state.centerData.lng;
      state.centerData.zoom = action.payload.zoom ? action.payload.zoom : state.centerData.zoom
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
    setLocationsRoutedType: (state, action) => {
      state.locations.routedType = action.payload
    },
    resetLocations: (state) => {
      state.locations.locations = {
        inputIndexSelected: null,
        locations: [
          {
            value: "",
            location: {},
            color: ""
          }
          ,
          {
            value: "",
            location: {},
            color: ""
          }
        ]
      }
    },
    addCoordinates: (state, action) => {
      state.coordinates = action.payload
    },
    removeCoordinates: (state) => {
      console.log(state.coordinates.pop())
    },
    setMarkers: (state, action) => {
      state.markers = action.payload
    },
    setMarkerLocked: (state, action) => {
      state.actions.isMarkerLocked = action.payload
    },
    setSearchBarCollapsed: (state, action) => {
      state.actions.isSearchBarCollapsed = action.payload
    },
    setLastLocation: (state, action) => { // set res last location after request api 
      state.mapLastRequest.lastLocation = action.payload
    },
    setLastDirection: (state,action) => {  // set res last direction after request api 
      state.mapLastRequest.lastDirection = action.payload
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
  setShowSearchBar,
  setMarkers,
  setMarkerLocked,
  setSearchBarCollapsed,
  setActions,
  setLastLocation,
  setLastDirection
} = counterSlice.actions;


export const selectCenter = (state) => {
  return {
    lat: state.mapStore.centerData.lat,
    lng: state.mapStore.centerData.lng,
    zoom: state.mapStore.centerData.zoom,
  }
};
export const selectAction = (state) => {
  return {
    ...state.mapStore.actions
  }
}
export const selectCoordinates = (state) => state.mapStore.coordinates

export const selectSearchResult = (state) => state.mapStore.search.searchResult

export const selectLocations = (state) => state.mapStore.locations

export const selectMarkers = (state) => state.mapStore.markers

export const selectMapLastRequest = (state) => state.mapStore.mapLastRequest

export default counterSlice.reducer;
