import CountryInfo from '@/components/GoogleMap/travelInfoBox';

const CountryInfoArea = (loc: any) => {
  return (
    <div style={{ display: 'flex' }}>
      <CountryInfo loc={loc} level={1} />
      <CountryInfo loc={loc} level={2} />
      <CountryInfo loc={loc} level={3} />
      <CountryInfo loc={loc} level={4} />
    </div>
  );
};

export default CountryInfoArea;
