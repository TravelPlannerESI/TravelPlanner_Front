import { ArrowLeftOutlined, DragOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, TimePicker } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const RightSection = ({
  hasPrevious,
  setHasPrevious,
  planDetail,
  setPlanDetail,
  detailForm,
}: any) => {
  const [plans, setPlans] = useState<any>();

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
    setPlanDetail(detail);
  };

  const handleSave = async () => {
    await detailForm
      .validateFields()
      .then((values: any) => console.log('zz', values))
      .catch((errorInfo: any) => console.log('zz', errorInfo));

    detailForm.validateFields();
    console.log('asd', detailForm.getFieldsValue());
  };

  const PlanDetail = ({ planKey, data }: any) => {
    console.log('위치정보 객체는 여기를 확인하면 됩니다.');
    console.log(data);

    return (
      <div className={styles.planDetailContainer}>
        <div className={styles.planDetailTitle}>{data?.name}</div>
        <div className={styles.planDetailTime}>시간????</div>
        <div className={styles.planTypeNSetting}>
          <div style={{ flex: 3 }}>
            <CTag title={'어떡하지'} />

            {/* 태그로 쓸만 데이터가 있긴한데 배열에 여러개가 담겨있어서 잠시 주석 걸어놨습니다. */}
            {/* {data?.types.map((tag: string) => {
              return <CTag title={tag} />;
            })} */}
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
            name="planNm"
            rules={[{ required: true, message: '필수입력' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="여행 테마" name="theme">
            <Select>
              <Select.Option value="tourism">관광</Select.Option>
              <Select.Option value="food">먹방</Select.Option>
              <Select.Option value="cafe">카페</Select.Option>
              <Select.Option value="rest">휴식</Select.Option>
              <Select.Option value="experience">체험</Select.Option>
              <Select.Option value="extreme">익스트림</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="이동 수단" name="vehicle">
            <Select>
              <Select.Option value="walk">걸어서</Select.Option>
              <Select.Option value="subway">지하철</Select.Option>
              <Select.Option value="tram">트램</Select.Option>
              <Select.Option value="bus">버스</Select.Option>
              <Select.Option value="taxi">택시</Select.Option>
              <Select.Option value="airbus">비행기</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="출발 시간" name="startTime">
            <TimePicker />
          </Form.Item>
          <Form.Item label="도착 시간" name="endTime">
            <TimePicker />
          </Form.Item>
          <Form.Item label="비용" name="cost">
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item hidden={true} name="lat" />
          <Form.Item hidden={true} name="lng" />
        </Form>
      </div>
    );
  };

  const Content = () => {
    return hasPrevious ? (
      <div className={styles.test1} style={{ flex: 1, height: 790 }}>
        {console.log(planDetail)}
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
        {plans?.map(({ key, data }: any) => {
          return <PlanDetail planKey={key} data={data} key={data?.place_id} />;
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
