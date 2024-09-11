import { Fragment } from 'react'
import ListSaleProducts from '../components/listSaleProducts';
import ListProducts from '../components/listProducts';
import BannerStore from '../components/bannerStore';

export default function Store() {

  return (
    <Fragment>
      <BannerStore/>
      <ListSaleProducts/>
      <ListProducts/>
    </Fragment>
  )
}