import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import LoginContext from "../contexts/LoginContext";

import styled from "styled-components";
import { ClipboardOutline } from 'react-ionicons'
import { CashOutline } from 'react-ionicons'
import { ArrowBackOutline } from 'react-ionicons'
import { CloseOutline } from 'react-ionicons'





export default function Plan() {

  const navigate = useNavigate();

  const [dataPlan, setDataPlan] = useState({});
  const [assiner, setAssiner] = useState(false);
  const {idPlan} = useParams();
 
  
  const ApiPost = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions";

  const { account } = useContext(LoginContext);
  const { setPlan } = useContext(LoginContext);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  console.log(idPlan)
  console.log(account.token)

  useEffect(() => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${account.token}`,
      },
    };
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlan}`,
      config);

    promise.then((response) => {
      setDataPlan(response.data)
    });
    promise.catch((error) =>
      console.log(error)
    );
  }, [account.token]);

  function SendPlanAssinerToApi() {
    if (
      cardNumber !== "" &&
      expirationDate !== "" &&
      cardName !== "" &&
      securityNumber !== ""
    ) {
      const userPayment = {
        membershipId: dataPlan.id,
        cardName: cardName,
        cardNumber: cardNumber,
        securityNumber: securityNumber,
        expirationDate: expirationDate,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${account.token}`,
        },
      };
      const promise = axios.post(ApiPost, userPayment, config);
      promise.then((response) => {
        setPlan(response.data);
        alert("Parabéns, pagamento feito com sucesso!");
        navigate("/home");
      });
      promise.catch((error) => {
        alert(
          "Ocorreu um erro durante o seu pagamento, tente novamente mais tarde ",
          error
        );
      });
    } else alert("Por favor preencha os dados corretamente.");
  }


  return (
    <ContainerPlan>
      <BackArrow onClick={() => navigate('/subscriptions')}>
        <ArrowBackOutline color={'#ffffff'} height="40px" width="40px" />
      </BackArrow>
      <img src={dataPlan.image} alt="Logo do Plano selecionado" />
      <h2>{dataPlan.name}</h2>
      <Benefits>
        <ClipboardOutline color={'#FF4791'} height="26px" width="22px" />
        <h3>Benefícios:</h3>
      </Benefits>
      {dataPlan.perks !== undefined
        ? dataPlan.perks.map((perks, index) => (
          <h3 key={index}>
            {index + 1}. {perks.title}{" "}
          </h3>
        ))
        : ""}
      <Cash>
        <CashOutline color={'#FF4791'} height="26px" width="22px" />
        <h3>Preço:</h3> <p></p>
      </Cash>
      <h3>
        R${" "}
        {dataPlan.perks !== undefined ? dataPlan.price.replace(".", ",") : ""}{" "}
        cobrados mensalmente
      </h3>
      <InputsMaiores>
        <input
          onChange={(e) => setCardName(e.target.value)}
          type="text"
          placeholder="Nome impresso no cartão"
        />
        <input
          onChange={(e) => setCardNumber(e.target.value)}
          type="number"
          placeholder="Digitos do cartão"
        />
      </InputsMaiores>
      <InputsMenores>
        <input
          onChange={(e) => setSecurityNumber(e.target.value)}
          type="number"
          placeholder="Código de segurança"
        />
        <input
          onChange={(e) => setExpirationDate(e.target.value)}
          type="date"
          placeholder="Válidade"
        />
      </InputsMenores>
      <button onClick={() => setAssiner(true)}>ASSINAR</button>

      {assiner ? (
        <AssinarDiv>
          <CloseOutline onClick={() => setAssiner(false)}
            color={'#000000'} height='25px' width='25px' />
          <div>
            <h3>
              Tem certeza que deseja assinar o pacote {dataPlan.name} ? (R${" "}
              {dataPlan.perks !== undefined
                ? dataPlan.price.replace(".", ",")
                : ""}
              )
            </h3>
            <p>
              <button onClick={() => setAssiner(false)}>NÃO</button>
              <button onClick={() => SendPlanAssinerToApi()}>SIM</button>
            </p>
          </div>
        </AssinarDiv>
      ) : (
        ""
      )}
    </ContainerPlan>
  );
}

const ContainerPlan = styled.div`
  background: black;
  height: 100vh;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  img {
    margin-top: -120px;
    width: 60%;
    margin-left: 4.5rem;
    align-items: center;
  }
  
  h2 {
    margin-top: 20px;
    color: white;
    font-family: "Roboto";
    font-weight: 700;
    font-size: 36px;
    
    text-align: center;
  }
  h3 {
    color: white;
    font-family: "Roboto";
    font-weight: 300;
    font-size: 18px;
  }
        button {
        height: 55px;
        background-color: #ff4791;
        border: thin solid #ff4791;
        border-radius: 5px;
        color: #ffffff;
        font-family: "Roboto";
        font-weight: 500;
        font-size: 18px;
        :hover {
          box-shadow: 0px 0px 10px rgba(999, 999, 999, 0.7);
          cursor: pointer;
        }
      }
    `;


const Benefits = styled.div`
  margin-bottom: 15px;
`
const Cash = styled.div`
  margin-bottom: 15px;
`
const InputsMenores = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;  
  input{
    width: 100%;
    height: 52px;
    margin-top: 10px;
    margin-bottom: 10px;
    
  }
  
`
const InputsMaiores = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  input{
    width: 99%;
    height: 52px;
  }
  
  
`




const BackArrow = styled.div`
      position: fixed;
      top: 10px;
      left: 38px;
      img {
        width: 50px !important;
        height: 40px !important;
        :hover {
          cursor: pointer;
        }
      }
    `;



const AssinarDiv = styled.div`
      position: fixed;
      width: 100%;
      height: 200vh;
      margin-top: -100px !important;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      img {
        width: 40px !important;
        height: 40px !important;
        position: fixed;
        top: 42px;
        right: 38px;
        :hover {
          cursor: pointer;
        }
      }
      div {
        width: 400px !important;
        margin-left: -4rem !important;
        padding: 2rem;
        height: 200px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(999, 999, 999, 0.7);
        background-color: white;
        display: flex;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        h3 {
          color: #000000 !important;
          font-family: "Roboto";
          font-weight: 500;
          font-size: 18px;
        }
        p {
          width: 100%;
          display: flex;
          margin-top: 20px;
          justify-content: space-around;
          button {
            width: 100px;
            :first-child {
              background-color: #cecece;
              border: thin solid #cecece;
            }
            :hover {
              cursor: pointer;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            }
          }
        }
      }
    `;

