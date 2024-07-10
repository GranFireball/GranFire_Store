import { Fragment } from "react"
import Header from "../components/header"
import "./cart.css"
import { BsFillCartFill, BsFillCartXFill } from "react-icons/bs"
import ProductCard from "../components/productCard";


const products = [
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
];


export default function Cart(){
  return(
    <Fragment>
      <Header/>
      <main className="cartContainer">
        <section className="cartProductsContainer">
          <div className="cartTitleContainer">
            <h2 className="cartTitle">Seu Carrinho</h2>
            <BsFillCartFill size={32}/>
          </div>
          <button className="clearCartButton">
            <p>Limpar Carrinho</p>
            <BsFillCartXFill size={24}/>
          </button>
        </section>
        <section className="gridCartProducts">
          {
            products.map((product, index) => {
              return(
                <ProductCard key={index} product={product} cart={true}/>
              )
            })
          }
        </section>
      </main>
      <footer className="totalPriceCartContainer">
        <p>Total: 1200</p>
        <button>Finalizar Compra</button>
      </footer>
    </Fragment>
  )
}