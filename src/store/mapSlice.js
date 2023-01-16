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
    coordinates:[
        [51.39107607232779, 35.701107473830916],
        [51.37796705867436, 35.70065872711426],
        [51.37848204283205, 35.69689477820866],
    ],
    actions:{
      isDrag: false,
      isDirection: false,
      isSearch: false, // handle search open and close
      onSearch:false, // handle search loading 
    },
    search:{
      searchResult:[]
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
    addCoordinates: () => {
      
    },
    removeCoordinates: () => {
      
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
  setOnSearch
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

export default counterSlice.reducer;
