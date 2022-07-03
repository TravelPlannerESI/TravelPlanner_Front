export const getCookie = (name: string) => {
  const cookieKey: string = name + '=';
  let result = '';
  const cookieArr = document.cookie.split(';');

  console.log('document.cookie', document.cookie);

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === ' ') {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }

  return result;
};

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
};

export const COOKIE_NAME: string = 'JSESSIONID';
