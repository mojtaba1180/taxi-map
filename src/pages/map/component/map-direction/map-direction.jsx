import { Button, SegmentedControl } from '@mantine/core'
import { IconArrowsDownUp, IconCar, IconLocation, IconMenu, IconMotorbike, IconPlus, IconTrash, IconWalk } from '@tabler/icons'
import { AnimatePresence, motion } from "framer-motion"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Draggable } from 'react-smooth-dnd'
import MapSearchBar from '../map-search-bar'

import useMobileSize from '../../../../hooks/useMobileSize'

import { selectAction, selectLocations, setLocations,setActions, setLocationsRoutedType } from '../../../../store/mapSlice'
import { applyDrag } from '../../../../utils/drag-and-drop/applyDrag'
import { DraggableItem, MapDirectionAddLocation, MapDirectionContainer } from './map-direction-style'
const MapDirection = () => {

    const dispatch = useDispatch();
    const { isMobile } = useMobileSize();
    const locations = useSelector(selectLocations);
    const action = useSelector(selectAction);
    const directionType = [
        {
            label: (
                <IconCar />
            ), value: 'car'
        },
        {
            label: (
                <IconMotorbike />
            ), value: 'bike'
        },
        {
            label: (
                <IconWalk />
            ), value: 'foot'
        },
    ]

    return (
        <MapDirectionContainer>
            <div style={{ height: "4em", width: "100%" }} >
                <SegmentedControl
                    w={"100%"}
                    data={directionType}
                    value={locations.routedType}
                    onChange={(e) => dispatch(setLocationsRoutedType(e))}
                />
            </div>
            <MapDirectionAddLocation>
                <Container
                    lockAxis="y"
                    onDrop={e => dispatch(setLocations(applyDrag(locations.locations, e)))}
                    dragHandleSelector=".column-drag-handle"

                >
                    {
                        locations.locations.map((item, idx) => {

                            return (
                                <Draggable key={idx}>
                                    <DraggableItem className="draggable-item">
                                        {/* {item} */}
                                        <IconMenu className="column-drag-handle" style={{ cursor: "grab", backgroundColor: item.color ? item.color : "transparent", borderRadius: 10 }} />
                                        <MapSearchBar idx={idx} />

                                        {
                                            locations.locations.length > 2 && idx > 1 &&
                                            <IconTrash color='#f04'
                                                style={{ marginLeft: "-11%" }}
                                                onClick={() => { dispatch(setLocations(locations.locations.filter(l => l != item))) }}
                                            />
                                        }

                                    </DraggableItem>
                                </Draggable>
                            )
                        })
                    }
                </Container>
                <div style={{ display: "flex", justifyContent: "space-around" }} >
                    {

                        (locations.locations.length <= 6 && !isMobile()) &&
                        <Button
                            radius={"md"}
                            rightIcon={<IconPlus />}
                            style={{ alignSelf: "start" }}
                            onClick={() => {
                                dispatch(setLocations(
                                    [
                                        ...locations.locations,
                                        {
                                            value: "",
                                            location: {}
                                        }
                                    ]
                                ))
                            }}
                        >
                            افزودن مسیر جدید
                        </Button>
                    }

                    {
                        <Button
                            disabled={(action.chooseOnMap || locations.inputIndexSelected === null)}
                            radius={"md"}
                            rightIcon={<IconLocation />}
                            style={{ alignSelf: "end" }}
                            onClick={() => { dispatch(setActions({ chooseOnMap: true })) }}
                        >
                            {action.chooseOnMap ? " در حال انتخاب از نقشه" : " انتخاب از نقشه"}
                        </Button>
                    }
                </div>
                <Motion
                    idx={locations.locations.length}
                >
                    {
                        locations.locations.length <= 2 &&
                        <Button
                            radius={'xl'}
                            variant="subtle"
                            onClick={() => {
                                dispatch(setLocations(applyDrag(locations.locations, { addedIndex: 1, removedIndex: 0 })))
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