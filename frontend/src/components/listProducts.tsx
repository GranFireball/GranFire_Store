import ProductCard from "./productCard";
import "./listProducts.css";
import { TProduct } from "../types";
import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import { UserContext } from "../context/userContext";

const products = [
  {id: "12", name: "Produto 1", price: "25,40", sale: 70},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
  {id: "12", name: "Produto 1", price: "25,40"},
];


export default function ListProducts(){
  const userContext = useContext(UserContext);
  const productContext = useContext(ProductContext);

  return(
    <section className="listProductsContainer">
      <h2>PRODUTOS</h2>
      <div className="gridProducts">
        {
          productContext?.products?.map((product, index) => {
            const productInCart = userContext?.user?.cart.find((productCart) => productCart.id === product.id)
            if(productInCart){
              return(
                <ProductCard key={index} product={product} qt={productInCart.qt}/>
              )
            }
            return(
              <ProductCard key={index} product={product} qt={0}/>
            )
          })
        }
      </div>
    </section>
  )
}