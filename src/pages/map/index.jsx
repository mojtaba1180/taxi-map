import { IconChevronRight, IconMenu2, IconSearch } from '@tabler/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { MainMenuButton } from '../../assets/style/global-style';
import MainMap from '../../components/main-map/main-map';
import { selectAction, setIsDirection, setSearchBarCollapsed } from '../../store/mapSlice';
import MapDirection from './component/map-direction/map-direction';
import MapSearchBar from './component/map-search-bar';
import MapSearchResult from './component/map-search-bar/map-search-result';
import MapContainer from './map-container';
import { MapDirectionHeader, MapTopBox, MapTopContainer } from './map-style';
function Map() {

  const action = useSelector(selectAction);
  const dispatch = useDispatch();


  return (
    <>
      {
        action.showSearchBar &&
        <MapTopContainer>
          <MapTopBox expand={action.isDirection} collapsed={action.isSearchBarCollapsed}   >
            <div className='mapbox-row' >
              <MainMenuButton onClick={() => {
                if (action.isSearchBarCollapsed) {
                  dispatch(setSearchBarCollapsed(false))
                } else if (action.isDirection) {
                  dispatch(setIsDirection(false));
                } else {
                  dispatch(setSearchBarCollapsed(true))
                }
              }} >
                {action.isSearchBarCollapsed ? <IconSearch /> : action.isDirection ? <IconChevronRight size={35} /> : <IconMenu2 size={40} />}
              </MainMenuButton>

              {/* framer motion */}

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
                  {
                    !action.isSearchBarCollapsed &&
                    (
                      <>
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
                      </>
                    )
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

      <MainMap>
        <MapContainer />
      </MainMap>
    </>
  )
}

export default Map
