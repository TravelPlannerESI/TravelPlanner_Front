declare namespace MapAPI {
  type LockMarker = {
    location: {
      lat: number;
      lng: number;
    };
    zoom: number;
    isSearched: boolean;
  };
}
