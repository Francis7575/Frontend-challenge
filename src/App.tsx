import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import './App.css'
import QuotationForm from './pages/QuotationForm'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/quotation-form/:id" element={<QuotationForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App