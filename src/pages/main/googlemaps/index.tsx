import { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, MarkerF } from '@react-google-maps/api';
import SearchBox from '@/components/GoogleMap/SearchBox';
import GMap from '@/components/GoogleMap/GMap';
import caxios from '@/util/caxios';

const locations = [
  {
    name: 'Korea ',
    location: {
      lat: 37,
      lng: 127,
    },
  },
  {
    name: 'Location 1 ',
    location: {
      lat: 29,
      lng: 120.162,
    },
  },
  {
    name: 'Location 2 ',
    location: {
      lat: 41.3917,
      lng: 42.1649,
    },
  },
  {
    name: 'Location 3',
    location: {
      lat: 41.3773,
      lng: 12.1585,
    },
  },
  {
    name: 'Location 4',
    location: {
      lat: 47.3797,
      lng: 2.1682,
    },
  },
  {
    name: 'Location 5',
    location: {
      lat: 37.4055,
      lng: 2.1915,
    },
  },
];

const GoogleMaps = () => {
  const [selected, setSelected] = useState<any>({}); // marker를 선택하면 그 위치에 대한 정보를 담는다.
  const [currentPosition, setCurrentPosition] = useState<any>({}); // marker를 드래그해서 마지막에 놓은 위치의 정보를 담는다.
  const [locMarker, setLocMarker] = useState<MapAPI.LockMarker>(); // 검색한 위치의 marker를 표시한다.

  // const [locations, setLocations] = useState<any>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(userLocation);
    caxios.get(`/api/v1/country`).then((res) => console.log(res));
    // request('/api/v1/map').then((res) => console.log(res));
  }, []);

  const userLocation = ({ coords, timestamp }: any) => {
    setLocMarker({
      location: {
        lat: coords?.latitude,
        lng: coords?.longitude,
      },
      zoom: 4,
      isSearched: false,
    });
  };

  const onSelect = (val: any) => {
    console.log('onselect', val);
    setSelected(val);
  };

  const onMarkerDragEnd = (e: any) => {
    console.log(e);
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  return (
    <div>
      <GMap>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          zoom={locMarker?.zoom}
          center={locMarker?.location}
        >
          <SearchBox setLocMarker={setLocMarker} />

          {/* 사용자의 여행 계획에 담긴 위치를 표시한다. */}
          {locations?.map((val, index) => {
            return (
              <MarkerF
                key={index}
                position={val.location}
                clickable={true}
                onClick={() => onSelect(val)}
                onDragEnd={(e) => onMarkerDragEnd(e)}
                draggable={true}
                visible={true}
                zIndex={1}
              />
            );
          })}

          {/* 검색한 위치가 있을 시 표시한다. */}
          {locMarker && locMarker.isSearched && <MarkerF position={locMarker.location} />}

          {
            // 툴팁
            selected?.location && (
              <InfoWindow
                position={{ lat: selected?.location?.lat, lng: selected?.location?.lng }}
                onCloseClick={() => onSelect(null)}
              >
                <p>{selected.name}</p>
              </InfoWindow>
            )
          }
        </GoogleMap>
      </GMap>
    </div>
  );
};

export default GoogleMaps;
