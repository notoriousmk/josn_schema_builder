import React, { useState } from 'react';
import { Card } from 'antd';
import SchemaBuilder from './components/SchemaBuilder';
import { buildJSON, defaultField } from './utils';
import type { Field } from './utils';

export default function JsonSchemaBuilderApp(): React.ReactElement {
  const [schema, setSchema] = useState<Field[]>([defaultField()]);


   return (
      <div className="app-container">
       <div className="schema-section">
            <Card title="JSON Schema Builder">
                <SchemaBuilder schema={schema} setSchema={setSchema} />
            </Card>
            </div>
             <div className="output-section">
             <Card title="JSON Output">
                <pre>{JSON.stringify(buildJSON(schema), null, 2)}</pre>
             </Card>
            </div>
       </div>
  );

}
