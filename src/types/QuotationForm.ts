export type QuotationFormField = {
  label: string;
  name: string;
  type: 'text' | 'email' | 'number' | 'date' | 'textarea';
  min?: number;
  max?: number;
  readOnly?: boolean;
}

export type QuotationFormData = {
  product: string;
  unitPrice: number;
  company: string;
  contact: string;
  email: string;
  notes: string
  validity: string;
  phone: string;
  [key: string]: string | number;
};