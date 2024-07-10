import './header.css'
import imgLogo from "../imgs/logo.png"
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { Fragment, useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { BsFillCartFill } from 'react-icons/bs';

export default function Header() {
  const [accessToken, setAccessToken] = useState<string>();
  const [profile, setProfile] = useState<any>([]);
  const IconSize = 24;

  useEffect(
    () => {
      if (accessToken) {
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
          }
        })
          .then((data) => data.json())
          .then((res) => {
            setProfile(res);
          })
          .catch((err) => console.log(err));
      }
    },
    [accessToken]
  );

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setAccessToken(codeResponse.access_token),
    onError: (error) => console.log('Login Failed:', error)
  });


  function logout() {
    googleLogout();
    setAccessToken(undefined);
  }

  return (
    <header className="headerSticky">
      <div className="headerContainer">
        <img src={imgLogo} alt="Logo GranFire Store" className="imgLogo" />
        {
          accessToken ?
            <Fragment>
              <div className="loginAndLogoutButton" onClick={() => logout()}>
                <span>Sair</span>
                <MdLogout size={IconSize} />
              </div>
              {
                profile &&
                <p className="profileName">Conta de: {profile.name}</p>  
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
        profile.name &&
        <div className="profileCartContainer">
          <div className="profileCart">
            <p>Seu Carrinho</p>
            <BsFillCartFill size={IconSize}/>
          </div>
        </div>
      }
    </header>
  )
}
