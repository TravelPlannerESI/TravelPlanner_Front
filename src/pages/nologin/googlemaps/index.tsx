import { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GMap from '@/components/GoogleMap/gmap';
import caxios from '@/util/caxios';
import CountryInfoArea from './countryInfoArea';
import CovidCountryInfo from '@/components/GoogleMap/covidCountryInfo';

const GoogleMaps = () => {
  const [currentPosition, setCurrentPosition] = useState<any>({}); // marker를 드래그해서 마지막에 놓은 위치의 정보를 담는다.
  const [locMarker, setLocMarker] = useState<MapAPI.LockMarker>(); // 검색한 위치의 marker를 표시한다.
  const [locations, setLocations] = useState<any>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(userLocation);
    getInitialData();
  }, []);

  // 최초 로딩시 사용자의 위치정보를 가져온다.
  const userLocation = ({ coords }: any) => {
    setLocMarker({
      location: {
        lat: coords?.latitude,
        lng: coords?.longitude,
      },
      zoom: 4,
      isSearched: false,
    });
  };

  // 최초 로딩시 모든 국가의 코로나 및 좌표를 조회한다.
  const getInitialData = () => {
    caxios.get(`/country`).then((res) => {
      const response = res.data.data;
      setLocations(setDataType(response));
    });
  };

  const setDataType = (res: any) => {
    return res?.map((data: any) => {
      let newObj = {};
      newObj['alarmLvl'] = data.alarmLvl;
      newObj['countryEngNm'] = data.countryEngNm;
      newObj['countryIsoAlp2'] = data.countryIsoAlp2;
      newObj['countryNm'] = data.countryNm;
      newObj['lat'] = parseFloat(data.lat);
      newObj['lng'] = parseFloat(data.lng);
      newObj['title'] = data.title;
      newObj['txtOriginCn'] = data.txtOriginCn;
      return newObj;
    });
  };

  // Marker를 드래그하고 내려놓은 곳의 정보를 가져온다.
  const onMarkerDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  const parseFloat = (val: string) => {
    return Number.parseFloat(val);
  };

  return (
    // {/* // <div style={{ height: '100%' }}> */}
    <GMap>
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        zoom={locMarker?.zoom}
        center={locMarker?.location}
      >
        {/* 검색창 */}
        {/* <SearchBox setLocMarker={setLocMarker} /> */}

        {/* 지도에 코로나 단계별로 마커를 표시해준다. */}
        <CovidCountryInfo locations={locations} />

        {/* 검색한 위치가 있을 시 표시한다. */}
        {locMarker && locMarker.isSearched && <Marker position={locMarker.location} />}

        <CountryInfoArea loc={locations} />
      </GoogleMap>
    </GMap>
  );
};

export default GoogleMaps;
