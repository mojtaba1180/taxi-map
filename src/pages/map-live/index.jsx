// import { Loader } from '@mantine/core';
import { Loader } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';

import React from 'react';
import { useMap } from 'react-map-gl';
import { useSearchParams } from 'react-router-dom';
import { RoutingApi } from '../../apis/routing-api';
import DirectionLine from '../../components/direction-line';
import MainMap from '../../components/main-map/main-map';
import LiveLocationPoint from './component/location-point';
import { MapLiveContainer, MapLiveList, MapLiveListItem, MapLiveListItemContent, MapLiveListItemTitle, MapLiveRightBox, MapLiveRightBoxTitle } from './style/map-live.style';



const MapLive = () => {
    const [searchparams] = useSearchParams();
    const { data, isLoading, isFetching } = useQuery(["live_location"], () => RoutingApi.getLiveLocations({
        top: searchparams.get("top"),
        minute: searchparams.get("minute"),
        auth_key: searchparams.get("auth_key")
    }), { refetchInterval: 5000 });


    const [coordinates, setCoordinates] = React.useState([])
    const [loading, setLoading] = React.useState(false);
    const [waypoints, setWaypoints] = React.useState(null);
    const [userSelected, setUserSelected] = React.useState(null)
    const [autoFly, setAutoFly] = React.useState(true)
    const { usemap } = useMap();



    const setDriverWaypoints = (user) => {
        setUserSelected(user);
    }


    React.useEffect(() => {
        if (userSelected) {
            setCoordinates(data.users[userSelected].waypoints.map(item => {
                return [item.location[1], item.location[0]]
            }))
            setWaypoints(data.users[userSelected].waypoints);
        }
    }, [data, userSelected])


    React.useEffect(() => {
        if (usemap && waypoints && autoFly) {
            usemap.flyTo({ center: [waypoints[waypoints.length - 1].location[1], waypoints[waypoints.length - 1].location[0]] });
        }
    }, [waypoints, isFetching]);





    return (
        <MainMap>
            <MapLiveContainer>
                <MapLiveRightBox>
                    <MapLiveRightBoxTitle >
                        ??????????   ???????? ???????? ????????????????
                    </MapLiveRightBoxTitle>
                    {/* <MapLiveSearch>
                        <span>{loading ? <Loader size="sm" /> : <IconSearch />}</span>
                        <MapLiveSearchInput
                            placeholder='?????????? ????????...'
                        />
                    </MapLiveSearch> */}

                    {
                        isLoading ? (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
                                <Loader />
                            </div>
                        ) : (
                            <>
                                {
                                    data ? (
                                        <MapLiveList>
                                            {
                                                Object.keys(data.users).map((key, idx) => {

                                                    return (
                                                        <MapLiveListItem
                                                            key={idx}
                                                            onClick={() => setDriverWaypoints(key)}
                                                            active={key === userSelected}
                                                        >
                                                            <div>
                                                                <MapLiveListItemTitle>
                                                                    ??????:  {data.users[key]?.name}
                                                                </MapLiveListItemTitle>
                                                                <MapLiveListItemContent>
                                                                    ?????????? ?????????? :  {data.users[key]?.mobile}
                                                                </MapLiveListItemContent>
                                                            </div>
                                                            <IconChevronLeft className="icon" />
                                                        </MapLiveListItem>
                                                    )
                                                })
                                            }
                                        </MapLiveList>
                                    ) : (
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
                                            <p> ???????????? ???? ???????? ??????????</p>
                                        </div>
                                    )

                                }
                            </>

                        )
                    }
                </MapLiveRightBox>
            </MapLiveContainer>
            <DirectionLine
                coordinates={coordinates}
            >

                {
                    waypoints && waypoints.map((item, idx) => {
                        return (
                            <LiveLocationPoint time={item.time} lat={item.location[0]} lng={item.location[1]} index={idx} startIndex={0} endIndex={waypoints.length - 1} key={idx} />
                        )
                    })
                }
            </DirectionLine>

        </MainMap>
    )
}

export default MapLive