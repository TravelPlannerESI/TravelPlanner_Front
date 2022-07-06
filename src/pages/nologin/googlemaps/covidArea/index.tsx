import { InfoWindow, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const CovidArea = (locations: any) => {
  const [selected, setSelected] = useState<any>(null); // marker를 선택하면 그 위치에 대한 정보를 담는다.

  // Marker를 클릭하면 정보를 가지고온다.
  const onSelect = (val: any) => {
    console.log('onselect', val);
    setSelected(val);
  };

  // Marker icon변경
  const setIcon = (loc: any): google.maps.Icon => {
    let alarmLvl: number = 0;

    if (loc?.alarmLvl === 1) alarmLvl = 1;
    else if (loc?.alarmLvl === 2) alarmLvl = 2;
    else if (loc?.alarmLvl === 3) alarmLvl = 3;
    else alarmLvl = 4;

    return {
      url: require(`../../../../components/GoogleMap/asset/${alarmLvl}.png`),
      scaledSize: new google.maps.Size(20, 20),
    };
  };

  return (
    <div>
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

      {
        // 툴팁
        selected && (
          <InfoWindow
            position={{ lat: selected?.lat, lng: selected?.lng }}
            onCloseClick={() => onSelect(null)}
          >
            <div>
              <p>국가: {selected?.countryNm}</p>
              <p>국가 정보: {selected?.txtOriginCn != null ? selected?.txtOriginCn : '정보없음'}</p>
            </div>
          </InfoWindow>
        )
      }
    </div>
  );
};

export default CovidArea;
