import qs from 'qs';
const MapOrderQuery = ({ search, dispatch }) => {

    const query = qs.parse(search.split("?")[1]);
    return query;
}

export default MapOrderQuery