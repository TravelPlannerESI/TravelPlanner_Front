import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select, InputNumber } from 'antd';
import { request, useModel } from 'umi';
import caxios from '@/util/caxios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

const formSearchLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 1, offset: 2 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10, offset: 10 },
};

const TravelFormModal = ({ visible, setVisible }: any) => {
  const [form] = Form.useForm();

  const afterClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const success = (inviteCode: any) => {
    Modal.success({
      content: (
        <>
          <Input readOnly={true} defaultValue={inviteCode} style={{ width: '60%' }} />
          <CopyToClipboard text={inviteCode}>
            <Button type="primary"> 복사 </Button>
          </CopyToClipboard>
        </>
      ),
      afterClose: () => afterClose(),
    });
  };

  const fail = () => {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      const resultObj = { isSuccess: true, inviteCode: '' };
      values['startDate'] = values['rangeDate'][0].format('YYYY-MM-DD');
      values['endDate'] = values['rangeDate'][1].format('YYYY-MM-DD');
      delete values.rangeDate;
      request('/api/v1/travel', {
        method: 'post',
        data: values,
      })
        .then(function (response) {
          resultObj.inviteCode = response.data.inviteCode;
        })
        .catch(function (error) {
          resultObj.isSuccess = false;
        })
        .finally(() => (resultObj.isSuccess ? success(resultObj.inviteCode) : fail()));
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
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

  const options = [
    { value: '한국', title: '한국' },
    { value: '일본', title: '일본' },
  ];
  const [total, setTotal] = useState({
    userEmails: [],
    sendEmail: '',
  });

  const handleKeyPress = (e) => {
    if (!!total.sendEmail)
      if (e.code === 'Enter') {
        caxios.get(`/users/${total.sendEmail}`).then((res) => {
          setTotal({ userEmails: res.data.data, sendEmail: '' });
        });
      }
  };

  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current <= moment().add(-1, 'days').endOf('day');
  };
  return (
    <>
      <Modal
        visible={visible}
        title="일정추가"
        footer={[]}
        width={500}
        onCancel={() => {
          form.resetFields();
          setVisible(false);
        }}
      >
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
            <RangePicker disabledDate={disabledDate} />
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
                  .toLowerCase()
                  .localeCompare((optionB!.children as unknown as string).toLowerCase())
              }
            >
              {options.map((o, idx) => (
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
      </Modal>
    </>
  );
};

export default TravelFormModal;
