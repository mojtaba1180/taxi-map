import { List, ThemeIcon } from '@mantine/core';
import { IconCurrentLocation } from '@tabler/icons';
import { useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { selectSearchResult } from '../../store/mapSlice';
import './map-search-result-style.css';
const MapSearchResult = () => {
   const { usemap } = useMap();
  const searchResult = useSelector(selectSearchResult);
    const handleGoLocationCenter = (lng,lat) => {
    usemap.flyTo({ center: [lat, lng] })
  }
  
  
  
  
  if(searchResult.length === 0){
    return (
      <></>
    )
  }
  return (
    
    <div style={{width:"100%",height:"100%"}}>
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
             onClick={()=> {
              handleGoLocationCenter(item.lat, item.lon)
             }}
             
             >{item.address.amenity}  {item.address.tourism} {item.address.neighbourhood}  {item.address.road}  {item.address.state}  {item.address.suburb}</List.Item>
          )
        })
      }
     <p style={{paddingTop:"40px"}} ></p>
    </List>
    </div>
  )
}

export default MapSearchResult