import { QuotationFormField } from "../types/QuotationForm";

export const inputGroups = [
  ["product", "unitPrice"],
  ["company", "contact"],
  ["email", "phone"],
  ["validity"],
  ["notes"],
];

export const QuotationFormInfo: QuotationFormField[] = [
  { label: "Nombre de Empresa", name: "company", type: "text" },
  { label: "Persona de Contacto", name: "contact", type: "text" },
  { label: "Correo Electrónico", name: "email", type: "email" },
  { label: "Numero de Teléfono", name: "phone", type: "text" },
  { label: "Dirección", name: "address", type: "text" },
  {
    label: "Producto / Servicio",
    name: "product",
    type: "text",
    readOnly: true,
  },
  {
    label: "Precio Unitario",
    name: "unitPrice",
    type: "text",
    min: 0,
    readOnly: true,
  },
  { label: "Fecha de Validez", name: "validity", type: "date" },
  { label: "Notas Adicionales", name: "notes", type: "textarea" },
];
