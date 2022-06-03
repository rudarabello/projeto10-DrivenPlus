
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import styled from "styled-components";
import LoginContext from "../contexts/LoginContext";
import Profile from "../assets/Profile.png";

export default function Home() {

  const navigate = useNavigate();
  const { account } = useContext(LoginContext);
  const { plan } = useContext(LoginContext);


  console.log(account)
  console.log(plan.membership)
  console.log(account.token)




  function deletePlanDataFromApi() {
    const config = {
      headers: {
        Authorization: `Bearer ${account.token}`,
      },
    };
    const decision = window.confirm(
      "Tem certeza que deseja cancelar o seu Plano ?"
    );

    if (decision) {
      const promise = axios.delete(
        "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
        config
      );

      promise.then(() => {
        alert(
          "Seu plano foi cancelado com sucesso, contrate outro agora mesmo!"
        );
        navigate("/subscriptions");
      });
      promise.catch((error) => {
        alert(
          "Tive um problema tecnico ao cancelar o seu Plano, por favor tente mais tarde ",
          error
        );
      });
    }
  }

  return (
    <ContainerHome>
      <Header>
        <img src={account.membership.image} alt="Imagem do Perfil" />
        <img
          onClick={() => navigate(`/users/${account.id}`)}
          src={Profile}
          alt="Imagem do Perfil"
          width="20px"
          height="20px"
        />
      </Header>
      <h1>Olá, {account.name}</h1>

      <ButtonsFromApi>
        {account.membership.perks === undefined
          ? console.log("Eu sou o array undefined")
          : account.membership.perks.map((perks, index) => (
            <a key={index} href={perks.link} target="_blank" rel="noreferrer">
              <button key={index}>{perks.title}</button>
            </a>
          ))}
      </ButtonsFromApi>

      <ButtonsHomeContainer>
        <button onClick={() => navigate("/subscriptions")}>Mudar Plano</button>
        <button onClick={() => deletePlanDataFromApi()}>Cancelar Plano</button>
      </ButtonsHomeContainer>
    </ContainerHome>
  );
}
const ButtonsFromApi = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 40%;
  button {
    width: 22rem;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ff4791;
    border: thin solid #ff4791;
    color: #ffffff;
    font-family: "Roboto";
    font-size: 18px;
    font-weight: 300;
    :hover {
      cursor: pointer;
      box-shadow: 0px 0px 10px rgba(999, 999, 999, 0.9);
    }
  }
`;
const ButtonsHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  position: relative;
    button {
    width: 22rem;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ff4791;
    border: thin solid #ff4791;
    color: #ffffff;
    font-family: "Roboto";
    font-size: 18px;
    font-weight: 300;
    :hover {
      cursor: pointer;
      box-shadow: 0px 0px 10px rgba(999, 999, 999, 0.9);
    }
    &:last-child {
      background-color: #ff4747;
      border: thin solid #ff4747;
      color: #ffffff;
      font-family: "Roboto";
      font-size: 18px;
      font-weight: 700;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    :last-child {
      width: 50px;
      height: 50px;
      :hover {
        cursor: pointer;
      }
    }
  }
`;

const ContainerHome = styled.div`
  display: flex;
  background: black;
  height: 100%;
  flex-direction: column;
  padding: 3rem;
  h1 {
    margin-top: 30px;
    margin-left: 20%;
    color: white;
    font-family: "Roboto";
    font-size: 28px;
  }
  @media(max-width: 450px) {
    height: 100vh;
  }

`;