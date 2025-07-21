import React from 'react';
import { Input, Select, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import type { Field } from '../utils';


interface Props {
  schema: Field[];
  setSchema: (value: Field[]) => void;
}

const fieldTypes = ['string', 'number', 'float', 'boolean', 'array', 'objectId', 'nested'] as const;

export default function SchemaBuilder({ schema, setSchema }: Props): React.ReactElement {
  const handleChange = (index: number, key: keyof Field, value: any) => {
    const updated = [...schema];
    updated[index][key] = value;
    setSchema(updated);
  };

  const handleNestedChange = (index: number, children: Field[]) => {
    const updated = [...schema];
    updated[index].children = children;
    setSchema(updated);
  };

  const addField = () => {
    setSchema([...schema, { name: '', type: 'string', children: [] }]);
  };

  const removeField = (index: number) => {
    setSchema(schema.filter((_, i) => i !== index));
  };

  return (
    <div>
      {schema.map((field, index) => (
        <div key={index} className="schema-field-row">
         
           <Input
            placeholder="Field name"
            value={field.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
          />
          <Select
            placeholder="Field Type"
            style={{ width: 140 }}
            value={field.type}
            onChange={(value) => handleChange(index, 'type', value)}
            options={fieldTypes.map((type) => ({ label: type, value: type }))}
          />
          <MinusCircleOutlined onClick={() => removeField(index)} style={{ color: 'red' }} />

          {field.type === 'nested' && (
            <div style={{ marginLeft: 20, marginTop: 10 }}>
              <SchemaBuilder
                schema={field.children || []}
                setSchema={(children) => handleNestedChange(index, children)}
              />
            </div>
          )}
        </div>
      ))}
       
      <div className="schema-buttons">
        <Button type="primary" onClick={addField}>
          + Add Item
        </Button>
        <Button className="schema-submit">Submit</Button>
      </div>
    </div>
  );
}
