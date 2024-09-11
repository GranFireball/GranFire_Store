import "./productCard.css"
import imgLogo from "../imgs/logo.png"
import { BsFillCartDashFill, BsFillCartFill, BsFillCartPlusFill } from "react-icons/bs";
import { Fragment, useContext, useState } from "react";
import { TProduct } from "../types";
import { UserContext } from "../context/userContext";

interface IProductCard{
  product: TProduct;
  cart?: boolean;
  qt: number;
}

export default function ProductCard({product, cart, qt}: IProductCard){
  const userContext = useContext(UserContext);
  const CartIconSize = 28;
  const [qtInput, setQtInput] = useState<number>(1);
  function calculateProductDiscount(){
    const discountValue = (product.sale/ 100) * Number(product.price.replace(",", "."));
    const newPrice = Number(product.price.replace(",", ".")) - discountValue;
    return newPrice.toFixed(2).replace(".", ",");
  }
  return(
    <article className="productCardContainer">
      {
        product.stock <= 0 &&
        <div className="productCardNoStock">
          <p>Em Falta</p>
        </div>
      }

      <div className="productCardHeader">
        {
          product.sale > 0 ?
            <div className="productCardSaleContainer">
             <span className="productCardSale">-{product.sale}%</span>
            </div>
          :
            null
        }
          <div className="productCardCartQuantityContainer">
            <BsFillCartFill />
            <span>{qt}</span>
          </div>
      </div>
      <figure className="productCardImgContainer">
        <img src={imgLogo} alt="a" width={80}/>
      </figure>

      <section className="productCardInfoContainer">
        <h4>{product.name}</h4>
        {
          product.sale > 0 ?
            <Fragment>
              <p>De: R$ <s>{product.price}</s></p>
              <p>Por: R$ {calculateProductDiscount()}</p>
            </Fragment>
          :
            <p>R$ {product.price}</p>
        }
        {
          cart &&
          <p>Total: R$ {product.sale > 0 ? (Number(calculateProductDiscount().replace(",", ".")) * qt).toFixed(2).replace(".", ",") : (Number(product.price.replace(",", ".")) * qt).toFixed(2).replace(".", ",")}</p>
        }
      </section>
      <div className="productCardCartInteractionContainer">
        <BsFillCartDashFill size={CartIconSize} color="red" className="productCardCartInteractionButton" onClick={() => {
            if(qtInput > 0){
              userContext?.removeFromCart(product.id, qtInput)
            }
          }}/>
        <input type="number" defaultValue={1} onChange={(e) => setQtInput(Number(e.target.value))}/>
        <BsFillCartPlusFill size={CartIconSize} color="green" className="productCardCartInteractionButton" onClick={() => {
            if(qtInput > 0){
              userContext?.addToCart(product.id, qtInput)
            }
          }}/>
      </div>
    </article>
  )
}