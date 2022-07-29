export const joinStatusName = (status: string) => {
  let res = '';
  if (status === 'EMPTY') res = '수락 대기';
  else if (status === 'YES') res = '참여';
  else res = '거절';
  return res;
};
