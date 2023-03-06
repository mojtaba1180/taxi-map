import { Popover } from '@mantine/core';
import moment from 'jalali-moment';

import React from 'react';
import { Rings } from 'react-loader-spinner';
import { Marker } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { selectCenter } from '../../../../store/mapSlice';
import { Primary } from '../../../../utils/variables';
import './location-point.css';
const LiveLocationPoint = ({ time, lat, lng, index, startIndex, endIndex }) => {

    const [open, setOpen] = React.useState(false);
    const center = useSelector(selectCenter)
    const title = (
        <div style={{ zIndex: 99, textAlign: "center" }} >
            {
                index === endIndex ? (
                    <>
                        <span>در حال حاظر</span>
                    </>
                ) : (
                    <>
                        تاریخ : {moment(time).locale("fa").format("jYYYY/jMM/jDD").toString()}
                        <br />
                        ساعت : {moment(time).locale("fa").format("HH:mm").toString()}
                    </>
                )
            }
        </div>
    )

    return (
        <Marker
            latitude={lat}
            longitude={lng}
            children={
                <>

                    <Popover width={200} position="top" opened={open} withArrow shadow="md">
                        <Popover.Dropdown>
                            {title}
                        </Popover.Dropdown>
                        <Popover.Target>
                            <div
                                onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
                            >
                                {
                                    index === endIndex ?
                                        (<div className='map-live-marker map-live-marker-last' >
                                            <div className='map-live-marker-last' style={{ background: Primary }} >
                                                <Rings
                                                    height="50"
                                                    width="50"
                                                    color={Primary}
                                                    radius="10"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                    visible={true}
                                                    ariaLabel="rings-loading"
                                                />
                                            </div>
                                        </div>) :
                                        (
                                            center.zoom > 17 && <div style={{ width: 10, height: 10, borderRadius: 10, background: `${open ? "#00ff2a" : Primary}`, cursor: "pointer" }} />
                                        )
                                }
                            </div>
                        </Popover.Target>
                    </Popover>

                </>
            }
        />
    )
}

export default LiveLocationPoint