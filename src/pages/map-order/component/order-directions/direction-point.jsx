import { Popover } from '@mantine/core';
import moment from 'jalali-moment';

import React from 'react';
import { Marker } from 'react-map-gl';
import { Primary } from '../../../../utils/variables';
import './direction-point.css';
const DirectionPoint = (item) => {

    const [open, setOpen] = React.useState(false);

    const title = (
        <div style={{ zIndex: 99, textAlign: "center" }} >
            تاریخ : {moment(item.time).locale("fa").format("jYYYY/jMM/jDD").toString()}
            <br />
            ساعت : {moment(item.time).locale("fa").format("HH:mm").toString()}
        </div>
    )

    return (
        <Marker
            latitude={item.lat}
            longitude={item.lng}
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
                                    item.index === item.startIndex ?
                                        (<div className='map-order-marker' >
                                            <div className='map-order-marker-first' >
                                                مبدا
                                                <span style={{ background: "#000" }} ></span>
                                            </div>
                                        </div>) : item.index === item.endIndex ?
                                            (<div className='map-order-marker map-order-marker-last' >
                                                <div className='map-order-marker-last' >
                                                    مقصد
                                                    <span style={{ background: Primary }} ></span>

                                                </div>
                                            </div>) :
                                            (
                                                <div style={{ width: 15, height: 15, borderRadius: 10, background: `${open ? "#00ff2a" : Primary}`, cursor: "pointer" }} />
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

export default DirectionPoint