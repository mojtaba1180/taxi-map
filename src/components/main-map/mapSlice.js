import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lng:51.39107607232779,
    lat:35.69608886407441,
    zoom: 14,
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
  },
 
 
});

export const { mapCenter, setDrag } = counterSlice.actions;


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

export default counterSlice.reducer;
