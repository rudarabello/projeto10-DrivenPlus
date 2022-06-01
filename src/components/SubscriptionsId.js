
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { FaMoneyBillWave, FaWindowClose } from 'react-icons/fa'
import LoginContext from "../contexts/LoginContext";
import axios from 'axios';

export default function SubscriptionsId() {
    const { planId } = useParams();
    const {
        userToken, memberShipID, setMenberShipID, setUserPlanImage, setUserPlanPerks
    } = useContext(LoginContext);

    const navigate = useNavigate();

    const [planInfo, setPlanInfo] = useState(null);
    const [planDetails, setPlanDetails] = useState(null);

    const [creditCardName, setCreditCardName] = useState('');
    const [creditCardDigits, setCreditCardDigits] = useState('');
    const [creditCardValidity, setCreditCardValidity] = useState('');
    const [securityCode, setSecurityCode] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [inputLoading, setInputLoading] = useState("");




    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        promise.then(response => {
            setPlanDetails(response.data.perks)
            setPlanInfo(response.data);
            setMenberShipID(response.data.id)
        });
        promise.catch(error => console.log("erro#1-PlansPage: ", error.response));

    }, [])

    function confirmSubscription(e) {
        e.preventDefault();
        setIsLoading(true);
        setInputLoading("disabled")
    }
    function handleNewPlan() {
        setIsLoading(false);
        setInputLoading("");

        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', {
            membershipId: memberShipID,
            cardName: creditCardName,
            cardNumber: creditCardDigits,
            securityNumber: securityCode,
            expirationDate: creditCardValidity

        },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );
        promise.then(response => {
            setUserPlanImage(response.data.membership.image)
            setUserPlanPerks(response.data.membership.perks)
            navigate('/home');

        })
        promise.catch(error => alert("cartão inválido! tenta de novo."))
    }

    if (planInfo === null) {
        return <h1>loading...</h1>
    }
    return (
        <Container>
            {isLoading ?
                (
                    <ConfirmBox>
                        <FaWindowClose onClick={() => {
                            setIsLoading(false)
                            setInputLoading("")
                        }} />
                        <ConfirmCard>

                            <p>
                                Tem certeza que deseja assinar o plano {planInfo.name} (R${planInfo.price})?
                            </p>
                            <CheckAnswer>
                                <Cancel onClick={() => {
                                    setIsLoading(false)
                                    setInputLoading("")
                                }}>Não
                                </Cancel>
                                <Button onClick={() => handleNewPlan()}> SIM </Button>
                            </CheckAnswer>
                        </ConfirmCard>
                    </ConfirmBox>

                ) : ("")}
            <FormsContainer isLoading={isLoading}>
                <LinkStyled to={`/subscriptions`}>
                    <ComeBackIcon><IoMdArrowRoundBack /></ComeBackIcon>
                </LinkStyled>

                <PlanInfosWrapper>
                    <LogoImg src={planInfo.image} alt="logo-img" />
                    <LogoTitle> {planInfo.name} </LogoTitle>
                    <InfosPlanBox>

                        <PlanBenefitsWrapper>
                            <PlanBenefitsTitle>
                                <HiOutlineClipboardList />
                                <p>Benefícios:</p>
                            </PlanBenefitsTitle>
                            {planDetails.map((info, index) => (
                                <p key={info.id}> {index + 1}. {info.title}</p>
                            ))}
                        </PlanBenefitsWrapper>

                        <PlanPriceWrapper>
                            <PlanPriceTitleWrapper>
                                <FaMoneyBillWave />
                                <p>Preço:</p>
                            </PlanPriceTitleWrapper>
                            <p>R$ {planInfo.price} cobrados mensalmente</p>
                        </PlanPriceWrapper>

                        <FormWrapper>
                            <form onSubmit={confirmSubscription}>
                                <Input type="text"
                                    onChange={(e) => setCreditCardName(e.target.value)}
                                    value={creditCardName}
                                    placeholder="Nome impresso no cartão"
                                    disabled={inputLoading}
                                />
                                <Input type="text"
                                    onChange={(e) => setCreditCardDigits(e.target.value)}
                                    value={creditCardDigits}
                                    placeholder="Digitos do cartão"
                                    disabled={inputLoading}
                                />
                                <ValidationInfos>
                                    <Input type="text"
                                        onChange={(e) => setSecurityCode(e.target.value)}
                                        value={securityCode}
                                        placeholder="Código de segurança"
                                        disabled={inputLoading}
                                    />
                                    <Input type="text"
                                        onChange={(e) => setCreditCardValidity(e.target.value)}
                                        value={creditCardValidity}
                                        placeholder="Validade"
                                        disabled={inputLoading}
                                    />
                                </ValidationInfos>
                                <Button>{isLoading ?
                                    ("loading...") : ("ASSINAR")}
                                </Button>
                            </form>
                        </FormWrapper>
                    </InfosPlanBox>
                </PlanInfosWrapper>
            </FormsContainer>
        </Container>
    );

}

import styled from 'styled-components';
import { Link } from "react-router-dom";


const Container = styled.div`
    min-height: 100vh;
    background-color: var(--main-color);
    font-family: var(--font-family);
    color: var(--font-color);
    padding-bottom: 36px;
     @media(max-width: 360px){
        Input,Button{
            height: 36px;
        }
    }
    @media(max-width: 300px) {
        Input{
            font-size: 12px;
            ::placeholder {
                padding-left: 1px;
            }
        }
    }
`
const ComeBackIcon = styled.div`
    svg{
        width: 28px;
        height: 32px;
        margin: 22px;
    }
`
const PlanInfosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const LogoImg = styled.img`
    height: 95px;
    width: 140px;
    margin-bottom: 16px;
`
const LogoTitle = styled.h1`
    font-size: 32px;
    line-height: 37px;
    font-weight: 700;
`
const InfosPlanBox = styled.div`
    width: 80%;
    margin:16px 0;
    
    @media(max-width: 300px){
        width: 90%;
    }
`
const PlanBenefitsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin:16px 0;
    p{
        font-size: 14px;
        line-height: 16px;
    }
`
const PlanPriceTitleWrapper = styled.div`
    display: flex;
    p{
        font-size: 16px;
        line-height: 19px;
        margin-left: 5px;
        margin-bottom: 8px;
    }
    svg{
        width: 18px;
        height: 18px;
        color: #FF4791;
    }
`
const PlanPriceWrapper = styled.div`
    margin-bottom: 36px;
    p{
        font-size: 14px;
        line-height: 16px;
    }
`
const FormWrapper = styled.div`
    width: 100%;
    form{
        width: 100%;
    }
`

const PlanBenefitsTitle = styled.div`
    display: flex;
    p{
        font-size: 16px;
        line-height: 19px;
        margin-left: 5px;
        margin-bottom: 8px;
    }
    svg{
        height: 20px;
        width: 20px;
        color: #FF4791;
    }
`
const Input = styled.input`
    height: 52px;
    width: 100%;
    background-color: #FFFFFF;
    color: #222222;
    font-size:20px;
    margin-bottom: 10px;
    border-radius: 8px; 
    font-size: 14px;
    padding: 0;
    ::placeholder {
      color: #7E7E7E;
      font-family: var(--font-family);
      padding-left: 8px;
    }
`;

const ValidationInfos = styled.div`
    width: 100%;
    display: flex;
    gap:5px;
`

const Button = styled.button`
    height: 52px;
    width: 100%;
    background-color: var(--botton-color); 
    color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 21px;
    line-height: 26px;
    text-align: center;
    padding: 14px;
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const LinkStyled = styled(Link)`
    color: #FFFFFF;
`;
const ConfirmBox = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
     svg{
        position: absolute;
        z-index: 2;
        right: 10%;
        top: 5%;
        bottom: 6.25%;
        height: 28px;
        width: 28px;
        cursor: pointer;
    }
`
const FormsContainer = styled.div`
    opacity: ${(props) => props.isLoading ? "0.5" : "1.0"};
`

const ConfirmCard = styled.div`
    position: absolute; 
    width: 248px;
    height: 210px;
    left: 64px;
    top: 229px;
    background: #FFFFFF;
    border-radius: 12px;
    z-index: 2;
    p{
        margin: 8px 0;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color:#000;
    }
    button{
        width: 95px;
        p{
            color: #FFFFFF;
        }
    }
   
`
const Cancel = styled.button`
    height: 52px;
    width: 100%;
    color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 21px;
    line-height: 26px;
    text-align: center;
    padding: 14px;
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #CECECE;
`
const CheckAnswer = styled.div`
    display: flex;
    margin-top: 40px;
    justify-content: space-evenly;
`
