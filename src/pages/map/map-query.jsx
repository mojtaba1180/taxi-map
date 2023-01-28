import qs from 'qs';
import { setShowDirection, setShowSearchBar } from '../../store/mapSlice';
const MapQuery = ({search, dispatch}) => {
const query = qs.parse(search.split("?")[1]);
    const parse = (q) => JSON.parse(q)
    if(query.showDirection) dispatch(setShowDirection(parse(query.showDirection)));
    if(query.showSearchBar) dispatch(setShowSearchBar(parse(query.showSearchBar)));


}

export default MapQuery