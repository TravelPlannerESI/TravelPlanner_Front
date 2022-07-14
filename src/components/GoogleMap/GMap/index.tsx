import { LoadScript } from '@react-google-maps/api';

const gMapLibraries: any = ['places'];

const GMap: React.FC = ({ children }) => {
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  //   libraries: gMapLibraries,
  // });

  return (
    <div style={{ height: '100%' }}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={gMapLibraries} language={'ko'}>
        {children}
      </LoadScript>
    </div>
  );
};

export default GMap;
