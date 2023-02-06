import { Popover } from '@mantine/core';
import React from 'react';
import { Marker } from 'react-map-gl';

const DirectionPoint = (item) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Marker
            onClick={() => setOpen(!open)}
            latitude={item[1]}
            longitude={item[0]}
            children={
                <Popover width={200} position="top" opened={open} withArrow shadow="md">
                    <Popover.Dropdown>
                        <div style={{ zIndex: 99 }} >
                            {"salam"}
                        </div>
                    </Popover.Dropdown>
                    <Popover.Target>
                        <div style={{ width: 15, height: 15, borderRadius: 10, background: `${open ? "#00ff2a" : "#ff0"}`, cursor: "pointer" }} />
                    </Popover.Target>
                </Popover>
            }
        />
    )
}

export default DirectionPoint