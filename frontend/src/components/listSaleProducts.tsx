import ProductCard from "./productCard";

export default function ListSaleProducts(){
  const products = [
    {name: "Produto 1", price: "25,40"}
  ];

  return(
    <section>
      {
        products.map((product, index) => {
          return(
            <ProductCard key={index} product={product}/>
          )
        })
      }
    </section>
  )
}