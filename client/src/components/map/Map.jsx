import "./map.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "../pin/Pin";
import "leaflet/dist/leaflet.css";

const Map = ({ items }) => {
  return (
    <MapContainer center={items.length === 1 ? [items[0].latitude, items[0].longitude] : [44.787197, 20.457273]} zoom={7} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  )
}

export default Map