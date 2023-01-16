import { useMap } from 'react-map-gl';
import MainMap from '../../components/main-map/main-map';
// import MapBoxMap from './components/main-map/mapbox-gl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainMenuButton } from '../../assets/style/global-style';
import MapSearchBar from '../../components/map-search-bar';
import { selectAction, setIsDirection, setIsSearch } from '../../store/mapSlice';
import MapSearchResult from './../../components/map-search-bar/map-search-result';
import { MapTopBox, MapTopContainer } from './map-style';
function Map() {
  const action = useSelector(selectAction);
  const dispatch = useDispatch();
  const { usemap } = useMap();
  const [onSearch, setOnSearch] = useState(false)
  const handleGo = () => {
    // usemap.flyTo({ center: [51.420175149565466, 35.700956782132934] })
    console.log(usemap.getCenter())

  }
  const expand = action.isDirection || action.isSearch;

  return (
    <div >
      <MapTopContainer>
        <MapTopBox expand={expand}  >
          <div className='mapbox-row' >
            <MainMenuButton onClick={() => {
              if (expand) {
                dispatch(setIsDirection(false));
                dispatch(setIsSearch(false));
              } else {
                handleGo()
              }
            }} >
              {
                expand ?
                  (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>

                  ) :
                  (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  )
              }
            </MainMenuButton>
            <MapSearchBar />
          </div>
          <MapSearchResult />

        </MapTopBox>
      </MapTopContainer>
      <MainMap />
    </div>
  )
}

export default Map
