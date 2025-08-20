import { QuotationFormField } from "../types/QuotationForm";

export const inputGroups = [
  ["product", "unitPrice"], 
  ["company", "contact"], 
  ["email", "phone"], 
  ["validity"], 
  ["notes"], 
];

export const QuotationFormInfo: QuotationFormField[] = [
  { label: "Company Name", name: "company", type: "text" },
  { label: "Contact Person", name: "contact", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone", name: "phone", type: "text" },
  { label: "Address", name: "address", type: "text" },
  { label: "Product / Service", name: "product", type: "text", readOnly: true },
  { label: "Unit Price", name: "unitPrice", type: "text", min: 0, readOnly: true },
  { label: "Validity Date", name: "validity", type: "date" },
  { label: "Additional Notes", name: "notes", type: "textarea" },
];
