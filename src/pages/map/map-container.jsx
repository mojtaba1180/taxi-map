// import MapBoxMap from './components/main-map/mapbox-gl';

import { useLayoutEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RoutingApi } from '../../apis/routing-api';

import LocationMarker from '../../components/location-marker/location-marker';
import { selectAction, selectCenter, selectLocations, selectMarkers, setLocations } from '../../store/mapSlice';
import { Primary } from '../../utils/variables';
import LayerLineRoute from './component/map-direction/layer-line-route';

import MapQuery from './map-query';


const MapContainer = () => {

  const [openMarkerPopup, setOpenMarkerPopup] = useState(false)

  const { search } = useLocation();
  const action = useSelector(selectAction);
  const dispatch = useDispatch();
  const customMarker = useSelector(selectMarkers);
  const { locations } = useSelector(selectLocations);
  const center = useSelector(selectCenter);

  useLayoutEffect(() => {
    //handle query configs
    MapQuery({ search, dispatch, center });
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
    <>


      {/* Map Dep  */}
      {(action.isDirection) && (
        <>
          <LayerLineRoute />
          {
            locations?.map((item, idx) => {
              if (item?.location.hasOwnProperty("lat") && item?.location.hasOwnProperty("lon")) {
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



    </>
  )
}

export default MapContainer