import "./listProducts.css";
import { useState } from "react";
import ProductCardToAdd from "./productCardToAdd";

export default function ListProductsToAdd(){
  const [productsToAdd, setProductsToAdd] = useState<Array<number>>([]);
  const [productIndex, setProductIndex] = useState<number>(0);
  function removeProductToAdd(index: number){
    setProductsToAdd((prev) => prev.filter((ind) => ind !== index))
  }

  function newProductToAdd(){
    setProductsToAdd((prev) => [...prev, productIndex]);
    setProductIndex((prev) => prev + 1);
  }

  return(
    <main className="stockContainer">
    <section className="stockProductsContainer">
      <div className="stockTitleContainer">
        <h2 className="stockTitle">Produtos em Criação</h2>

      </div>
      <button className="addProductButton" onClick={() => newProductToAdd()}>
        <p>Adicionar Produto</p>

      </button>
    </section>
    {
      productsToAdd.length > 0 &&
      <section className="gridStockProducts">
      {
        productsToAdd.map((product) => {
          return(
            <ProductCardToAdd key={product} productIndex={product} removeProductToAdd={removeProductToAdd}/>
          )
        })
      }
    </section>
    }
    
</main>
  )
}