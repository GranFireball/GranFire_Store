import imgLogo from "../imgs/logo.png"
import { useContext, useState } from "react";
import { TProductToAdd } from "../types";
import { FaXmark } from "react-icons/fa6";
import { ProductContext } from "../context/productContext";
import "./productCardStock.css"


interface IProductCardToAdd{
  productIndex: number;
  removeProductToAdd: (index: number) => void;
}

export default function ProductCardToAdd({productIndex, removeProductToAdd}: IProductCardToAdd){
  const [form, setForm] = useState<TProductToAdd>({name: '', price: '', sale: 0, stock: 0});
  const productContext = useContext(ProductContext);
  function createProduct(){
    if(!form || (form && (!form.name || !form.price))){
      return;
    }
    fetch("http://localhost:5000/products", {
      method: "POST",
      body: JSON.stringify({name: form.name, price: form.price, sale: form.sale, stock: form.stock}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((json) => {
      if(json.Error){
        alert(json.Error);
        return;
      }
      productContext?.newProduct(json);
      removeProductToAdd(productIndex);
    })
    .catch((err) => {
      alert(err);
    })
  }

  return(
    <article className="productCardStockContainer">
      <div className="productCardStockHeader">
          <div onClick={() => removeProductToAdd(productIndex)} className="buttonIcon"><FaXmark color="red"/></div>
      </div>
      <figure className="productCardStockImgContainer">
        <img src={imgLogo} alt="a" width={80}/>
      </figure>
      <section style={{height:"fit-content"}} className="productCardStockInfoContainer">

          <form onSubmit={(e) => {
            e.preventDefault();
            createProduct()}} className="productCardStockFormContainer">
            <div>
              <label>Nome</label><br/>
              <input type="text" style={{maxWidth: 140}} value={form.name} onChange={(e) => {
                const newForm = {...form, name: e.target.value}
                setForm(newForm)
              }}/>
            </div>
            <div>
              <label>Preço (R$)</label><br/>
              <input type="text" style={{maxWidth: 140}} value={form.price} onChange={(e) => {
                const newForm = {...form, price: e.target.value}
                setForm(newForm)
              }}/>
            </div>
            <div>
              <label>Desconto (%)</label><small> Máx: 90</small><br/>
              <input type="number" style={{maxWidth: 140}} value={form.sale.toString()} defaultValue={0} onChange={(e) => {
               const newForm = {...form, sale: Number(e.target.value)}
                setForm(newForm)
              }}/>
            </div>
            <div>
              <label>Estoque</label><br/>
              <input  type="number" style={{maxWidth: 140}} value={form.stock.toString()} defaultValue={0} onChange={(e) => {
                const newForm = {...form, stock: Number(e.target.value)}
                setForm(newForm)
              }}/>
            </div>
            <button type="submit">Salvar</button>
          </form>
          </section>
        </article>
  )
}