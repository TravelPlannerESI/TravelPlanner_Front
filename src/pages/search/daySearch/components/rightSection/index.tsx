import caxios from '@/util/caxios';
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  DragOutlined,
  SaveOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Select, TimePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { getZoom } from '../../utils';
import styles from './index.less';
import { theme } from './theme';
import { vehicle } from './vehicle';

const RightSection = ({
  hasPrevious,
  setHasPrevious,
  setPlanDetail,
  planDetail,
  setLocMarker,
  openDetail,
  detailForm,
}: any) => {
  const ButtonLayout = () => {
    return hasPrevious?.flag ? (
      <div style={{ paddingTop: 8 }}>
        <Button
          onClick={() => {
            setHasPrevious({
              flag: false,
              method: '',
            });

            detailForm.resetFields();
          }}
          shape="circle"
          icon={<ArrowLeftOutlined />}
        />
      </div>
    ) : (
      <div style={{ paddingTop: 8, fontWeight: 900 }}>LIST</div>
    );
  };

  const CTag = ({ optionValue, kinds }: any) => {
    const target = kinds === 'theme' ? theme : vehicle;
    return optionValue ? (
      <span
        className={styles.tag}
        style={{
          color: target[optionValue].color,
          background: target[optionValue].background,
          borderColor: target[optionValue].borderColor,
        }}
      >
        {target[optionValue].name}
      </span>
    ) : (
      <></>
    );
  };

  const handleSetting = (detail: any) => {
    setHasPrevious({
      flag: true,
      method: 'update',
    });

    const arrivalTime: any = detail?.arrivalTime && moment(detail?.arrivalTime, 'HH:mm:ss');
    const departureTime: any = detail?.departureTime && moment(detail?.departureTime, 'HH:mm:ss');

    detailForm.setFieldsValue({
      destinationName: detail?.destinationName,
      arrivalTime: arrivalTime,
      departureTime: departureTime,
      cost: detail?.cost,
      lat: detail?.lat,
      lng: detail?.lng,
      memo: detail?.memo,
      travelTheme: detail?.travelTheme,
      vehicle: detail?.vehicle,
      planDetailId: detail?.planDetailId,
    });
  };
  const handleSave = async () => {
    await detailForm.validateFields();

    let data: any = {
      ...detailForm.getFieldsValue(),
      planId: openDetail?.planId,
      travelId: 90,
    };

    if (data?.arrivalTime) {
      data.arrivalTime = moment(data.arrivalTime).format('HH:mm');
    }
    if (data?.departureTime) {
      data.departureTime = moment(data.departureTime).format('HH:mm');
    }

    await axios.post('/api/v1/planDetail', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    message.success('저장이 완료 되었습니다.');

    setHasPrevious({
      flag: false,
      method: '',
    });

    caxios.get(`/planDetail`).then((res) => {
      const resData = res.data?.data;
      const plans = resData?.plans;
      const planDetails = resData?.planDetails;

      setPlanDetail(planDetails);

      planDetails && planDetails.length !== 0
        ? planDetailLocation(planDetails)
        : navigator.geolocation.getCurrentPosition(userLocation);
    });
  };

  // 최초 로딩시 사용자의 위치정보를 가져온다.
  const planDetailLocation = (planDetails: any) => {
    let locArr: any = planDetails?.map((data: any) => {
      return { lat: Number.parseFloat(data.lat), lng: Number.parseFloat(data.lng) };
    });

    setLocMarker({
      location: locArr,
      zoom: getZoom(locArr),
    });
  };

  // 최초 로딩시 사용자의 위치정보를 가져온다.
  const userLocation = ({ coords }: any) => {
    setLocMarker({
      location: [
        {
          lat: coords?.latitude,
          lng: coords?.longitude,
        },
      ],
      zoom: 16,
    });
  };

  const handleUpdate = async () => {
    let data: any = {
      ...detailForm.getFieldsValue(),
    };

    if (data?.arrivalTime) {
      data.arrivalTime = moment(data.arrivalTime).format('HH:mm');
    }
    if (data?.departureTime) {
      data.departureTime = moment(data.departureTime).format('HH:mm');
    }

    await axios.put(`/api/v1/planDetail/${data.planDetailId}`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    message.success('수정이 완료 되었습니다.');

    caxios.get(`/planDetail`).then((res) => {
      const resData = res.data?.data;
      const planDetails = resData?.planDetails;

      setPlanDetail(planDetails);

      planDetails && planDetails.length !== 0
        ? planDetailLocation(planDetails)
        : navigator.geolocation.getCurrentPosition(userLocation);
    });

    setHasPrevious({
      flag: false,
      method: '',
    });
  };

  const convertTime = (arrivalTime: any, departureTime: any) => {
    let str: any = '';
    let transAvtime;
    let transDptime;

    if (arrivalTime) {
      transAvtime = arrivalTime.split(':')[0] + ':' + arrivalTime.split(':')[1];
    }

    if (departureTime) {
      transDptime = departureTime.split(':')[0] + ':' + departureTime.split(':')[1];
    }

    if (arrivalTime) str = transAvtime;
    if (arrivalTime || departureTime) str = str + ' ~ ';
    if (departureTime) str = str + transDptime;

    return str;
  };

  const PlanDetailForm = ({ data }: any) => {
    return (
      <>
        <div style={{ textAlign: 'center', marginBottom: 5 }}>
          <ArrowDownOutlined style={{ fontWeight: '900', color: 'black' }} />{' '}
          <CTag optionValue={data.vehicle} kinds="vehicle" />
        </div>
        <div className={styles.planDetailContainer}>
          <div className={styles.planDetailTitle}>{data?.destinationName}</div>
          <div className={styles.planDetailTime}>
            {convertTime(data.arrivalTime, data.departureTime)}
          </div>
          <div className={styles.planTypeNSetting}>
            <div style={{ flex: 3 }}>
              <CTag optionValue={data?.travelTheme} kinds="theme" />
            </div>
            <div style={{ flex: 2, textAlign: 'right' }}>
              <Button
                shape="circle"
                type="default"
                icon={<SettingOutlined />}
                onClick={() => {
                  handleSetting(data);
                }}
              />
              <Button shape="circle" type="default" icon={<DragOutlined />} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const DetailForm = () => {
    if (hasPrevious?.method === 'insert') {
      return (
        <div style={{ padding: 3 }}>
          <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 30 }}>
            여행 정보
            <div style={{ float: 'right' }}>
              <Button
                onClick={() => {
                  handleSave();
                }}
                icon={<SaveOutlined />}
              >
                저장
              </Button>
            </div>
          </div>
          <Form
            labelCol={{ span: 9 }}
            name="control-hooks"
            wrapperCol={{ span: 17 }}
            layout="horizontal"
            form={detailForm}
          >
            <Form.Item
              label="여행지 명"
              name="destinationName"
              rules={[{ required: true, message: '필수입력' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="여행 테마" name="travelTheme">
              <Select>
                <Select.Option value="TOURISM">관광</Select.Option>
                <Select.Option value="FOOD">먹방</Select.Option>
                <Select.Option value="CAFE">카페</Select.Option>
                <Select.Option value="REST">휴식</Select.Option>
                <Select.Option value="EXPERIENCE">체험</Select.Option>
                <Select.Option value="EXTREME">익스트림</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="이동 수단" name="vehicle">
              <Select>
                <Select.Option value="WALK">걸어서</Select.Option>
                <Select.Option value="SUBWAY">지하철</Select.Option>
                <Select.Option value="CAR">자동차</Select.Option>
                <Select.Option value="TRAM">트램</Select.Option>
                <Select.Option value="BUS">버스</Select.Option>
                <Select.Option value="TAXI">택시</Select.Option>
                <Select.Option value="AIRBUS">비행기</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="출발 시간" name="arrivalTime">
              <TimePicker format={'HH:mm'} />
            </Form.Item>
            <Form.Item label="도착 시간" name="departureTime">
              <TimePicker format={'HH:mm'} />
            </Form.Item>
            <Form.Item label="비용" name="cost">
              <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="메모" name="memo">
              <Input.TextArea />
            </Form.Item>
            <Form.Item hidden={true} name="lat" />
            <Form.Item hidden={true} name="lng" />
          </Form>
        </div>
      );
    } else {
      return (
        <div style={{ padding: 3 }}>
          <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 30 }}>
            여행 정보
            <div style={{ float: 'right' }}>
              <Button
                onClick={() => {
                  handleUpdate();
                }}
                icon={<SaveOutlined />}
              >
                수정
              </Button>
            </div>
          </div>
          <Form
            labelCol={{ span: 9 }}
            name="control-hooks"
            wrapperCol={{ span: 17 }}
            layout="horizontal"
            form={detailForm}
          >
            <Form.Item
              label="여행지 명"
              name="destinationName"
              rules={[{ required: true, message: '필수입력' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="여행 테마" name="travelTheme">
              <Select>
                <Select.Option value="TOURISM">관광</Select.Option>
                <Select.Option value="FOOD">먹방</Select.Option>
                <Select.Option value="CAFE">카페</Select.Option>
                <Select.Option value="REST">휴식</Select.Option>
                <Select.Option value="EXPERIENCE">체험</Select.Option>
                <Select.Option value="EXTREME">익스트림</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="이동 수단" name="vehicle">
              <Select>
                <Select.Option value="WALK">걸어서</Select.Option>
                <Select.Option value="SUBWAY">지하철</Select.Option>
                <Select.Option value="CAR">자동차</Select.Option>
                <Select.Option value="TRAM">트램</Select.Option>
                <Select.Option value="BUS">버스</Select.Option>
                <Select.Option value="TAXI">택시</Select.Option>
                <Select.Option value="AIRBUS">비행기</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="출발 시간" name="arrivalTime">
              <TimePicker format={'HH:mm'} />
            </Form.Item>
            <Form.Item label="도착 시간" name="departureTime">
              <TimePicker format={'HH:mm'} />
            </Form.Item>
            <Form.Item label="비용" name="cost">
              <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="메모" name="memo">
              <Input.TextArea />
            </Form.Item>
            <Form.Item hidden={true} name="lat" />
            <Form.Item hidden={true} name="lng" />
            <Form.Item hidden={true} name="planDetailId" />
          </Form>
        </div>
      );
    }
  };

  const Content = () => {
    let day: any = Number.MIN_VALUE;
    const dayCount = (days: any) => {
      day = days;
      return days + 1;
    };

    return hasPrevious?.flag ? (
      <div className={styles.test1} style={{ flex: 1, height: 790 }}>
        <div
          style={{
            margin: '15px 2px 15px 2px',
            backgroundColor: 'white',
            borderRadius: '15px',
            height: '99%',
          }}
        >
          <br />
          <DetailForm />
        </div>
      </div>
    ) : (
      <div className={styles.test2} style={{ flex: 1, height: 810 }}>
        {planDetail &&
          planDetail?.map((data: any) => {
            return (
              <>
                {data?.days !== day ? (
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: 'rgb(59, 89, 152)',
                      textAlign: 'left',
                    }}
                  >
                    Day-{dayCount(data?.days)} ❤
                  </div>
                ) : (
                  <></>
                )}
                <PlanDetailForm data={data} key={data?.planDetailId} />
              </>
            );
          })}
      </div>
    );
  };

  return (
    <div className={styles.searchRightSection}>
      <div
        style={{
          flex: 1,
          height: 32,
          marginBottom: 3,
          // borderBottom: '1px solid #dadce0',
          padding: '0 3px 0 3px ',
        }}
      >
        <ButtonLayout />
      </div>
      <Content />
    </div>
  );
};

export default RightSection;
