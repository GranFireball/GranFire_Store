import "./listProductsStock.css";
import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import ProductCardStock from "./productCardStock";

export default function ListProductsStock(){
  const productContext = useContext(ProductContext);

  return(
    <main className="stockContainer">
      <section className="stockProductsContainer">
        <div className="stockTitleContainer">
          <h2 className="stockTitle">Estoque</h2>

        </div>
      </section>
      <section className="gridStockProducts">
        {
          productContext?.products?.map((product) => {
            return(
              <ProductCardStock key={product.id} productInitialValue={product}/>
            )
          })
        }
      </section>
  </main>
  )
}