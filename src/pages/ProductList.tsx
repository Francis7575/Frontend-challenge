import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import { products as allProducts } from '../data/products'
import { Product } from '../types/Product'
import './ProductList.css'

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const minPrice = Math.min(...allProducts.map(p => p.basePrice))
  const maxPrice = Math.max(...allProducts.map(p => p.basePrice))
  const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  // Filter and sort products based on criteria
  const filterProducts = (category: string, search: string, sort: string, supplier: string, range: { min: number; max: number }) => {
    setLoading(true)
    setError(null);
    setTimeout(() => {
      try {
        let filtered = [...allProducts]
        // Category filter
        if (category !== 'all') {
          filtered = filtered.filter(product => product.category === category)
        }

        // Search filter
        if (search) {
          const lowerSearch = search.toLowerCase()
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(lowerSearch) ||
            product.sku.toLowerCase().includes(lowerSearch)
          )
        }

        // Supplier filter
        if (supplier) {
          filtered = filtered.filter(product => product.supplier === supplier)
        }

        // Price range filter
        filtered = filtered.filter(p => p.basePrice >= range.min && p.basePrice <= range.max)

        // Sorting logic
        switch (sort) {
          case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name))
            break
          case 'price-asc':
            filtered.sort((a, b) => a.basePrice - b.basePrice)
            break
          case 'price-desc':
            filtered.sort((a, b) => b.basePrice - a.basePrice)
            break
          case 'stock':
            filtered.sort((a, b) => b.stock - a.stock)
            break
          default:
            break
        }
        setFilteredProducts(filtered)

      } catch (err) {
        console.error(err);
        setError('Ocurrió un error al filtrar los productos. Intenta nuevamente.');
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterProducts(category, searchQuery, sortBy, selectedSupplier, priceRange)
  }

  const handleSearchChange = (search: string) => {
    setSearchQuery(search)
    filterProducts(selectedCategory, search, sortBy, selectedSupplier, priceRange)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    filterProducts(selectedCategory, searchQuery, sort, selectedSupplier, priceRange)
  }

  const handleSupplierChange = (supplierId: string) => {
    setSelectedSupplier(supplierId)
    filterProducts(selectedCategory, searchQuery, sortBy, supplierId, priceRange)
  }

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    setPriceRange(range)
    filterProducts(selectedCategory, searchQuery, sortBy, selectedSupplier, range)
  }

  const handleClearFilters = () => {
    setSelectedCategory('all')
    setSelectedSupplier('')
    setSearchQuery('')
    setSortBy('name')
    setPriceRange({ min: minPrice, max: maxPrice })
    filterProducts('all', '', 'name', '', { min: minPrice, max: maxPrice })
  }

  return (
    <div className="product-list-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-info">
            <h1 className="page-title h2">Catálogo de Productos</h1>
            <p className="page-subtitle p1">
              Descubre nuestra selección de productos promocionales premium
            </p>
          </div>

          <div className="page-stats">
            <div className="stat-item">
              <span className="stat-value p1-medium">{filteredProducts.length}</span>
              <span className="stat-label l1">productos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value p1-medium">
                {Array.from(new Set(allProducts.map(p => p.category))).length}
              </span>
              <span className="stat-label l1">categorías</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ProductFilters
          selectedCategory={selectedCategory}
          selectedSupplier={selectedSupplier}
          searchQuery={searchQuery}
          priceRange={priceRange}
          onPriceRangeChange={handlePriceRangeChange}
          sortBy={sortBy}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onSupplierChange={handleSupplierChange}
          onClearFilters={handleClearFilters}
        />

        {/* Products Grid */}
        <div className="products-section">
          {loading ? (
            <div className="loading-state">
              <span className="material-icons spin">hourglass_top</span>
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <span className="material-icons">error_outline</span>
              <p>{error}</p>
              <button
                className="btn btn-primary cta1"
                onClick={() => filterProducts(selectedCategory, searchQuery, sortBy, selectedSupplier, priceRange)}
              >
                Reintentar
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <span className="material-icons">search_off</span>
              <h3 className="h2">No hay productos</h3>
              <p className="p1">No se encontraron productos que coincidan con tu búsqueda.</p>
              <button
                className="btn btn-primary cta1"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  filterProducts('all', '', sortBy, selectedSupplier, priceRange)
                }}
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList