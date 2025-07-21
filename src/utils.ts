export type FieldType = 'string' | 'number' | 'float' | 'boolean' | 'array' | 'objectId' | 'nested';

export interface Field {
  name: string;
  type: FieldType;
  children?: Field[];
}

export const defaultField = (): Field => ({
  name: '',
  type: 'string',
  children: [],
});

export const getDefaultValue = (
  type: FieldType
): string | number | boolean | object | any[] => {
  switch (type) {
    case 'string':
      return '"STRING"';
    case 'number':
      return 0;
    case 'float':
      return 0.0;
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'objectId':
      return '"ObjectId"';
    case 'nested':
      return {};
    default:
      return '""';
  }
};

export const buildJSON = (fields: Field[]): object => {
  const result: Record<string, any> = {};
  fields.forEach((field) => {
    if (!field.name) return;
    if (field.type === 'nested') {
      result[field.name] = buildJSON(field.children || []);
    } else {
      result[field.name] = getDefaultValue(field.type);
    }
  });
  return result;
};
