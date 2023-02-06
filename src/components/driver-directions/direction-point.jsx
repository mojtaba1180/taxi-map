import { Popover } from '@mantine/core';
import React from 'react';
import { Marker } from 'react-map-gl';

const DirectionPoint = (item) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div style={{ position: "relative" }} >
            <Popover width={200} position="top" opened={open} withArrow shadow="md">
                <Popover.Dropdown>
                    <div className='marker-popup' >
                        {"salam"}
                    </div>
                </Popover.Dropdown>
                <Popover.Target>
                    <Marker
                        onClick={() => setOpen(!open)}
                        latitude={item[1]}
                        longitude={item[0]}
                        children={<div style={{ width: 15, height: 15, borderRadius: 10, background: "#ff0", cursor: "pointer" }} />}

                    />
                </Popover.Target>
            </Popover>
        </div>
    )
}

export default DirectionPoint