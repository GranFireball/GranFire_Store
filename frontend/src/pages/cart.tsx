import { Fragment, useContext } from "react"
import "./cart.css"
import { BsFillCartFill, BsFillCartXFill } from "react-icons/bs"
import ProductCard from "../components/productCard";
import { UserContext } from "../context/userContext";
import { ProductContext } from "../context/productContext";
import { TProduct, TProductToBuy } from "../types";

export default function Cart(){
  const userContext = useContext(UserContext);
  const productContext = useContext(ProductContext);
  
  function calculateProductDiscount(product: TProduct){
    const discountValue = (product.sale!/ 100) * Number(product.price.replace(",", "."));
    const newPrice = Number(product.price.replace(",", ".")) - discountValue;
    return newPrice.toFixed(2);
  }

  function calculateTotalPrice(){
    if(!userContext?.user?.cart){
      return;
    }
    let total = 0;
    for(const productCart of userContext.user.cart){
      const product = productContext?.products?.find((product) => product.id === productCart.id);
      if(product){
        if(product.sale > 0){
          const newPrice = calculateProductDiscount(product);
          total += Number(newPrice) * productCart.qt;
        }
        else{
          total += Number(product?.price.replace(",", ".")) * productCart.qt;
        }
      }
    }
    return total.toFixed(2).replace(".", ",");
  }

  async function buy(){
    const allItems = [];
    if(!productContext || !productContext.products){
      return;
    }

    for(const product of productContext.products){
      const productInCart = userContext?.user?.cart.find((productCart) => productCart.id === product.id)
      if(productInCart){
        let productPrice = product.price;
        if(product.sale > 0){
          productPrice = calculateProductDiscount(product);
        }
        const productToBuy:TProductToBuy = {
          id: product.id,
          name: product.name,
          price: productPrice,
          sale: product.sale,
          qt: productInCart.qt
        }
        allItems.push(productToBuy);
      }
      
    }
   
    try{
      const res = await fetch("http://127.0.0.1:5000/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({allItems}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      if(data.Error){
        alert(data.Error);
      }
      window.open(data.url,"_self");
    }
    catch(err){
      alert(err);
    }
  }

  return(
    <Fragment>
      <main className="cartContainer">
        <section className="paymentMethodsContainer">
          <div className="paymentMethodTitle">
            <h2>Formas de Pagamento</h2>
            <span>IMPORTANTE: o <u>Número do Cartão</u> será necessário para realizar a compra</span>
          </div>
          <div className="paymentMethodContainer">
            <h3>Visa</h3>
            <p>Número do Cartão: <strong>4242 4242 4242 4242</strong></p>
          </div>
          <div className="paymentMethodContainer">
            <h3>Mastercard</h3>
            <p>Número do Cartão: <strong>5555 5555 5555 4444</strong></p>
          </div>
        </section>
        <section className="cartProductsContainer">
          <div className="cartTitleContainer">
            <h2 className="cartTitle">Seu Carrinho</h2>
            <BsFillCartFill size={32}/>
          </div>
          <button className="clearCartButton" onClick={() => userContext?.clearCart()}>
            <p>Limpar Carrinho</p>
            <BsFillCartXFill size={24}/>
          </button>
        </section>
        <section className="gridCartProducts">
          {
            productContext?.products?.map((product, index) => {
              const productInCart = userContext?.user?.cart.find((productCart) => productCart.id === product.id)
              if(productInCart){
                return(
                  <ProductCard key={index} product={product} qt={productInCart.qt} cart={true} />
                )
              }
            })
          }
        </section>
      </main>
      <footer className="totalPriceCartContainer">
        <p>Total: R$ {calculateTotalPrice()}</p>
        <button style={{display: Number(calculateTotalPrice()?.replace(",", ".")) > 0 ? "block":"none"}} onClick={() => buy()}>Finalizar Compra</button>
      </footer>
    </Fragment>
  )
}