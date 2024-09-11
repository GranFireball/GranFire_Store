import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"

export default function SuccessPayment(){
  const userContext = useContext(UserContext);

  useEffect(() => {
    if(!userContext?.user){
      return;
    }
    userContext?.clearCart();
  }, [userContext])

  return(
    <main>
      <h1 style={{textAlign: "center"}}>COMPRA REALIZADA COM SUCESSO!</h1>
    </main>
  )
}