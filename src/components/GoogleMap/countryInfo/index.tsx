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

  return (
    <div
      style={{
        position: 'relative',
        width: '250px',
        height: '130px',
        textAlign: 'center',
        top: '550px',
        left: '100px',
        marginRight: '100px',
        backgroundColor: setBgColor(),
        cursor: 'pointer',
      }}
      onMouseOver={() => console.log('기능추가?')}
    >
      <p style={{ fontSize: '20px', color: 'white' }}>{setData()}</p>
    </div>
  );
};

export default CountryInfo;
