import GMap from '@/components/GoogleMap/GMap';
import { GoogleMap, Marker } from '@react-google-maps/api';
import styles from './index.less';

const MiddleSection = ({ locMarker }: any) => {
  return (
    <div className={styles.searchMiddleSection}>
      <GMap>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={locMarker?.location[0]}
          zoom={locMarker?.zoom}
        >
          {locMarker?.location.map((loc: any, index: any) => {
            return (
              <Marker
                key={index}
                position={loc}
                icon={{
                  url: require(`@/components/GoogleMap/asset/pin2-1.png`),
                }}
              />
            );
          })}
        </GoogleMap>
      </GMap>
    </div>
  );
};

export default MiddleSection;
