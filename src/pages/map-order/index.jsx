import React from 'react';
import MainMap from '../../components/main-map/main-map';
import OrderDirections from './component/order-directions';
import {
    MapOrderContainer
} from './style/map-order-style';

const MapOrder = () => {

    return (
        <MapOrderContainer>
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
            <MainMap>
                <OrderDirections />
            </MainMap>
        </MapOrderContainer>
    )
}

export default MapOrder