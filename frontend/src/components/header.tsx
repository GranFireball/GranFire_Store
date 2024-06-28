import './header.css'
import imgLogo from "../imgs/logo.png"
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { Fragment, useState } from 'react';

export default function Header(){
  const [logged, setLogged] = useState<string | undefined>();
  const IconSize = 24;
  return(
    <header className="headerContainer">
      <img src={imgLogo} alt="Logo GranFire Store" className="imgLogo"/>
      {
        logged ?
        <Fragment>
          <div className="loginAndLogoutButton" onClick={() => setLogged(undefined)}>
            <span>Sair</span>
            <MdLogout size={IconSize}/>
          </div>
          <p className="loggedUser">Conta de: {logged}</p>
        </Fragment>
        :
        <div className="loginAndLogoutButton" onClick={() => setLogged("Gran Firebalaaaaaaaaaal")}>
          <span>Entrar</span>
          <CgProfile size={IconSize}/>
        </div>
      }
    </header>
  )
}