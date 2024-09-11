export type TProduct = {
  id: string;
  name: string;
  price: string;
  sale: number;
  stock: number;
}

export type TProductToAdd = {
  name: string;
  price: string;
  sale: number;
  stock: number;
}


export type TProductToBuy = {
  id: string;
  name: string;
  price: string;
  sale: number;
  qt: number;
}

export type TUser = {
  id: string;
  cart: TProductCart[];
}

export type TProductCart = {
  id: string;
  qt: number;
}

export type googleAccount = {
  id: string;
  name: string;
}