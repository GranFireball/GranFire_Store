import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductCard from "./productCard";
import "./listSaleProducts.css";
import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import { UserContext } from "../context/userContext";

export default function ListSaleProducts(){
  const userContext = useContext(UserContext);
  const productContext = useContext(ProductContext);

  function hasSaleProduct(){
    if(!productContext?.products){
      return;
    }
    for(const product of productContext.products){
      if(product.sale > 0){
        return true;
      }
    }
    return false;
  }

  if(hasSaleProduct()){
    return(
      <section className="listSaleProductsContainer">
        <h2>PROMOÇÕES</h2>
        <Swiper breakpoints={{
          0: {
            slidesPerView: 1
          },
          340: {
            slidesPerView: 2
          },
          660: {
            slidesPerView: 3
          },
          960: {
            slidesPerView: 4
          },
          1240: {
            slidesPerView: 5
          },
          1500: {
            slidesPerView: 6
          }
        }}
        modules={[Navigation, Pagination]}
        spaceBetween={160}
        navigation
        pagination={{ clickable: true }}
        className="slider"
        >
          {
            productContext?.products?.map((product, index) => {
              if(!product.sale){
                return;
              }
              const productInCart = userContext?.user?.cart.find((productCart) => productCart.id === product.id)
              if(productInCart){
                return(
                  <SwiperSlide key={index} >
                  <ProductCard product={product} qt={productInCart.qt}/>
                </SwiperSlide>
                )
              }
              return(
                <SwiperSlide key={index} >
                  <ProductCard product={product} qt={0}/>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>
    )
  }
  
}