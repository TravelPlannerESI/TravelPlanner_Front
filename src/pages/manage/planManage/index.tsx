import caxios from '@/util/caxios';
import { Button, Card, Form, Input, InputNumber, Select, DatePicker, message } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import { response } from 'express';
import moment from 'moment';
import * as React from 'react';

const PlanManager = () => {
  const [beforform] = Form.useForm();
  const [afterform] = Form.useForm();
  const [locations, setLocations] = React.useState();
  const { RangePicker } = DatePicker;

  const [total, setTotal] = React.useState({
    userEmails: [],
    sendEmail: '',
  });

  React.useEffect(() => {
    caxios.get(`/country`).then((res) => {
      const response = res?.data.data;
      response && setLocations(setDataType(response));
    });

    const setDataType: any = (res: any) => {
      return res?.map((data: any) => {
        let newObj: any = {};
        newObj['value'] = data.countryNm;
        newObj['title'] = data.countryNm;
        return newObj;
      });
    };

    caxios.get('/manage/travel').then((res) => {
      beforform.setFieldsValue({
        travelName: res.data.data?.travelName,
        countryIsoAlp2: res.data.data?.countryIsoAlp2,
        rangeDate: [moment(res.data.data?.startDate), moment(res.data.data?.endDate)],
        totalCost: res.data.data?.totalCost,
        membersEmail: res.data.data.membersEmail,
      });
    });
  }, []);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
  };

  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current <= moment().add(-1, 'days').endOf('day');
  };

  const handleKeyPress = (e) => {
    if (!!total.sendEmail)
      if (e.code === 'Enter') {
        caxios.get(`/users/${total.sendEmail}`).then((res) => {
          setTotal({ userEmails: res.data.data, sendEmail: '' });
        });
      }
  };

  const onCheck = () => {
    const afterData: any = afterform.getFieldsValue();
    console.log('afterData', afterData);
    if (
      !afterData.countryIsoAlp2 &&
      (!afterData.membersEmail || afterData.membersEmail?.length === 0) &&
      !afterData.rangeDate &&
      !afterData.totalCost &&
      !afterData.travelName
    ) {
      message.error('수정할 내용이 없습니다.');
      return;
    }

    const requestData = {
      travelName: afterData.travelName,
      membersEmail: afterData.membersEmail,
      totalCost: afterData.totalCost,
      countryIsoAlp2: afterData.countryIsoAlp2,
    };

    if (afterData?.rangeDate && afterData?.rangeDate.length > 0)
      requestData['startDate'] = afterData['rangeDate'][0].format('YYYY-MM-DD');
    if (afterData?.rangeDate && afterData?.rangeDate.length > 1)
      requestData['endDate'] = afterData['rangeDate'][1].format('YYYY-MM-DD');

    caxios.put('/travel', requestData).then((e: any) => {
      if (e) {
        message.info('수정이 완료되었습니다.');
        afterform.resetFields();
        caxios.get('/manage/travel').then((res) => {
          beforform.setFieldsValue({
            travelName: res.data.data?.travelName,
            countryIsoAlp2: res.data.data?.countryIsoAlp2,
            rangeDate: [moment(res.data.data?.startDate), moment(res.data.data?.endDate)],
            totalCost: res.data.data?.totalCost,
            membersEmail: res.data.data.membersEmail,
          });
        });
      }
    });
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: 5 }}>
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 25 }}>일정 관리</div>

      <Card style={{ borderRadius: '1em', height: 500 }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: 'center', fontWeight: 600, marginBottom: 10 }}>변경 전</div>
            <Form form={beforform} name="dynamic_rule" disabled={true}>
              <Form.Item {...formItemLayout} name="travelName" label="여행이름">
                <Input />
              </Form.Item>
              <Form.Item {...formItemLayout} name="rangeDate" label="여행기간" {...rangeConfig}>
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item {...formItemLayout} name="countryIsoAlp2" label="국가">
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option!.children as unknown as string).includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA!.children as unknown as string)
                      ?.toLowerCase()
                      ?.localeCompare((optionB!.children as unknown as string)?.toLowerCase())
                  }
                >
                  {locations?.map((o, idx) => (
                    <Option value={o.value} key={idx}>
                      {o.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item {...formItemLayout} name="totalCost" label="총 비용">
                <InputNumber
                  min={1}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} name="membersEmail" label="멤버">
                <Input.TextArea />
              </Form.Item>
              <div style={{ marginLeft: '25%', fontWeight: '600', color: 'gray' }}>
                멤버 : 수락을 했거나 대기중인 상태 입니다.
              </div>
            </Form>
          </div>
          <div style={{ flex: 1, marginBottom: 30 }}>
            <div style={{ fontWeight: 600, color: 'gray' }}>내용을 작성한 부분만 수정 됩니다.</div>
            <div style={{ fontWeight: 600, marginBottom: 8 }} />
            <Form form={afterform} name="dynamic_rule">
              <Form.Item {...formItemLayout} name="travelName">
                <Input placeholder="여행이름" />
              </Form.Item>
              <Form.Item {...formItemLayout} name="rangeDate" {...rangeConfig}>
                <RangePicker
                  disabledDate={disabledDate}
                  style={{ width: '100%' }}
                  placeholder={['시작일', '종료일']}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} name="countryIsoAlp2">
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder={'국가'}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option!.children as unknown as string).includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA!.children as unknown as string)
                      ?.toLowerCase()
                      ?.localeCompare((optionB!.children as unknown as string)?.toLowerCase())
                  }
                >
                  {locations?.map((o, idx) => (
                    <Option value={o.value} key={idx}>
                      {o.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item {...formItemLayout} name="totalCost">
                <InputNumber
                  min={1}
                  placeholder="총 비용"
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} name="membersEmail">
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="멤버"
                  onKeyDown={(e) => handleKeyPress(e)}
                  onSearch={(e) => setTotal({ sendEmail: e })}
                  optionLabelProp="label"
                >
                  {total?.userEmails?.map((elme, idx) => (
                    <Option value={elme} label={elme} key={idx}>
                      <div className="demo-option-label-item">{elme}</div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Button type="primary" onClick={onCheck}>
            수정
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PlanManager;
