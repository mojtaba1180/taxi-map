import { Loader } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RoutingApi } from '../../../../apis/routing-api';
import {
    selectAction,
    selectLocations,
    setInputIndexSelected,
    setIsDirection,
    setIsSearch,
    setLocations,
    setOnSearch,
    setSearchResult
} from '../../../../store/mapSlice';
import {
    DirectionButton,
    SearchBarContainer,
    SearchBarInput,
    SearchBarInputBox
} from './map-search-bar-style';
const MapSearchBar = (props) => {
    const { showDirection = false } = props;
    const action = useSelector(selectAction);
    const { locations, inputIndexSelected } = useSelector(selectLocations);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), 1000);
        return () => clearTimeout(timer);
    }, [value]);


    useEffect(() => {
        handleSearch();
    }, [debouncedValue]);

    const handleSetInputValue = (e) => {

        if (action.isDirection && props.idx !== undefined) {
            let arr = [...locations];
            arr = arr.map((item, idx) => {
                if (props.idx === idx) {
                    return {
                        ...item,
                        value: e.target.value
                    }
                } else {
                    return { ...item }
                }
            })
            dispatch(setLocations(arr));
        }
        setValue(e.target.value);
    }

    const handleSearch = async () => {
        const query = {
            q: debouncedValue,
            limit: "10",
            format: "json",
            addressdetails: 1
        };
        if (debouncedValue.length >= 3) {
            dispatch(setOnSearch(true));
            setLoading(true)
            const { res, err } = await RoutingApi.SearchLocation(query);
            if (err) return;
            if (res) {
                setLoading(false);
                dispatch(setSearchResult(res.splice(0, 8)));
                dispatch(setOnSearch(false));
                dispatch(setIsSearch(true));
            }
        }
    }

    return (
        <div style={{ width: "100%", display: 'flex', flexDirection: "column", }} >
            <SearchBarContainer>
                <SearchBarInputBox
                    active={inputIndexSelected === props.idx ? true : false}
                >
                    <span>
                        {Loading ? <Loader size="sm" /> : <IconSearch />}
                    </span>
                    <SearchBarInput
                        onFocus={() => {
                            if (props.idx !== undefined || props.idx !== null) dispatch(setInputIndexSelected(props.idx))
                        }}
                        value={action.isDirection && locations[props.idx] ? locations[props.idx].value : value}
                        onChange={(e) => { handleSetInputValue(e) }}
                        onKeyDown={(e) => {
                            if (e.code === "Enter" || e.code === "NumpadEnter") {
                                handleSearch();
                            }
                        }}
                        placeholder='جستوجو مکان ...'
                    />
                </SearchBarInputBox>
                {
                    showDirection &&
                    <DirectionButton
                        onClick={() => { dispatch(setIsDirection(!action.isDirection)) }}
                    >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg>
                        </span>
                    </DirectionButton>
                }
            </SearchBarContainer>
        </div>
    )
}

export default MapSearchBar