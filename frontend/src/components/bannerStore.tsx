import "./bannerStore.css";
import bannerImg from "../imgs/banner.png";

export default function BannerStore(){
  return(
    <section className="bannerContainer">
      <img src={bannerImg} alt="Imagem do Banner"/>
    </section>
  )
}