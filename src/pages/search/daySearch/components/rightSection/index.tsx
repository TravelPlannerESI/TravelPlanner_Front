import caxios from '@/util/caxios';
import { ArrowLeftOutlined, DragOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, TimePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import styles from './index.less';

const RightSection = ({
  hasPrevious,
  setHasPrevious,
  setPlanDetail,
  planDetail,
  openDetail,
  detailForm,
}: any) => {
  const ButtonLayout = () => {
    return hasPrevious ? (
      <div style={{ paddingTop: 8 }}>
        <Button onClick={() => setHasPrevious(false)} shape="circle" icon={<ArrowLeftOutlined />} />
      </div>
    ) : (
      <div style={{ paddingTop: 8, fontWeight: 900 }}>LIST</div>
    );
  };

  const CTag = ({ title }: any) => {
    return (
      <span
        className={styles.tag}
        style={{
          color: '#cf1322',
          background: '#fff1f0',
          borderColor: '#ffa39e',
        }}
      >
        {title}
      </span>
    );
  };

  const handleSetting = (detail: any) => {
    setHasPrevious(true);

    detailForm.setFieldsValue({
      destinationName: detail?.destinationName,
      arrivalTime: detail?.arrivalTime,
      cost: detail?.cost,
      departureTime: detail?.departureTime,
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
  };

  const convertTime = (arrivalTime: any, departureTime: any) => {
    let str: any = '';

    console.log('departureTime', departureTime);

    if (arrivalTime) str = arrivalTime;
    if (arrivalTime || departureTime) str = str + ' ~ ';
    if (departureTime) str = str + departureTime;

    return str;
  };

  const PlanDetailForm = ({ data }: any) => {
    console.log('data', data);
    return (
      <div className={styles.planDetailContainer}>
        <div className={styles.planDetailTitle}>{data?.destinationName}</div>
        <div className={styles.planDetailTime}>
          {convertTime(data.arrivalTime, data.departureTime)}
        </div>
        <div className={styles.planTypeNSetting}>
          <div style={{ flex: 3 }}>
            <CTag title={data?.vehicle} />
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
    );
  };

  const DetailForm = () => {
    return (
      <div style={{ padding: 3 }}>
        <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 30 }}>
          ?????? ??????
          <div style={{ float: 'right' }}>
            <Button
              onClick={() => {
                handleSave();
              }}
              icon={<SaveOutlined />}
            >
              ??????
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
            label="????????? ???"
            name="destinationName"
            rules={[{ required: true, message: '????????????' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="?????? ??????" name="travelTheme">
            <Select>
              <Select.Option value="TOURISM">??????</Select.Option>
              <Select.Option value="FOOD">??????</Select.Option>
              <Select.Option value="CAFE">??????</Select.Option>
              <Select.Option value="REST">??????</Select.Option>
              <Select.Option value="EXPERIENCE">??????</Select.Option>
              <Select.Option value="EXTREME">????????????</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="?????? ??????" name="vehicle">
            <Select>
              <Select.Option value="WALK">?????????</Select.Option>
              <Select.Option value="SUBWAY">?????????</Select.Option>
              <Select.Option value="CAR">?????????</Select.Option>
              <Select.Option value="TRAM">??????</Select.Option>
              <Select.Option value="BUS">??????</Select.Option>
              <Select.Option value="TAXI">??????</Select.Option>
              <Select.Option value="AIRBUS">?????????</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="?????? ??????" name="arrivalTime">
            <TimePicker />
          </Form.Item>
          <Form.Item label="?????? ??????" name="departureTime">
            <TimePicker />
          </Form.Item>
          <Form.Item label="??????" name="cost">
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item hidden={true} name="lat" />
          <Form.Item hidden={true} name="lng" />
          <Form.Item hidden={true} name="planDetailId" />
        </Form>
      </div>
    );
  };

  const Content = () => {
    return hasPrevious ? (
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
            return <PlanDetailForm data={data} key={data?.planDetailId} />;
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
