import ProductCard from "./productCard";
import "./listProducts.css";

const products = [
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
];

export default function ListProducts(){


  return(
    <section className="listProductsContainer">
      <h2>PRODUTOS</h2>
      <div className="gridProducts">
        {
          products.map((product, index) => {
            return(
              <ProductCard key={index} product={product}/>
            )
          })
        }
      </div>
    </section>
  )
}