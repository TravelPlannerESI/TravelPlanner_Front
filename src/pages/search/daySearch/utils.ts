const rad = (x) => {
  return (x * Math.PI) / 180;
};

export const getDistance = (p1, p2) => {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let tmp = Math.round(R * c);

  let d = Number.parseFloat(tmp.toFixed(1));
  // if (tmp > 1000) d = Number.parseFloat((tmp / 1000).toFixed(1));
  // else d = Number.parseFloat(tmp.toFixed(1));

  return d; // returns the distance in meter
};

// 핀 거리의 평균이 1km면 14, 2km면 15
export const getZoom = (locArr: any) => {
  let sum = 0;
  for (let i = 0; i < locArr.length; i++) {
    if (i < locArr.length - 1) {
      sum += getDistance(locArr[i], locArr[i + 1]);
    }
  }

  let calc = Math.round(sum / locArr.length / 1000);

  let zoom = 0;
  if (calc < 5) zoom = 13;
  else if (calc >= 5 && calc < 10) zoom = 12;
  else if (calc >= 10 && calc < 15) zoom = 11;
  else if (calc >= 15 && calc < 20) zoom = 10;
  else zoom = 9;

  console.log(calc);
  console.log(zoom);

  return zoom;
};

export const setTravelDate = (plans: any) => {
  let s = plans[0]?.currentDay;
  let e = plans[plans.length - 1]?.currentDay;

  let start = s.substring(5);
  let end = e.substring(5);

  return `${start} ~ ${end}`;
};
