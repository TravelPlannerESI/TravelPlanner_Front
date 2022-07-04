import { StandaloneSearchBox } from '@react-google-maps/api';
import React, { useState } from 'react';

const SearchBox = ({ setLocMarker }: any) => {
  const [searchBox, setSearchBox] = useState<any>(null);

  const onLoad = (data: any) => {
    setSearchBox(data);
  };

  // searchBox 검색을 통해 장소 data가 제공되면, 제일 첫번째 data의 위치로 map이동
  const onPlacesChanged = () => {
    if (searchBox !== null && searchBox?.getPlaces() !== undefined) {
      setLocMarker({
        location: {
          lat: searchBox?.getPlaces()[0]?.geometry?.location?.lat(),
          lng: searchBox?.getPlaces()[0]?.geometry?.location?.lng(),
        },
        zoom: 17, // zoom값은 숫자가 커질수록 더 가까이 보인다.
        isSearched: true,
      });
    }
  };

  // 목록을 클릭할 때 마다 그 위치로 지도 이동
  // const onClick = (geo: any) => {
  //   // console.log(geo.location.lat())
  //   // console.log(geo.location.lng())
  //   setLocMarker({
  //     location: {
  //       lat: geo.location.lat(),
  //       lng: geo.location.lng(),
  //     },
  //     zoom: 17,
  //     isSearched: true,
  //   });
  // };

  return (
    <div>
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Enter the place"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: 'absolute',
            left: '50%',
            marginLeft: '-120px',
          }}
        />
      </StandaloneSearchBox>

      {/* <div
        style={{ width: '100%', height: '300px', backgroundColor: 'lightGray', marginTop: '50px' }}
      >
        {places.map(({ place_id, formatted_address, name, geometry }: any) => {
          return (
            <p key={place_id} onClick={() => onClick(geometry)}>
              {formatted_address}
              <br /> {name}
            </p>
          );
        })}
      </div> */}
    </div>
  );
};

export default SearchBox;
