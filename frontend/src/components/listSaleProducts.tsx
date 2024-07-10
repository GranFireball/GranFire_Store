import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductCard from "./productCard";
import "./listSaleProducts.css";

const products = [
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
  {name: "Produto 1", price: "25,40", sale: "70,5"},
];

export default function ListSaleProducts(){


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
          products.map((product, index) => {
            return(
              product.sale &&
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