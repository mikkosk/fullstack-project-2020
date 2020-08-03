import React, {useEffect, useRef, useState} from 'react'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


const styles = {
    position: "absolute" as 'absolute',
    width: "100%",
    height: "100%"
  };

const Mapbox: React.FC<{lat: number, long: number}> = ({lat, long}) => {


    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!lat || !long || isNaN(lat) || isNaN(long) || lat > 90 || lat < -90 || long > 90 || long < -90) {
            return
        }

        mapboxgl.accessToken = "pk.eyJ1IjoibWlra2VsaXgiLCJhIjoiY2tkY25oY3BvMWk0MTJ6cGMxN3FtaGo1bSJ9.N8eFcH1jtgF2IEAOu9OT6Q"

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