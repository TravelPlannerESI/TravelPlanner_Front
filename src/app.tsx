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

const loginPath = '/nologin/maps';

export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(gubun?: boolean): Promise<{
  settings?: Partial<LayoutSettings>;
  currentTravel?: number;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    const userInfo: any = await caxios.post('/oauth/success');

    let returnData: any = {};

    if (userInfo) {
      const resData = userInfo?.data;
      console.log(resData);
      returnData = {
        name: resData.name,
        avatar: resData.picture,
        email: resData.email,
        userid: resData.email,
      };
    }

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

// eslint-disable-next-line @typescript-eslint/no-shadow
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent currentUser={initialState?.currentUser} />,

    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: async () => {
      const { location } = history;

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        const userInfo: any = await initialState?.fetchUserInfo?.();
        setInitialState((s) => ({ ...s, currentUser: userInfo }));
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
