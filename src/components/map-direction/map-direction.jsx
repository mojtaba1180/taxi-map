import { Button, SegmentedControl } from '@mantine/core'
import { IconCar, IconMotorbike, IconPlus, IconWalk } from '@tabler/icons'
import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import MapSearchBar from '../map-search-bar'
import { MapDirectionAddLocation, MapDirectionContainer } from './map-direction-style'

const MapDirection = () => {

    const directionType = [
        {
            label: (
                <IconCar />
            ), value: 'car'
        },
        {
            label: (
                <IconMotorbike />
            ), value: 'motorcycle'
        },
        {
            label: (
                <IconWalk />
            ), value: 'walking'
        },
    ]
    let arr = [1, 2, 3, 4, 5, 6];
    return (
        <MapDirectionContainer>
            <div style={{ height: "4em", width: "100%" }} >
                <SegmentedControl
                    w={"100%"}
                    data={directionType}
                />
            </div>
            <MapDirectionAddLocation>
                <Container
                    dragHandleSelector=".column-drag-handle"
                    onDrop={(e) => console.log(e)}
                    onDragStart={(e) => { console.log(e) }}
                >
                    {
                        arr.map(item => {
                            return (
                                <Draggable key={item}>
                                    <div className="draggable-item  ">
                                        <span className="column-drag-handle" style={{ float: 'left', padding: '0 10px' }}>&#x2630;</span>
                                        <MapSearchBar />
                                    </div>
                                </Draggable>
                            )
                        })
                    }
                </Container>
                <Button
                    rightIcon={<IconPlus />}
                    style={{ alignSelf: "start" }}
                >
                    افزودن مسیر جدید
                </Button>
            </MapDirectionAddLocation>
        </MapDirectionContainer>
    )
}

export default MapDirection