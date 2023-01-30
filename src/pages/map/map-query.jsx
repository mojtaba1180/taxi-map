import qs from 'qs';
import { RoutingApi } from '../../apis/routing-api';
import { addCoordinates, setIsDirection, setLocations, setShowDirection, setShowSearchBar } from '../../store/mapSlice';
const MapQuery = ({ search, dispatch }) => {

    const query = qs.parse(search.split("?")[1]);
    const parse = (q) => JSON.parse(q)
    if (query.showDirection) dispatch(setShowDirection(parse(query.showDirection)));
    if (query.showSearchBar) dispatch(setShowSearchBar(parse(query.showSearchBar)));
    if (query.loc) handleLoc(query.loc, dispatch);

}




const handleLoc = async (loc, dispatch) => {
    const ArrayLocations = loc.split(";").map(item => item.split(",").map(i => Number(i)))

    let resultLocation = Promise.all(
        ArrayLocations.map(async (location) => {
            const { res, err } = await RoutingApi.getLocation({
                lat: location[0],
                lon: location[1],
                zoom: 18
            })

            return {
                value: res.display_name,
                location: res
            }

        })
    )

    await resultLocation.then(res => {
        dispatch(setIsDirection(true))
        dispatch(setLocations(res));
    })
    const { res, err } = await RoutingApi.getRoutingDirection({
        lat_lon: loc
    });
    if (err) console.log(err);
    if (res) {
        res.routes.map(item => {
            dispatch(addCoordinates(item.geometry.coordinates))
        })
    }
}







export default MapQuery