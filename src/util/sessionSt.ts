export const setSession = (inviteCode: string) => {
  sessionStorage.setItem('inviteCode', inviteCode);
};

export const getSession = (inviteCode: string) => {
  return sessionStorage.getItem(inviteCode);
};
