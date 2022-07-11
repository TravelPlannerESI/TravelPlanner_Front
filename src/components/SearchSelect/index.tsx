import { Select } from 'antd';
import React from 'react';

const { Option } = Select;
type GreetingsProps = {
  placeHolder: string;
  options: any;
};

const SearchSelect: React.FC<GreetingsProps> = ({ placeHolder, options }) => (
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder={placeHolder}
    optionFilterProp="children"
    filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
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
);

export default SearchSelect;
