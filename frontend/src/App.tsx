import { Route, Routes } from 'react-router-dom'
import Cart from './pages/cart'
import Store from './pages/store'
import Header from './components/header'
import { ProductContext } from './context/productContext'
import SuccessPayment from './pages/successPayment'
import { Fragment, useContext, useEffect } from 'react'
import ProductStock from './pages/productStock'

function App() {
  const productContext = useContext(ProductContext);

  useEffect(() => {
    if(productContext?.products){
      return;
    }
    fetch("http://localhost:5000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((json) => {
      productContext?.getProducts(json);
    })
    .catch((err) => alert(err))
  }, [])

  return (
    <Fragment>
      <Header/>
      <Routes>
        <Route path="/">
          <Route index element={<Store/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="success-payment" element={<SuccessPayment/>}/>
          <Route path="stock" element={<ProductStock/>}/>
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
