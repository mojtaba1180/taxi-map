import { List, ThemeIcon } from '@mantine/core';
import { IconCurrentLocation } from '@tabler/icons';
import { useMap } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { selectAction, selectSearchResult, setLocations, setSearchResult } from '../../store/mapSlice';
import { selectLocations } from './../../store/mapSlice';
import './map-search-result-style.css';
const MapSearchResult = () => {
  const { usemap } = useMap();
  const searchResult = useSelector(selectSearchResult);
  const locationsSelector = useSelector(selectLocations);
  const action = useSelector(selectAction)
  const dispatch = useDispatch();

  const handleSetLocation = (loc, item, index) => {
    let arr = [...loc]
    if (index !== null && !action.isDrag) {
      return arr.map((i, idx) => {
        if (idx === index) {
          return {
            value: item.display_name,
            location: item
          }
        } else {
          return i
        }
      })
    }
  }




  const handleCLickItem = (item) => {
    const { lon, lat } = item;
    dispatch(setSearchResult([]))
    if (action.isDirection) {
      dispatch(setLocations(
        handleSetLocation(locationsSelector.locations, item, locationsSelector.inputIndexSelected)
      ))
    }
    usemap.flyTo({ center: [lon, lat] })
  }


  if (searchResult.length === 0) {
    return (
      <>
      </>
    )
  }
  return (

    <div className='map-search-result-container'
      style={{
        width: "96%",
        height: "15em"
      }}>
      <List
        spacing="xs"
        size="sm"
        center
        className="map-search-result-item"
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCurrentLocation size={16} />
          </ThemeIcon>
        }
      >
        {
          searchResult.map(item => {
            return (
              <List.Item
                key={item.place_id}
                onClick={() => {
                  handleCLickItem(item)
                }}

              >{item.address.amenity}  {item.address.tourism} {item.address.neighbourhood}  {item.address.road}  {item.address.state}  {item.address.suburb}</List.Item>
            )
          })
        }
        {/* <p style={{paddingTop:"40px"}} ></p> */}
      </List>
    </div>
  )
}

export default MapSearchResult