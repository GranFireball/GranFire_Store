import { createContext, ReactNode, useState } from "react";
import { TProduct } from "../types";

interface IProdutcContext{
  products: TProduct[] | undefined;
  getProducts: (allProducts: TProduct[]) => void;
  newProduct: (product: TProduct) => void;
  deleteProduct: (productId: string) => void;
}

export const ProductContext = createContext<IProdutcContext | null>(null);

interface IUserProvider{
  children: ReactNode;
}

export default function ProductProvider({children}: IUserProvider){
  const [products, setProducts] = useState<TProduct[] | undefined>();

  function getProducts(allProducts: TProduct[] | undefined){
    setProducts(allProducts);
  }

  function newProduct(product: TProduct){
    if(!products){
      return;
    }
    setProducts([...products, product]);
  }

  function deleteProduct(productId: string){
    console.log(products);
    if(!products){
      return;
    }
    setProducts(products.filter((product) => product.id !== productId));
  }

  return(
    <ProductContext.Provider value={{products, getProducts, newProduct, deleteProduct}}>
      {children}
    </ProductContext.Provider>
  )
}