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
import { useEffect, useMemo, useRef, useState } from "react";

export function GoogleMapViewComponent({
  mapStyle,
  readonlyMap = true,
  scopedId,
  withSearchAutoComplete,
}: {
  mapStyle: string;
  readonlyMap?: boolean;
  scopedId?: string;
  withSearchAutoComplete?: boolean;
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
      // console.log(place.address_components);
      // console.log(place);
      const location = place?.geometry?.location;
      const name = place?.name;

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
          });
          setZoom(18);
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
    }
  }, [searchInput]);

  const markerIcon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // URL Icon marker

  const baliBounds = {
    north: -8.409517,
    south: -8.903239,
    east: 115.744076,
    west: 114.421349,
  };

  if (!isLoaded) return <div>Loading...</div>;

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
              componentRestrictions: { country: "ID" }, // Batasi ke Indonesia
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

      <span></span>
      <GoogleMap mapContainerClassName={mapStyle} {...mapOptions}>
        <Marker position={mapCoordinate!} icon={markerIcon} />
      </GoogleMap>
    </div>
  );
}
