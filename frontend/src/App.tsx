import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import ListSaleProducts from './components/listSaleProducts'
import Cart from './pages/cart'
import ListProducts from './components/listProducts'

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<>
            <Header/>
            <ListSaleProducts/>
            <ListProducts/>
          </>}/>
        <Route path="cart" element={<Cart/>}/>
      </Route>
    </Routes>
  )
}

export default App
