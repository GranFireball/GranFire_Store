import { Fragment, useContext, useEffect, useState } from "react";
import ListProductsStock from "../components/listProductsStock";
import ListProductsToAdd from "../components/listProductsToAdd";
import { UserContext } from "../context/userContext";

export default function ProductStock(){
  const userContext = useContext(UserContext);
  const [admin, setAdmin] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if(!userContext || !userContext.user || !userContext.user.id){
      return;
    }
    setIsLoading(true);
    fetch(`http://localhost:5000/admins/${userContext.user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data) => data.json())
      .then((res) => {
        if(res.Error){
          return;
        }
        setAdmin(true);
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false))

  }, [userContext, userContext?.user])
  

  if(!userContext || !userContext.user || !userContext.user.id){
    return(
      <main style={{marginTop: 40}}>
        <h2 style={{textAlign: "center"}}>Faça o Login</h2>
        <p style={{textAlign: "center"}}>Área Restrita para Administradores</p>
      </main>
    )
  }

  if(isLoading){
    return(
      <p style={{textAlign: "center"}}>Aguarde...</p>
    )
  }


  return(
    admin ?
      <Fragment>
        <ListProductsToAdd/>
        <ListProductsStock/>
      </Fragment>
    :
      <main>
        <h2 style={{textAlign: "center"}}>ACESSO NEGADO!</h2>
        <p style={{textAlign: "center"}}>VOCÊ NÃO TEM PERMISSÃO PARA ACESSAR ESSA PÁGINA!</p>
      </main>
  
  )
}