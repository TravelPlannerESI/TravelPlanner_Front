import caxios from '@/util/caxios';
import { FieldRangePicker } from '@ant-design/pro-components';
import { Button, Card, Form, Input, InputNumber, Select } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import * as React from 'react';

const PlanManager = () => {
  const [form] = Form.useForm();
  const [locations, setLocations] = React.useState();

  const [total, setTotal] = React.useState({
    userEmails: [],
    sendEmail: '',
  });

  React.useEffect(() => {
    caxios.get(`/country`).then((res) => {
      setLocations(res?.data.data);
    });
  }, []);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
  };

  const ruleConfig = {
    default: [
      {
        required: true,
        message: '내용을 입력해주세요',
      },
    ],
    date: [
      {
        required: true,
        message: '날짜를 입력해주세요',
      },
    ],
  };

  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current <= moment().add(-1, 'days').endOf('day');
  };

  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10, offset: 10 },
  };

  const onCheck = () => {
    console.log('check');
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: 5 }}>
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 25 }}>일정 관리</div>
      <Card style={{ borderRadius: '1em', height: 500 }}>
        <Form form={form} name="dynamic_rule">
          <Form.Item
            {...formItemLayout}
            name="travelName"
            label="여행이름"
            rules={ruleConfig['default']}
          >
            <Input placeholder="Please input your name" />
          </Form.Item>
          <Form.Item {...formItemLayout} name="rangeDate" label="여행기간" {...rangeConfig}>
            <FieldRangePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="countryIsoAlp2"
            label="국가"
            rules={[{ required: true, message: 'Please select your country!' }]}
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder={'123'}
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
          <Form.Item
            {...formItemLayout}
            name="totalCost"
            label="총 비용"
            rules={[{ required: true, message: '비용을 입력해주세요.' }]}
          >
            <InputNumber
              min={1}
              placeholder="총 비용"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} name="membersEmail" label="멤버">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="select one country"
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
          <Form.Item {...formTailLayout}>
            <Button type="primary" onClick={onCheck}>
              저장
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PlanManager;
