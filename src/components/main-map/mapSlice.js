import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lng:51.39107607232779,
    lat:35.69608886407441,
    zoom: 14,
    coordinates:[
        [51.39107607232779, 35.701107473830916],
        [51.37796705867436, 35.70065872711426],
        [51.37848204283205, 35.69689477820866],
    ],
    actions:{
      isDrag: false
    }
};


export const counterSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setDrag: (state,action) => {
      state.actions.isDrag = action.payload
    },
    mapCenter: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.zoom = action.payload.zoom
    },
    addCoordinates: () => {
      
    },
    removeCoordinates: () => {
      
    }
  },
 
 
});

export const { mapCenter, setDrag, addCoordinates, removeCoordinates} = counterSlice.actions;


export const selectCenter = (state) => {
    return {
        lat:state.mapStore.lat,
        lng:state.mapStore.lng,
        zoom:state.mapStore.zoom,
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

export default counterSlice.reducer;
