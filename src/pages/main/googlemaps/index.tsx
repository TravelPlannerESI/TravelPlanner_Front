import { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GMap from '@/components/GoogleMap/gmap';
import caxios from '@/util/caxios';
import CountryInfoArea from './countryInfoArea';
import CovidCountryInfo from '@/components/GoogleMap/covidCountryInfo';

const defaultCenter: { lat: number; lng: number } = {
  lat: 37,
  lng: 127,
};
const GoogleMaps = () => {
  const [currentPosition, setCurrentPosition] = useState<any>({}); // marker를 드래그해서 마지막에 놓은 위치의 정보를 담는다.
  const [locMarker, setLocMarker] = useState<MapAPI.LockMarkerWithLogin>(); // 검색한 위치의 marker를 표시한다.
  const [locations, setLocations] = useState<any>([]);

  useEffect(() => {
    getUserTravelInfo();
    // navigator.geolocation.getCurrentPosition(userLocation);
    getInitialData();
  }, []);

  const getUserTravelInfo = () => {
    // caxios.get(`/???`).then((res) => console.log(res));
    setLocMarker([
      {
        location: {
          lat: 37,
          lng: 127,
        },
        zoom: 4,
        isSearched: false,
        isTravelInfo: true,
      },
    ]);
  };

  // 최초 로딩시 사용자의 위치정보를 가져온다.
  const userLocation = ({ coords, timestamp }: any) => {
    setLocMarker([
      {
        location: {
          lat: coords?.latitude,
          lng: coords?.longitude,
        },
        zoom: 4,
        isSearched: false,
        isTravelInfo: false,
      },
    ]);
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
    console.log(e);
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  const parseFloat = (val: string) => {
    return Number.parseFloat(val);
  };

  const setMarkerTypeIcon = (val: any): google.maps.Icon => {
    let iconType: string = '';

    if (val?.isTravelInfo) iconType = 'airplain-1';
    else iconType = 'pin2-1';

    return {
      url: require(`../../../components/GoogleMap/asset/${iconType}.png`),
      // scaledSize: new window.google.maps.Size(40, 40),
    };
  };

  return (
    <GMap>
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        zoom={locMarker !== undefined ? locMarker[locMarker.length - 1].zoom : 4}
        center={
          locMarker !== undefined
            ? locMarker[locMarker.length - 1].location
            : defaultCenter /* 수정 필요 */
        }
      >
        {/* <SearchBox locMarker={locMarker} setLocMarker={setLocMarker} /> */}

        {/* 지도에 코로나 단계별로 마커를 표시해준다. */}
        <CovidCountryInfo locations={locations} />

        {/* 검색후 나타난 결과를 지도에 표시 및 저장된 여행지의 정보 */}
        {locMarker?.map((val: any, index: number) => {
          return <Marker key={index} position={val.location} icon={setMarkerTypeIcon(val)} />;
        })}

        <CountryInfoArea loc={locations} />
      </GoogleMap>
    </GMap>
  );
};

export default GoogleMaps;
