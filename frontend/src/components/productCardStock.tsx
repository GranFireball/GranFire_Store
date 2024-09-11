import "./productCardStock.css"
import imgLogo from "../imgs/logo.png"
import { Fragment, useContext, useState } from "react";
import { TProduct } from "../types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiArchiveBox, HiArchiveBoxArrowDown, HiArchiveBoxXMark } from "react-icons/hi2";

import { FaXmark, FaPen, FaTrash } from "react-icons/fa6";
import { ProductContext } from "../context/productContext";

const ProductSchema = z.object({
  name: z.string(),
  price: z.string(),
  sale: z.coerce.number().nonnegative().max(90)
})

type TProductSchema = z.infer<typeof ProductSchema>;

interface IProductCardStock{
  productInitialValue: TProduct;
}

export default function ProductCardStock({productInitialValue}: IProductCardStock){
  const { register, handleSubmit, reset } = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema)
  });
  const [product, setProduct] = useState<TProduct>(productInitialValue);
  const CartIconSize = 28;
  const [qtInput, setQtInput] = useState<number>(1);
  const [edit, setEdit] = useState<boolean>(false);
  const productContext = useContext(ProductContext);
  function saveAddedProductStock(){
    fetch("http://localhost:5000/products/add", {
      method: "PUT",
      body: JSON.stringify({id: product.id, amount: qtInput}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch((err) => {
      alert(err);
    })
  }

  function saveRemovedProductStock(){
    fetch("http://localhost:5000/products/remove", {
      method: "PUT",
      body: JSON.stringify({id: product.id, amount: qtInput}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch((err) => {
      alert(err);
    })
  }

  function addProductStock(){
    setProduct({...product, stock: product.stock + qtInput});
    saveAddedProductStock();
  }

  function removeProductStock(){
    if(qtInput > product.stock){
      alert("Quantidade Insuficiente");
      return;
    }
    setProduct({...product, stock: product.stock - qtInput});
    saveRemovedProductStock();
  }

  function saveUpdatedProductInfo(data: TProductSchema){
    fetch("http://localhost:5000/products", {
      method: "PUT",
      body: JSON.stringify({id: product.id, name: data.name, price: data.price, sale: data.sale}),
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
      setProduct({...product, name: data.name, price: data.price, sale: data.sale});
      setEdit(false);
    })
  }

  function deleteProduct(){
    fetch("http://localhost:5000/products", {
      method: "DELETE",
      body: JSON.stringify({id: product.id}),
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
      productContext?.deleteProduct(product.id);
    })
  }

  return(
    <article className="productCardStockContainer">
      {
        product.stock <= 0 &&
        <div className="productCardNoStock">
          <p>Em Falta</p>
        </div>
      }
      <div className="productCardStockHeader">
        {
          edit?
          <div onClick={() => {
            reset();
            setEdit(false);
          }} className="buttonIcon"><FaXmark color="red"/></div>
          :
          <div className="editDeleteContainer">
            <div onClick={() => setEdit(true)} className="buttonIcon"><FaPen color="blue"/></div>
            <div onClick={() => deleteProduct()} className="buttonIcon"><FaTrash  color="red"/></div>
          </div>
        }
        <div className="productCardStockQuantityContainer">
          <HiArchiveBox />
          <span>{product.stock}</span>
        </div>
      </div>
      <figure className="productCardStockImgContainer">
        <img src={imgLogo} alt="a" width={80}/>
      </figure>
      <section style={{height: edit ? "fit-content" : 80}} className="productCardStockInfoContainer">
        {
          edit?
          <form onSubmit={handleSubmit(saveUpdatedProductInfo)} className="productCardStockFormContainer">
            <div>
              <label>Nome</label><br/>
              <input style={{maxWidth: 140}} {...register("name")} defaultValue={product.name}/>
            </div>
            <div>
              <label>Preço (R$)</label><br/>
              <input style={{maxWidth: 140}} {...register("price")} defaultValue={product.price}/>
            </div>
            <div>
              <label>Desconto (%)</label><small> Máx: 90</small><br/>
              <input style={{maxWidth: 140}} type="number" {...register("sale")} defaultValue={Number(product.sale)}/>
            </div>
            <button type="submit">Salvar</button>
          </form>
          :
          <Fragment>
            <h4>Nome: {product.name}</h4>
            <p>Preço: R$ {product.price}</p>
            <p>Desconto: {product.sale}%</p>
          </Fragment>
        }

      </section>
      {
        !edit && 
      
      <div className="productCardStockInteractionContainer">
      <HiArchiveBoxXMark  size={CartIconSize} color="red" className="productCardStockInteractionButton" onClick={() => {
          if(qtInput > 0){
            removeProductStock();
          }
        }}/>
      <input type="number" defaultValue={1} onChange={(e) => setQtInput(Number(e.target.value))}/>
      <HiArchiveBoxArrowDown  size={CartIconSize} color="green" className="productCardStockInteractionButton" onClick={() => {
          if(qtInput > 0){
            addProductStock();
          }
        }}/>
    </div>
      }
    </article>
  )
}