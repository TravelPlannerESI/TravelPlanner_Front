declare namespace MapAPI {
  type LockMarker = {
    location: {
      lat: number;
      lng: number;
    };
    zoom: number;
    isSearched: boolean;
  };

  type LockMarkerWithLogin = [
    {
      location: {
        lat: number;
        lng: number;
      };
      zoom: number;
      isSearched: boolean;
      isTravelInfo: boolean | false;
    },
  ];

  type Locations = [
    {
      alarmLvl: string;
      countryIsoAlp2: string;
      countryEngNm: string;
      countryNm: string;
      lat: number;
      lng: number;
      title: string;
      txtOriginCn: string;
    },
  ];
}
