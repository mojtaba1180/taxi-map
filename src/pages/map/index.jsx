import { useMap } from 'react-map-gl';
import MainMap from '../../components/main-map/main-map';
// import MapBoxMap from './components/main-map/mapbox-gl';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MainMenuButton } from '../../assets/style/global-style';
import MapDirection from '../../components/map-direction/map-direction';
import MapSearchBar from '../../components/map-search-bar';
import { selectAction, setIsDirection } from '../../store/mapSlice';
import MapSearchResult from './../../components/map-search-bar/map-search-result';
import MapQuery from './map-query';
import { MapDirectionHeader, MapTopBox, MapTopContainer } from './map-style';
function Map() {
  const {search} = useLocation();
  const action = useSelector(selectAction);
  const dispatch = useDispatch();
  
  const { usemap } = useMap();
  const handleGo = () => {
    // usemap.flyTo({ center: [51.420175149565466, 35.700956782132934] })
    console.log(usemap.getCenter())

  }
  useLayoutEffect(() => {
    //handle query configs
    MapQuery({search, dispatch });
  },[])

  
  const expand = action.isDirection;

  return (
    <div >
      {
        action.showSearchBar &&  
        <MapTopContainer>
          <MapTopBox expand={expand}  >
            <div className='mapbox-row' >
              <MainMenuButton onClick={() => {
                if (expand) {
                  if (action.isDirection) {
                    dispatch(setIsDirection(false));
                  }
                  // dispatch(setIsSearch(false));
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
              <AnimatePresence mode='wait'>
                <motion.div
                  key={action.isDirection ? 1 : 2}
                  style={{ width: "100%" }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{
                    duration: 0.1
                  }}
                >
                  { // handle show on active direction
                    !action.isDirection ?
                      <MapSearchBar showDirection={action.showDirection} />
                      :
                      <MapDirectionHeader>
                        <p>
                          مسیر یاب
                        </p>
                      </MapDirectionHeader>


                  }
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>

              <AnimatePresence mode='wait'>

                <motion.div
                  key={action.isDirection ? 1 : 2}
                  style={{ width: "100%" }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{
                    duration: .1
                  }}
                >

                  {/* ANCHOR direction */}
                  {
                    action.isDirection ?
                      <MapDirection />
                      : null
                  }

                </motion.div>
              </AnimatePresence>
              {/*ANCHOR search result  */}

            </div>
            <MapSearchResult />
          </MapTopBox>
        </MapTopContainer>
      }
      <MainMap />
    </div>
  )
}

export default Map
