import { useState } from 'react';
import { inputGroups, QuotationFormInfo } from '../data/quotation-form';
import { QuotationFormData } from '../types/QuotationForm';
import './QuotationForm.css';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { formatPrice } from '../utils/utils';

const QuotationForm = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const [formData, setFormData] = useState<QuotationFormData>({
    company: '',
    contact: '',
    email: '',
    validity: '',
    phone: '',
    notes: '',
    product: product ? product.name : '',
    unitPrice: product ? product.basePrice : 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const printQuotation = () => {
    const printContents = document.getElementById('quotation-summary')?.innerHTML;
    if (!printContents) return;

    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    printQuotation();
  };

  return (
    <div className='quotation-form-wrapper'>
      <h2>Quotation Simulator</h2>
      <form onSubmit={handleSubmit} className='form'>
        {inputGroups.map((group, rowIdx) => (
          <div key={rowIdx} className="input-row">
            {group.map((fieldName) => {
              const field = QuotationFormInfo.find(f => f.name === fieldName);
              if (!field) return null;

              return (
                <div key={field.name} className='input-wrapper'>
                  <label htmlFor={`${field.name}-${rowIdx}`}>{field.label}:</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className='input-field'
                      id={`${field.name}-${rowIdx}`}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  ) : (
                    <input
                      className='input-field'
                      id={`${field.name}-${rowIdx}`}
                      type={field.type}
                      name={field.name}
                      value={field.name === 'unitPrice' ? formatPrice(Number(formData[field.name])) : formData[field.name]}
                      onChange={field.readOnly ? undefined : handleInputChange}
                      min={field.min}
                      max={field.max}
                      readOnly={field.readOnly}
                      required
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div>
          <button className='btn btn-secondary'>
            Generate Quotation
          </button>
        </div>
      </form>

      <div id="quotation-summary" style={{ display: 'none' }}>
        <h2>Quotation Summary</h2>
        <p>Company: {formData.company}</p>
        <p>Contact: {formData.contact}</p>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phone}</p>
        <p>Product: {formData.product}</p>
        <p>Unit Price: {formData.unitPrice}</p>
        <p>Discount: {formData.discount}</p>
        <p>Validity: {formData.validity}</p>
        <p>Notes: {formData.notes}</p>
      </div>

    </div>
  );
};

export default QuotationForm;
