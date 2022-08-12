import { StandaloneSearchBox } from '@react-google-maps/api';
import { useState } from 'react';

const SearchBox = ({ locMarker, setLocMarker, setPlaces }: any) => {
  const [searchBox, setSearchBox] = useState<any>(null);

  const onLoad = (data: any) => {
    setSearchBox(data);
  };

  // input을 통해 키워드를 입력하고 엔터(enter)를 친 뒤, 제일 첫번째 data의 위치로 map이동
  const onPlacesChanged = () => {
    if (searchBox !== null && searchBox?.getPlaces() !== undefined) {
      setLocMarker({
        location: [
          {
            lat: searchBox?.getPlaces()[0]?.geometry?.location?.lat(),
            lng: searchBox?.getPlaces()[0]?.geometry?.location?.lng(),
          },
          ...locMarker?.location,
        ],
        zoom: 17, // zoom값은 숫자가 커질수록 더 가까이 보인다.
      });

      setPlaces(searchBox?.getPlaces());
    }
  };

  return (
    <div>
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="장소를 입력해주세요."
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `100%`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>
    </div>
  );
};

export default SearchBox;
