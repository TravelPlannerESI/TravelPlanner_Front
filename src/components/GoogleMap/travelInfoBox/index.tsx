const CountryInfo = ({ alarmLvl, level }: any) => {
  const setBgColor = () => {
    let bgColor = '';
    if (level === 1) return (bgColor = 'rgb(77, 119, 217)');
    else if (level === 2) return (bgColor = 'rgb(109, 210, 154)');
    else if (level === 3) return (bgColor = 'rgb(236, 218, 75)');
    else return (bgColor = 'rgb(222, 76, 79)');
  };

  const setData = () => {
    let text = '';
    if (level === 1) return (text = '입국 가능');
    else if (level === 2) return (text = '국내 격리');
    else if (level === 3) return (text = '국내/국외 격리');
    else return (text = '입국 금지 및 조회불가');
  };

  const afterTravel = () => {
    let text = '';
    if (level === 1) return (text = '지금 당장 출발!');
    else if (level === 2) return (text = '여행 후 2주 집콕');
    else if (level === 3) return (text = '최대 4주 격리');
    else return (text = '아직 그림의 떡');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '250px',
        height: '130px',
        textAlign: 'center',
        top: '650px',
        left: '100px',
        marginRight: '100px',
        backgroundColor: setBgColor(),
        cursor: 'pointer',
        borderRadius: '35px',
      }}
      // onMouseOver={() => console.log('기능추가?')}
    >
      <p style={{ fontSize: '20px', color: 'white', paddingTop: '12px' }}>{setData()}</p>
      <p style={{ fontSize: '25px', color: 'white', fontWeight: 'bold' }}>{afterTravel()}</p>
    </div>
  );
};

export default CountryInfo;
