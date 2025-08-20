  // Format price display
  export const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
  }