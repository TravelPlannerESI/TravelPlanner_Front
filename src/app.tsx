import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import initialState from './.umi/plugin-initial-state/models/initialState';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import caxios from './util/caxios';
import { COOKIE_NAME, getCookie } from './util/cookie';

const loginPath = '/nologin/maps';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    const { data: resData }: any = await caxios.post('/oauth/success').catch(() => {
      history.push('/nologin/maps');
    });

    const returnData: any = {
      name: resData.name,
      avatar: resData.picture,
      email: resData.email,
      userid: resData.email,
    };

    return returnData;
  };

  const currentUrl: any = window.location;
  const url = new URL(currentUrl);
  const params = url.searchParams.get('success');

  if (history.location.pathname !== loginPath && params) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;

      console.log('getCookie(COOKIE_NAME)', getCookie(COOKIE_NAME));

      if (getCookie(COOKIE_NAME) && !initialState?.currentUser) {
        console.log('시발');
        getInitialState();
      } else if (!initialState?.currentUser && location.pathname !== loginPath) {
        console.log('시발2');
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login')}
        </>
      );
    },
    ...initialState?.settings,
  };
};
