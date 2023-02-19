import { Popover } from '@mantine/core';
import React from 'react';
import './location-marker.css';

interface Prop {
    isDrag: boolean,
    centerMode: boolean,
    title: any,
    color?: String,
    popup?:boolean
}
const LocationMarker = ({ isDrag, centerMode, title, color= "#000",popup }: Prop) => {
    const [open, setOpen] = React.useState(popup);
    return (

        <div className={`${!centerMode && "marker-container" }`} >

            <Popover width={200} position="top" opened={open} withArrow shadow="md">
                <Popover.Dropdown>
                    <div className='marker-popup' >
                        {title}
                    </div>
                </Popover.Dropdown>
                <Popover.Target>
                    <div>
                        <svg onClick={() => setOpen(!open)} xmlns="http://www.w3.org/2000/svg" className={`${centerMode ? "marker-center" : "marker"}`} style={{ marginTop: isDrag ? "-20" : 0 }} viewBox="0 0 38 58">
                            <g fill="none" fillRule="evenodd">
                                <path fill={color ? color : "#000"} d="M17.24 56.242h-.021v-3.964c0-7.076-3.56-13.572-9.285-17.696A19.077 19.077 0 0 1 .05 17.674C.727 8.172 8.576.484 18.052.024 28.976-.51 38 8.225 38 19.077c0 6.524-3.26 12.28-8.236 15.717-5.696 3.936-8.983 10.537-8.983 17.48v3.967h-.022a1.76 1.76 0 0 1-3.518 0z" />
                                <rect width={13} height={13} x={13} y={12} fill="#FFF" rx="6.5" />
                            </g>
                        </svg>
                        {
                            centerMode && (
                                <svg xmlns="http://www.w3.org/2000/svg" className={`bottom-marker-center ${isDrag && "drag"}`} viewBox="0 0 18 18">
                                    <g fill={color ? color : "#000"} fillRule="evenodd">
                                        <circle cx={9} cy={9} r={9} fillOpacity=".1" />
                                        <circle cx={9} cy={9} r={2} />
                                    </g>
                                </svg>
                            )

                        }
                    </div>
                </Popover.Target>
            </Popover>

        </div>

    )
}

export default LocationMarker