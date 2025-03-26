"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { districts } from "../data/DistrictsData";
import DistrictCard from "./DistrictCard";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false }
);

const kpCenter: [number, number] = [34.5, 71.0];

const customIcon = new L.Icon({
  iconUrl: "./city.png",
  iconSize: [35, 35],
});

interface GeoJsonFeature {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
}

interface NominatimResponse {
  geojson: GeoJsonFeature;
}


const KPMap = () => {
  const [kpBoundary, setKpBoundary] = useState<number[][] | null>(null);

  useEffect(() => {
    const fetchBoundary = async () => {
      const url = `https://nominatim.openstreetmap.org/search.php?state=Khyber%20Pakhtunkhwa&polygon_geojson=1&format=jsonv2`;

      try {
        const response = await fetch(url);
        const json: NominatimResponse[] = await response.json();
        if (json.length > 0 && json[0].geojson) {
          const geojsonFeature = json[0].geojson;

          if (geojsonFeature.type === "Polygon") {
            setKpBoundary(
              geojsonFeature.coordinates[0].map((coord) => [
                coord[1],
                coord[0],
              ]) as number[][]
            ); // Extract the main polygon and swap coordinates
          } else if (geojsonFeature.type === "MultiPolygon") {
            const firstPolygon = geojsonFeature.coordinates[0][0];
            if (Array.isArray(firstPolygon) && Array.isArray(firstPolygon[0])) {
              // setKpBoundary(
              //   firstPolygon.map((coord: number[]) => [coord[1], coord[0]]) as number[][]
              // );

              if (
                Array.isArray(firstPolygon) &&
                firstPolygon.every((coord) => Array.isArray(coord) && coord.length === 2)
              ) {
                setKpBoundary(
                  firstPolygon.map((coord: any) => [coord[1], coord[0]])
                );
              }

            }
          }
        }
      } catch (error) {
        console.error("Error fetching boundary:", error);
      }
    };

    fetchBoundary();
  }, []);

  return (

    <MapContainer
      center={kpCenter}
      zoom={7}
      maxBounds={[
        [24.396308, 60.872972],
        [46.774092, 77.837451],
      ]}
      minZoom={7}
      style={{ height: "75vh", width: "100%" }}
      className="dark:bg-gray-900"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* KP Boundary Polygon */}
      {kpBoundary && (
        <Polygon
          positions={kpBoundary as [number, number][]}
          pathOptions={{
            color: "#619eff",
            weight: 3,
            opacity: 1,
            fillOpacity: 0,
          }}
        />
      )}

      {/* District Markers */}
      {districts.map((district, index) => (
        <Marker
          key={index}
          title={district.name}
          position={[district.coordinates[0], district.coordinates[1]]}
          icon={customIcon}
        >
          <Popup>
            <DistrictCard district={district} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default KPMap;
