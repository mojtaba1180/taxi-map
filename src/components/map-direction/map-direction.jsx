import { Button, SegmentedControl } from '@mantine/core'
import { IconArrowsDownUp, IconCar, IconMenu, IconMotorbike, IconPlus, IconTrash, IconWalk } from '@tabler/icons'
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import MapSearchBar from '../map-search-bar'
import { applyDrag } from './../../utils/drag-and-drop/applyDrag'
import { DraggableItem, MapDirectionAddLocation, MapDirectionContainer } from './map-direction-style'
const MapDirection = () => {


    const [Locations, setLocations] = useState([1, 2]);
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
    useEffect(() => {
        console.log(Locations);
    }, [Locations])
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
                    lockAxis="y"
                    onDrop={e => setLocations(applyDrag(Locations, e))}
                    dragHandleSelector=".column-drag-handle"

                >
                    {
                        Locations.map((item, idx) => {
                            return (
                                <Draggable key={idx}>
                                    <DraggableItem className="draggable-item">
                                        {/* {item} */}
                                        <IconMenu className="column-drag-handle" style={{ cursor: "grab" }} />
                                        <MapSearchBar />

                                        {
                                            Locations.length > 2 && idx > 1 &&
                                            <IconTrash color='#f04'
                                                style={{ marginLeft: "-11%" }}
                                                onClick={() => { setLocations(Locations.filter(l => l != item)) }}
                                            />
                                        }

                                    </DraggableItem>
                                </Draggable>
                            )
                        })
                    }
                </Container>
                {
                    Locations.length <= 6 &&
                    <Button
                        radius={"md"}
                        rightIcon={<IconPlus />}
                        style={{ alignSelf: "start" }}
                        onClick={() => {
                            setLocations(prev => {
                                return [
                                    ...prev,
                                    prev.length + 1
                                ]
                            })
                        }}
                    >
                        افزودن مسیر جدید
                    </Button>
                }
                <Motion
                    idx={Locations.length}
                >
                    {
                        Locations.length <= 2 &&
                        <Button
                            radius={'xl'}
                            variant="subtle"
                            onClick={() => {
                                setLocations(applyDrag(Locations, { addedIndex: 1, removedIndex: 0 }))
                            }}
                            children={
                                <IconArrowsDownUp />
                            }
                        />
                    }
                </Motion>

            </MapDirectionAddLocation>
        </MapDirectionContainer>
    )
}

const Motion = ({ children, idx }) => {
    return (
        <AnimatePresence mode='wait'
            key={idx}
        >

            <motion.div
                key={idx}
                style={{
                    alignSelf: "start",
                    position: "absolute",
                    left: 0,
                    top: "54%"
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, }}
                transition={{ duration: 0.1 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default MapDirection