import { Loader } from '@mantine/core';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAction, setIsDirection, setIsSearch, setOnSearch, setSearchResult } from '../../store/mapSlice';
import http from '../../utils/http';
import { DirectionButton, SearchBarContainer, SearchBarInput } from './map-search-bar-style';
const MapSearchBar = () => {
    const action = useSelector(selectAction);
    const dispatch = useDispatch();

    const [value, setValue] = useState("")
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), 1000)
        return () => clearTimeout(timer)
    }, [value]);

    useEffect(() => {
        const query = {
            q: debouncedValue,
            limit: 20,
            format: "json",
            addressdetails: 1
        }
        if (debouncedValue.length >= 3) {
            dispatch(setOnSearch(true));
            http.get(`/nominatim/search.php?${qs.stringify(query)}`).then(res => {
                console.log(res);
                dispatch(setSearchResult(res));
                dispatch(setOnSearch(false));
                dispatch(setIsSearch(true));
            }).catch(err => {
                console.log({ err });
            })
        }
    }, [debouncedValue])
    return (
        <>
            <SearchBarContainer>
                <span>
                    {
                        action.onSearch ? (
                            <Loader size="sm" />
                        ) :
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            )
                    }
                </span>
                <SearchBarInput
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='جستوجو مکان ...'
                />
            </SearchBarContainer>
            <DirectionButton
                onClick={() => { dispatch(setIsDirection(!action.isDirection)) }}
            >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                </span>
            </DirectionButton>
        </>
    )
}

export default MapSearchBar