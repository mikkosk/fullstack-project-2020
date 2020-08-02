import React, {useEffect, useRef, useState} from 'react'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


const styles = {
    position: "absolute" as 'absolute',
    width: "100%",
    height: "100%"
  };

const Mapbox = () => {

    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log("start")
        mapboxgl.accessToken = "SALASANA"

        if(!mapContainerRef.current) {
            console.log("wow")
            return;
        }

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [12.550343, 55.665957],
            zoom: 12
        })

        return () => map.remove();
    }, [])

    return <div ref={mapContainerRef} style={styles}/>
}

export default Mapbox