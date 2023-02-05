import MainMap from '../../components/main-map/main-map';
// import MapBoxMap from './components/main-map/mapbox-gl';
import { IconChevronRight, IconMenu2 } from '@tabler/icons';
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
  
  // const { usemap } = useMap();
  // const handleGo = () => {
  //     console.log(usemap.getCenter())
  // }
  
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
                {expand ?<IconChevronRight size={35} />:<IconMenu2 size={40} />}
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
