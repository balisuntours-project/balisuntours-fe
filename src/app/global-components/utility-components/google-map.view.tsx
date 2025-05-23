"use client";

import { GoogleMapViewParamater } from "@/app/paramaters/google-map/paramater";
import {
  defaultScopedMapCoordinate,
  useGoogleMapStore,
} from "@/app/store/google-map.store";
import { Input } from "@/components/ui/input";
import { Library } from "@googlemaps/js-api-loader";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import { X } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

export function GoogleMapViewComponent({
  mapStyle,
  readonlyMap = true,
  scopedId,
  withSearchAutoComplete,
  showMap = true,
  passWithAdministrativeData = false,
  loaderComponent = null
}: {
  mapStyle?: string;
  readonlyMap?: boolean;
  scopedId?: string;
  withSearchAutoComplete?: boolean;
  showMap?: boolean;
  passWithAdministrativeData?: boolean;
  loaderComponent?: React.ReactNode
}) {
  const [libraries] = useState<Library[]>(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: libraries,
  });

  const scopedMapState = useGoogleMapStore(
    (state) => state.mapScopedState[scopedId!] || defaultScopedMapCoordinate
  );

  const setScopedMapState = useGoogleMapStore((state) => state.setScopedState);

  const mapPayload = useGoogleMapStore((state) => state.mapPayload);
  const [searchInput, setSearchInput] = useState<string>("");

  const [zoom, setZoom] = useState(
    (mapPayload && !scopedId
      ? mapPayload.zoom
      : scopedMapState.mapScopedPayload?.zoom) ?? 18
  ); // Default zoom

  const [mapCoordinate, setMapCoordinate] =
    useState<Omit<GoogleMapViewParamater, "zoom">>();

  useEffect(() => {
    if (scopedMapState.mapScopedPayload && scopedId) {
      setMapCoordinate({
        lat: scopedMapState.mapScopedPayload.lat,
        lng: scopedMapState.mapScopedPayload.lng,
      });
    } else if (mapPayload && !scopedId) {
      setMapCoordinate({
        lat: mapPayload.lat,
        lng: mapPayload.lng,
      });
    } else {
      setMapCoordinate({
        lat: mapPayload.lat,
        lng: mapPayload.lng,
      });
    }
  }, [scopedMapState.mapScopedPayload, mapPayload, scopedId]);

  const mapOptions = {
    zoom: zoom,
    center: mapCoordinate,
    mapTypeId: "terrain",
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
    
      //console.log(place);
      const location = place?.geometry?.location;
      const name = place?.name;
      const placeId = place?.place_id
     
      if (location) {
        if (inputRef.current) {
          setSearchInput(inputRef.current.value);
        }

        if (scopedId && !readonlyMap) {
          setScopedMapState(scopedId, "mapScopedPayload", {
            lat: location.lat(),
            lng: location.lng(),
            zoom: 18,
            name: name,
            place_id: placeId
          });
          setZoom(18);
        }

        if(scopedId && passWithAdministrativeData) {
          const mapData = place.address_components
          const administrativeLvl3 = mapData?.find(component => component.types.includes("administrative_area_level_3"))?.long_name
          const administrativeLvl4 = mapData?.find(component => component.types.includes("administrative_area_level_4"))?.long_name
          setScopedMapState(scopedId, "mapScopedPayload", {
            lat: location.lat(),
            lng: location.lng(),
            zoom: 18,
            name: name,
            place_id: placeId,
            administrative_area_level_3: administrativeLvl3 ?? null,
            administrative_area_level_4: administrativeLvl4 ?? null,
          
          });
        }
      }
    }
  };

  useEffect(() => {
    if (!searchInput) {
      if (scopedId && !readonlyMap) {
        // console.log(scopedId);
        // console.log(readonlyMap);
        setZoom(9);
        setScopedMapState(scopedId, "mapScopedPayload", undefined);
      }

      if (scopedId && passWithAdministrativeData) {
        // console.log(scopedId);
        // console.log(readonlyMap);
        setZoom(9);
        setScopedMapState(scopedId, "mapScopedPayload", undefined);
      }
    }
  }, [searchInput]);

  const markerIcon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // URL Icon marker

  const baliBounds = {
    north: -8.0,         // Lebih ke utara (dekat Laut Bali)
    south: -9.2,         // Tambah jauh ke selatan (cover Nusa Penida)
    east: 116.0,         // Tambah ke timur (cover ujung timur Bali & Nusa Penida)
    west: 114.35,        // Tambah ke barat (cover Gilimanuk & perbatasan Jawa)
  };

  if (!isLoaded) return loaderComponent ?? <div>Loading...</div>;

  return (
    <div className="w-full h-full">
      {withSearchAutoComplete && (
        <div className="relative w-full mb-2">
          {/* Search Box */}
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
            options={{
              bounds: new google.maps.LatLngBounds(
                new google.maps.LatLng(baliBounds.south, baliBounds.west),
                new google.maps.LatLng(baliBounds.north, baliBounds.east)
              ),
               types: ["establishment"],
              strictBounds: true, // Batasi pencarian hanya dalam Bali
              componentRestrictions: { country: "id" }, // Batasi ke Indonesia
            }}
          >
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Find address to get coordinates"
                className="w-full px-4 py-2 text-base md:text-sm border rounded-lg focus:outline-none focus:ring focus:border-blue-300 pr-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <X
                  onClick={() => setSearchInput("")}
                  className="absolute inset-y-0 right-2 top-2 w-4 h-4 cursor-pointer flex items-center justify-center text-gray-500 hover:text-gray-700"
                />
              )}
            </div>
          </Autocomplete>
        </div>
      )}

      {/* <span></span> */}
      {showMap && (
        <GoogleMap mapContainerClassName={mapStyle} {...mapOptions}>
          <Marker position={mapCoordinate!} icon={markerIcon} />
        </GoogleMap>
      )}
    </div>
  );
}
