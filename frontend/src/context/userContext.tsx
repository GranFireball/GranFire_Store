import { createContext, ReactNode, useState } from "react";
import { TProductCart, TUser } from "../types";


interface IUserContext{
  user: TUser | undefined;
  login: (userId: string) => void;
  logout: () => void;
  addToCart: (id: string, qt: number) => void;
  removeFromCart: (id: string, qt: number) => void;
  clearCart: () => void;
}

export const UserContext = createContext<IUserContext | null>(null);

interface IUserProvider{
  children: ReactNode;
}

export default function UserProvider({children}: IUserProvider){
  const [user, setUser] = useState<TUser | undefined>(undefined);

  function login(userId: string){
    fetch("http://localhost:5000/users/" + userId, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((json) => {
      setUser(json);
    })
    .catch((err) => alert(err));
  }
  
  function logout(){
    setUser(undefined);
    localStorage.removeItem("userAccessToken");
  }

  function saveCart(userId: string, cart: TProductCart[]){
    if(!userId){
      return;
    }
    fetch("http://localhost:5000/users/" + userId + "/cart", {
      method: "PUT",
      body: JSON.stringify({cart: cart}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch((err) => {
      alert(err);
    })
  }

  function addToCart(id: string, qt: number){
    if(user){
      const copyUser = user;
      const productIndex = copyUser?.cart.findIndex((product) => product.id === id);
      if(productIndex !== -1){
        copyUser!.cart[productIndex].qt += qt;
        setUser({...user, cart: copyUser?.cart});
        saveCart(user.id, copyUser?.cart);
        return;
      }
      setUser({...user, cart: [...user.cart, {id: id, qt: qt}]});
      saveCart(user.id, [...user.cart, {id: id, qt: qt}]);
    }
  }

  function removeFromCart(id: string, qt: number){
    if(user){
      const copyUser = user;
      const productIndex = copyUser?.cart.findIndex((product) => product.id === id);
      if(productIndex !== -1){
        const newProductQt = copyUser!.cart[productIndex].qt - qt;
        if(newProductQt <= 0){
          copyUser.cart = copyUser?.cart.filter((product) => product.id !== id);
          setUser({...user, cart: copyUser.cart});
          saveCart(user.id, copyUser.cart)
          return;
        }
        copyUser!.cart[productIndex].qt -= qt;
        setUser({...user, cart: copyUser?.cart});
        saveCart(user.id, copyUser?.cart);
        return;
      }
    }
  }

  function clearCart(){
    if(user){
      setUser({...user, cart: []});
      saveCart(user.id, []);
    }
  }

  return(
    <UserContext.Provider value={{user, login, logout, addToCart, removeFromCart, clearCart}}>
      {children}
    </UserContext.Provider>
  )
}