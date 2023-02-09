// import { Loader } from '@mantine/core';
import { IconChevronLeft, IconSearch } from '@tabler/icons';

import React from 'react';
import MainMap from '../../components/main-map/main-map';
import {
    MapLiveContainer, MapLiveList, MapLiveListItem, MapLiveListItemContent, MapLiveListItemTitle, MapLiveRightBox, MapLiveRightBoxTitle, MapLiveSearch, MapLiveSearchInput
} from './style/map-live.style';

const MapLive = () => {
    const [loading, setLoading] = React.useState(false);
    return (
        <MainMap>
            <MapLiveContainer>
                <MapLiveRightBox>
                    <MapLiveRightBoxTitle >
                        نمایش   زنده مسیر رانندگان
                    </MapLiveRightBoxTitle>
                    <MapLiveSearch>
                        <span>{loading ? <Loader size="sm" /> : <IconSearch />}</span>
                        <MapLiveSearchInput
                            placeholder='جستجو اعضا...'
                        />
                    </MapLiveSearch>
                    <MapLiveList>
                        <MapLiveListItem>
                            <div>
                                <MapLiveListItemTitle>
                                    نام:  محمد عظیمی
                                </MapLiveListItemTitle>
                                <MapLiveListItemContent>
                                    پیک شماره یک به سمت  میدان ازادی
                                </MapLiveListItemContent>
                            </div>
                            <IconChevronLeft className="icon" />
                        </MapLiveListItem>
                    </MapLiveList>
                </MapLiveRightBox>

            </MapLiveContainer>
        </MainMap>
    )
}

export default MapLive