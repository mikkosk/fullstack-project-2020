import React, {useEffect, useRef, useState} from 'react'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const styles = {
    position: "absolute" as 'absolute',
    width: "100%",
    height: "100%"
  };

const Mapbox: React.FC<{lat: number, long: number}> = ({lat, long}) => {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const key = useSelector((state: RootState) => state.key.mapbox)

    useEffect(() => {
        if(!lat || !long || isNaN(lat) || isNaN(long) || lat > 90 || lat < -90 || long > 90 || long < -90 || !key) {
            return
        }

        mapboxgl.accessToken = key

        if(!mapContainerRef.current) {
            return;
        }

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [long, lat],
            zoom: 15
        })

        return () => map.remove();
    }, [lat, long])

    return <div ref={mapContainerRef} style={styles}/>
}

export default Mapbox