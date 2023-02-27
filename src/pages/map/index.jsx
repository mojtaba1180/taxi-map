import MainMap from '../../components/main-map/main-map';
// import MapBoxMap from './components/main-map/mapbox-gl';
import { IconChevronRight, IconMenu2, IconSearch } from '@tabler/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RoutingApi } from '../../apis/routing-api';
import { MainMenuButton } from '../../assets/style/global-style';
import LocationMarker from '../../components/location-marker/location-marker';
import { selectAction, selectCenter, selectLocations, selectMarkers, setIsDirection, setLocations, setSearchBarCollapsed } from '../../store/mapSlice';
import { Primary } from '../../utils/variables';
import LayerLineRoute from './component/map-direction/layer-line-route';
import MapDirection from './component/map-direction/map-direction';
import MapSearchBar from './component/map-search-bar';
import MapSearchResult from './component/map-search-bar/map-search-result';
import MapQuery from './map-query';
import { MapDirectionHeader, MapTopBox, MapTopContainer } from './map-style';
function Map() {

  const [openMarkerPopup, setOpenMarkerPopup] = useState(false)


  const { search } = useLocation();
  const action = useSelector(selectAction);
  const dispatch = useDispatch();
  const customMarker = useSelector(selectMarkers);
  const { locations } = useSelector(selectLocations);
  const center = useSelector(selectCenter);

  useLayoutEffect(() => {
    //handle query configs
    MapQuery({ search, dispatch });
  }, [])

  // set actions on map
  const handleMarkerDrag = async (event, idx) => {
    const lng = event.lngLat.lng;
    const lat = event.lngLat.lat;
    const zoom = parseInt(center.zoom);
    const { res, err } = await RoutingApi.getLocation({
      lat: lat,
      lon: lng,
      zoom
    });
    if (err) return;
    let arr = [...locations];
    const handleUpdateLocation = () => {
      return arr.map((item, index) => {
        if (index === idx) {
          return {
            ...item,
            value: res.display_name,
            location: {
              ...res,
              lat,
              lon: lng
            }
          }
        } else {
          return item
        }
      })
    }
    dispatch(setLocations(handleUpdateLocation()));
  }


  return (
    <div >
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
      <MainMap >
        {(action.isDirection) && (
          <>
            <LayerLineRoute />
            {
              locations?.map((item, idx) => {
                if (item.location.hasOwnProperty("lat") && item.location.hasOwnProperty("lon")) {
                  console.log(item.drag)
                  return (
                    <Marker
                      key={idx}
                      draggable={item.drag !== null ? item.drag : !action.isMarkerLocked}
                      onDragEnd={(e) => handleMarkerDrag(e, idx)}
                      onClick={() => setOpenMarkerPopup(idx)}
                      children={<LocationMarker title={item.value} currentPopupOpen={openMarkerPopup} index={idx} color={idx === locations.length - 1 ? "#0f9500" : Primary} />
                      }
                      anchor="bottom"
                      // onDrag={(e) => console.log(e)}
                      latitude={item.location?.lat} longitude={item.location?.lon} />
                  )
                }
              })
            }

          </>
        )
        }

        {
          (customMarker.length > 0 && !action.isDirection) && customMarker?.map((item, idx) => {
            if (item.location.hasOwnProperty("lat") && item.location.hasOwnProperty("lon")) {
              return (
                <Marker
                  key={idx}
                  draggable={!action.isMarkerLocked}
                  children={<LocationMarker title={item.value} popup={true}

                  />
                  }
                  anchor="bottom"
                  // onDrag={(e) => console.log(e)}
                  latitude={item.location?.lat} longitude={item.location?.lon} />
              )
            }
          })
        }

        {/* Default location marker */}
        {(!action.isDirection && customMarker.length <= 0) && <LocationMarker centerMode={true} popup={false} isDrag={action.isDrag} />}



      </MainMap>
    </div>
  )
}

export default Map
