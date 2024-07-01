import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import ProductCard from "./productCard";
import "./listSaleProducts.css";

export default function ListSaleProducts(){
  const products = [
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
    {name: "Produto 1", price: "25,40"},
  ];

  return(
    <section className="listSaleProductsContainer">
      <h2 className="listSaleProductsTitle">PROMOÇÕES</h2>
      <Swiper breakpoints={{
        0: {
          slidesPerView: 1
        },
        360: {
          slidesPerView: 2
        },
        560: {
          slidesPerView: 3
        },
        760: {
          slidesPerView: 4
        },
        960: {
          slidesPerView: 5
        },
        1160: {
          slidesPerView: 6
        },
        1360: {
          slidesPerView: 7
        }
      }}
      modules={[Navigation, Pagination]}
      spaceBetween={200}
      navigation
      pagination={{ clickable: true }}
      className="slider"
      >
        {
          products.map((product, index) => {
            return(
              <SwiperSlide key={index} >
                <ProductCard product={product}/>
              </SwiperSlide>
            )
          })
        }

      </Swiper>
      
    </section>
  )
}