import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import { request } from 'umi';
const { Option } = Select;
import caxios from '@/util/caxios';
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

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      Object.keys(values).forEach((k) => {
        if (k.includes('Date')) values[k] = values[k].format('YYYY-MM-DD');
      });
      console.log('Success:', values);
      request('/api/v1/travel', {
        method: 'post',
        data: values,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
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
    { value: 'KO', title: '한국' },
    { value: 'JP', title: '일본' },
  ];
  const [total, setTotal] = useState<any>({});

  const handleKeyPress = (e) => {
    console.log(e.code);
    if (e.code === 'Enter')
      caxios.get(`/users/${total.sendEmail}`).then((res) => {
        console.log(res);
        // const response = res.data.data;
        // setLocations(setDataType(response));
      });
  };
  return (
    <>
      <Modal
        visible={visible}
        title="일정추가"
        footer={[]}
        width={500}
        onCancel={() => setVisible(false)}
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
          <Form.Item {...formItemLayout} name="startDate" label="시작일" rules={ruleConfig['date']}>
            <DatePicker />
          </Form.Item>
          <Form.Item {...formItemLayout} name="endDate" label="종료일" rules={ruleConfig['date']}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="countryIsoAlp2"
            label="국가"
            rules={[{ required: true, message: 'Please select your country!' }]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
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
            name="member"
            label="국가"
            rules={[{ required: true, message: 'Please select your country!' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="select one country"
              onKeyDown={(e) => handleKeyPress(e)}
              onSearch={(e) => setTotal({ sendEmail: e })}
              optionLabelProp="label"
            >
              {/* <Option value="china" label="China">
                <div className="demo-option-label-item">
                  <span role="img" aria-label="China">
                    🇨🇳
                  </span>
                  China (中国)
                </div>
              </Option> */}
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
