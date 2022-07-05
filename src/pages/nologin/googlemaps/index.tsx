import { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, InfoWindowF, Marker } from '@react-google-maps/api';
import SearchBox from '@/components/GoogleMap/searchBox';
import GMap from '@/components/GoogleMap/gmap';
import caxios from '@/util/caxios';
import CountryInfo from '@/components/GoogleMap/countryInfo';
import CountryInfoArea from './countryInfoArea';

const GoogleMaps = () => {
  const [selected, setSelected] = useState<any>(null); // marker를 선택하면 그 위치에 대한 정보를 담는다.
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
    return res.map((data: any) => {
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

  // Marker를 클릭하면 정보를 가지고온다.
  const onSelect = (val: any) => {
    console.log('onselect', val);
    setSelected(val);
  };

  // Marker를 드래그하고 내려놓은 곳의 정보를 가져온다.
  const onMarkerDragEnd = (e: any) => {
    console.log(e);
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  // Marker icon변경
  const setIcon = (loc: any): google.maps.Icon => {
    let alarmLvl: number = 0;

    if (loc?.alarmLvl === 1) alarmLvl = 1;
    else if (loc?.alarmLvl === 2) alarmLvl = 2;
    else if (loc?.alarmLvl === 3) alarmLvl = 3;
    else alarmLvl = 4;

    return {
      url: require(`../../../components/GoogleMap/asset/${alarmLvl}.png`),
      scaledSize: new google.maps.Size(20, 20),
    };
  };

  const parseFloat = (val: string) => {
    return Number.parseFloat(val);
  };

  return (
    <div>
      <GMap>
        <GoogleMap
          mapContainerStyle={{ height: '85vh', width: '100%' }}
          zoom={locMarker?.zoom}
          center={locMarker?.location}
        >
          <SearchBox setLocMarker={setLocMarker} />

          {locations?.map((val: any, index: number) => {
            return (
              <Marker
                key={val?.countryIsoAlp2}
                position={{ lat: val?.lat, lng: val?.lng }}
                clickable={true}
                onClick={() => onSelect(val)}
                visible={true}
                icon={setIcon(val)}
              />
            );
          })}

          {/* 검색한 위치가 있을 시 표시한다. */}
          {locMarker && locMarker.isSearched && <Marker position={locMarker.location} />}

          <CountryInfoArea loc={locations} />

          {
            // 툴팁
            selected && (
              <InfoWindow
                position={{ lat: selected?.lat, lng: selected?.lng }}
                onCloseClick={() => onSelect(null)}
              >
                <div>
                  <p>국가: {selected?.countryNm}</p>
                  <p>
                    국가 정보: {selected?.txtOriginCn != null ? selected?.txtOriginCn : '정보없음'}
                  </p>
                </div>
              </InfoWindow>
            )
          }
        </GoogleMap>
      </GMap>
    </div>
  );
};

export default GoogleMaps;
