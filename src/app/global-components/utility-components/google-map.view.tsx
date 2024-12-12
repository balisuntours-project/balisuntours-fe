"use client"

import { useGoogleMapStore } from '@/app/store/google-map.store';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo } from 'react';

export function GoogleMapViewComponent() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string
    });
    const mapPayload = useGoogleMapStore((state) => state.mapPayload);
    const mapCoordinate = useMemo(() => ({ lat: mapPayload.lat, lng: mapPayload.lng }), [mapPayload]);


    const mapOptions = {
        zoom: mapPayload.zoom,
        center: mapCoordinate,
        mapTypeId: 'terrain',
    };

    const markerIcon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'; // URL Icon marker

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
           /*  mapContainerStyle={{
                width: '100%',
                height: '70vh', // Menyesuaikan tinggi peta dengan persentase viewport
            }} */
           mapContainerClassName="map-container"
            {...mapOptions}
        >
            <Marker position={mapCoordinate} icon={markerIcon} />
        </GoogleMap>
    );
}
