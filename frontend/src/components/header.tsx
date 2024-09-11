import './header.css'
import imgLogo from "../imgs/logo.png"
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { Fragment, useContext, useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { BsFillCartFill } from 'react-icons/bs';
import { UserContext } from '../context/userContext';
import { googleAccount } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [accessToken, setAccessToken] = useState<string>();
  const [googleData, setGoogleData] = useState<googleAccount | undefined>();
  const IconSize = 24;
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const path = useLocation();
  
  const login = useGoogleLogin({
    onSuccess: (res) => setAccessToken(res.access_token),
    onError: (error) => alert('Login Failed: ' + error)
  });


  function logout() {
    googleLogout();
    setAccessToken(undefined);
    userContext?.logout();
    navigate("/");
  }

  useEffect(
    () => {
      const token = localStorage.getItem("userAccessToken");
      if(token && !userContext?.user){
        setAccessToken(token);
      }

      if (accessToken) {
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
          }
        })
          .then((data) => data.json())
          .then((res) => {
            if(!res.id){
              return;
            }
            setGoogleData(res);
            userContext?.login(res.id);
            localStorage.setItem("userAccessToken", accessToken);
          })
          .catch((err) => alert(err));
      }
    },
    [accessToken]
  );

  return (
    <header className="headerSticky">
      <div className="headerContainer">
        <img src={imgLogo} alt="Logo GranFire Store" className="imgLogo" onClick={() => {
          if(path.pathname !== "/"){
            navigate("/")
          }
        }}/>
        {
           userContext?.user ?
            <Fragment>
              <div className="loginAndLogoutButton" onClick={() => logout()}>
                <span>Sair</span>
                <MdLogout size={IconSize} />
              </div>
              {
                googleData &&
                <p className="profileName">Conta de: {googleData?.name}</p>  
              }
            </Fragment>
            :
            <div className="loginAndLogoutButton" onClick={() => login()}>
              <span>Entrar</span>
              <CgProfile size={IconSize} />
            </div>
        }
      </div>
      {
        userContext?.user &&
        <div className="profileCartContainer" onClick={() => {
          if(path.pathname !== "/cart"){
            navigate("/cart")
          }
        }}>
          <div className="profileCart">
            <p>Seu Carrinho</p>
            <BsFillCartFill size={IconSize}/>
          </div>
        </div>
      }
    </header>
  )
}