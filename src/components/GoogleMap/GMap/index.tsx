import { LoadScript, useJsApiLoader } from '@react-google-maps/api';

const gMapLibraries: any = ['places'];

const GMap: React.FC = (props) => {
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  //   libraries: gMapLibraries,
  // });

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={gMapLibraries}>
      {props.children}
    </LoadScript>
  );
};

export default GMap;
