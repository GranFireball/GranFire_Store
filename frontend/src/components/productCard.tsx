import "./productCard.css"
import imgLogo from "../imgs/logo.png"
import { BsFillCartDashFill, BsFillCartFill, BsFillCartPlusFill } from "react-icons/bs";
import { Fragment } from "react";
import { TProduct } from "../types";

interface IProductCard{
  product: TProduct;
  cart?: boolean;
}

export default function ProductCard({product, cart}: IProductCard){
  const CartIconSize = 28;
  return(
    <article className="productCardContainer">
      <div className="productCardHeader">
        <div className="productCardCartContainer">
          <BsFillCartFill />
          <span>5</span>
        </div>
        {
          product.sale ?
            <span className="productCardSale">-{product.sale}%</span>
          :
            null
        }
      </div>
      <div className="productCardImgContainer">
        <img src={imgLogo} alt="a" width={80}/>
      </div>

      <div className="productCardInfoContainer">
        <h4>{product.name}</h4>
        {
          product.sale ?
            <Fragment>
              <p>De: R$ <s>{product.price}</s></p>
              <p>Por: R$ 60,00</p>
            </Fragment>
          :
            <p>R$ {product.price}</p>
        }
        {
          cart &&
          <p>Total: R$ 20,00</p>
        }
      </div>
      <div className="productCardCartInteractionContainer">
        <BsFillCartDashFill size={CartIconSize} color="red" className="productCardCartInteractionButton"/>
        <input type="number"/>
        <BsFillCartPlusFill size={CartIconSize} color="green" className="productCardCartInteractionButton"/>
      </div>
    </article>
  )
}