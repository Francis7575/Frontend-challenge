import { categories, products, suppliers } from '../data/products'
import './ProductFilters.css'

interface PriceRange {
  min: number
  max: number
}

interface ProductFiltersProps {
  selectedCategory: string
  selectedSupplier: string
  searchQuery: string
  sortBy: string
  priceRange: PriceRange
  onCategoryChange: (category: string) => void
  onSupplierChange: (supplier: string) => void
  onSearchChange: (search: string) => void
  onSortChange: (sort: string) => void
  onPriceRangeChange: (range: PriceRange) => void
}

const ProductFilters = ({
  selectedCategory,
  searchQuery,
  selectedSupplier,
  sortBy,
  onCategoryChange,
  onSupplierChange,
  onSearchChange,
  onSortChange,
  priceRange,
  onPriceRangeChange
}: ProductFiltersProps) => {

  // Calculate product count per supplier
  const suppliersWithCounts = suppliers.map(supplier => ({
    ...supplier,
    products: products.filter(p => p.supplier === supplier.id).length
  }))

  // Get min and max prices from all products
  const allPrices = products.map(p => p.basePrice)
  const minProductPrice = Math.min(...allPrices)
  const maxProductPrice = Math.max(...allPrices)

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
  }

  return (
    <div className="product-filters">
      <div className="filters-card">
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-box">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Buscar productos, SKU..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input p1"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => onSearchChange('')}
              >
                <span className="material-icons">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Categorías</h3>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.id)}
              >
                <span className="material-icons">{category.icon}</span>
                <span className="category-name l1">{category.name}</span>
                <span className="category-count l1">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Ordenar por</h3>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select p1"
          >
            <option value="name">Nombre A-Z</option>
            <option value="price-asc">Precio Ascendente</option>
            <option value="price-desc">Precio Descente</option>
            <option value="stock">Stock disponible</option>
          </select>
        </div>

        {/* Quick Stats - Bug: hardcoded values instead of dynamic */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Proveedores</h3>
          <div className="supplier-list">
            {suppliersWithCounts.map(supplier => (
              <button
                key={supplier.id}
                className={`supplier-item ${selectedSupplier === supplier.id ? 'active' : ''}`}
                onClick={() => onSupplierChange(supplier.id)}
              >
                <span className="supplier-name l1">{supplier.name}</span>
                <span className="supplier-count l1">({supplier.products})</span>
              </button>
            ))}
          </div>
          <div className="filter-section">
            <h3 className="filter-title p1-medium">Rango de precios</h3>
            <div className="price-range-slider">
              <input
                type="range"
                min={minProductPrice}
                max={maxProductPrice}
                value={priceRange.max}
                onChange={(e) =>
                  onPriceRangeChange({ ...priceRange, max: Number(e.target.value) })
                }
                className="range-slider single-slider"
              />
              <div className="price-values">
                <span>
                  Desde {formatPrice(minProductPrice)} hasta {formatPrice(priceRange.max)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters