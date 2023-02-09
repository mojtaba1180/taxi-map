// import { Loader } from '@mantine/core';
// import { IconChevronLeft, IconSearch } from '@tabler/icons';
import OrderDirections from './component/order-directions';
// import {
//     MapOrderContainer, MapOrderList, MapOrderListItem, MapOrderListItemContent, MapOrderListItemTitle, MapOrderRightBox, MapOrderRightBoxTitle, MapOrderSearch, MapOrderSearchInput
// } from './style/map-order-style';
import React from 'react';
import MainMap from '../../components/main-map/main-map';

const MapOrder = () => {
    const [loading, setLoading] = React.useState(false);
    return (
        <>
            <MainMap>
                {/* <MapOrderContainer> */}
                {/* <MapOrderRightBox>
                    <MapOrderRightBoxTitle >
                        نمایش  مسیر رانندگان
                    </MapOrderRightBoxTitle>
                    <MapOrderSearch>
                        <span>{loading ? <Loader size="sm" /> : <IconSearch />}</span>
                        <MapOrderSearchInput
                            placeholder='جستجو اعضا...'
                            />
                            </MapOrderSearch>
                            <MapOrderList>
                            <MapOrderListItem>
                            <div>
                                <MapOrderListItemTitle>
                                نام:  محمد عظیمی
                                </MapOrderListItemTitle>
                                <MapOrderListItemContent>
                                    پیک شماره یک به سمت  میدان ازادی
                                </MapOrderListItemContent>
                                </div>
                            <IconChevronLeft className="icon" />
                            </MapOrderListItem>
                    </MapOrderList>
                </MapOrderRightBox> */}
                <OrderDirections />
                {/* </MapOrderContainer> */}
            </MainMap>
        </>
    )
}

export default MapOrder