import MainMap from '../../components/main-map/main-map';
// import MapBoxMap from './components/main-map/mapbox-gl';
import { IconChevronRight, IconMenu2 } from '@tabler/icons';
import { AnimatePresence, motion } from 'framer-motion';
import randomColor from 'randomcolor';
import { useLayoutEffect } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RoutingApi } from '../../apis/routing-api';
import { MainMenuButton } from '../../assets/style/global-style';
import LocationMarker from '../../components/location-marker/location-marker';
import { selectAction, selectCenter, selectLocations, selectMarkers, setIsDirection, setLocations } from '../../store/mapSlice';
import LayerLineRoute from './component/map-direction/layer-line-route';
import MapDirection from './component/map-direction/map-direction';
import MapSearchBar from './component/map-search-bar';
import MapSearchResult from './component/map-search-bar/map-search-result';
import MapQuery from './map-query';
import { MapDirectionHeader, MapTopBox, MapTopContainer } from './map-style';
function Map() {
  const { search } = useLocation();
  const action = useSelector(selectAction);
  const dispatch = useDispatch();
  const selectedMarkers = useSelector(selectMarkers);
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
            color: randomColor(),
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
                {expand ? <IconChevronRight size={35} /> : <IconMenu2 size={40} />}
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
      <MainMap >
        <LayerLineRoute />
        {
          locations?.map((item, idx) => {
            if (item.location.hasOwnProperty("lat") && item.location.hasOwnProperty("lon")) {
              return (
                <Marker
                  key={idx}
                  draggable={!action.isMarkerLocked}
                  onDragEnd={(e) => handleMarkerDrag(e, idx)}
                  children={<LocationMarker title={item.location.display_name} color={item.color} />
                  }
                  anchor="bottom"
                  // onDrag={(e) => console.log(e)}
                  latitude={item.location?.lat} longitude={item.location?.lon} />
              )
            }
          })
        }
        {/* choose on map markers */}
        {
          (selectedMarkers.length > 0 && action.chooseOnMap) && selectedMarkers?.map((item, idx) => {
            if (item.location.hasOwnProperty("lat") && item.location.hasOwnProperty("lon")) {
              return (
                <Marker
                  key={idx}
                  draggable={!action.isMarkerLocked}
                  children={<LocationMarker title={item.location.display_name} />
                  }
                  anchor="bottom"
                  // onDrag={(e) => console.log(e)}
                  latitude={item.location?.lat} longitude={item.location?.lon} />
              )
            }
          })
        }


        {/* Default location marker */}
        {(!action.isDirection || action.isSetLocationByMarker) && <LocationMarker centerMode={true} isDrag={action.isDrag} />}



      </MainMap>
    </div>
  )
}

export default Map
