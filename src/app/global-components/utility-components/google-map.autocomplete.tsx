"use client";

import { useState, useEffect, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

//belum complete harus diseting lagi nanti
/* ini adalah fungsi yang harus dikirim oleh parent component yang menggunakan component autocomplete ini */
/* 
 const handleSelect = (place: {
    formatted_address: string;
    address_components: google.maps.GeocoderAddressComponent[];
    geometry: google.maps.places.PlaceGeometry;
  }) => {
    console.log("Alamat lengkap:", place.formatted_address);
    console.log("Komponen alamat:", place.address_components);
    console.log("Koordinat:", place.geometry.location!.lat(), place.geometry.location!.lng());
  };
*/

interface PlacePrediction {
  description: string;
  place_id: string;
}

interface PlaceDetails {
  formatted_address: string;
  address_components: google.maps.GeocoderAddressComponent[];
  geometry: google.maps.places.PlaceGeometry;
}

interface GoogleCustomAutocompleteProps {
  onSelect: (place: PlaceDetails) => void;
  placeholder?: string;
  className?: string;
}

const GoogleCustomAutocomplete: React.FC<GoogleCustomAutocompleteProps> = ({
  onSelect,
  placeholder = "Cari lokasi...",
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  // **Batas koordinat Bali**
  const baliBounds = {
    north: -8.0,  // Koordinat batas utara Bali
    south: -9.0,  // Koordinat batas selatan Bali
    east: 115.5,  // Koordinat batas timur Bali
    west: 114.5,  // Koordinat batas barat Bali
  };

  useEffect(() => {
    const loadGoogleMaps = async () => {
      autocompleteService.current = new google.maps.places.AutocompleteService();

      // Tempatkan peta dummy untuk inisialisasi PlacesService
      if (!mapRef.current) {
        mapRef.current = document.createElement("div");
      }
      placesService.current = new google.maps.places.PlacesService(mapRef.current);
    };

    loadGoogleMaps();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (input.length > 2 && autocompleteService.current) {
        autocompleteService.current.getPlacePredictions(
          {
            input,
            componentRestrictions: { country: "ID" }, // Batasi ke Indonesia
            types: ["establishment"], // Bisa diubah ke "geocode" atau "address"
          },
          async (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              // **Filter hasil berdasarkan lokasi Bali**
              const filteredPredictions = await filterPlacesByBounds(predictions);
              setSuggestions(filteredPredictions);
            } else {
              setSuggestions([]);
            }
          }
        );
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  // **Filter lokasi berdasarkan koordinat Bali**
  const filterPlacesByBounds = async (predictions: google.maps.places.AutocompletePrediction[]) => {
    if (!placesService.current) return [];

    const results: PlacePrediction[] = [];

    for (const prediction of predictions) {
      await new Promise<void>((resolve) => {
        placesService.current!.getDetails(
          {
            placeId: prediction.place_id,
            fields: ["geometry"],
          },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();

              // **Periksa apakah lokasi berada dalam batas Bali**
              if (
                lat >= baliBounds.south &&
                lat <= baliBounds.north &&
                lng >= baliBounds.west &&
                lng <= baliBounds.east
              ) {
                results.push({
                  description: prediction.description,
                  place_id: prediction.place_id,
                });
              }
            }
            resolve();
          }
        );
      });
    }

    return results;
  };

  const fetchPlaceDetails = (placeId: string) => {
    if (!placesService.current) return;

    placesService.current.getDetails(
      {
        placeId,
        fields: ["formatted_address", "address_components", "geometry"],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          onSelect({
            formatted_address: place.formatted_address!,
            address_components: place.address_components!,
            geometry: place.geometry!,
          });
        }
      }
    );
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={cn("relative w-full", className)}>
      {/* Input */}
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full"
      />

      {/* Custom Dropdown */}
      {suggestions.length > 0 && (
        <Card className="absolute left-0 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-50">
          {suggestions.map((place) => (
            <div
              key={place.place_id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setQuery(place.description);
                setSuggestions([]);
                fetchPlaceDetails(place.place_id); // Ambil detail lokasi setelah memilih
              }}
            >
              {place.description}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default GoogleCustomAutocomplete;
