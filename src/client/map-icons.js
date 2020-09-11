import Leaflet from 'leaflet';

const defaultIconProps = {
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
};

// Red icons for incidents
const red = new Leaflet.Icon({
  ...defaultIconProps,
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
});

// Blue icons for responders
const blue = new Leaflet.Icon({
  ...defaultIconProps,
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
});

export default { red, blue };
