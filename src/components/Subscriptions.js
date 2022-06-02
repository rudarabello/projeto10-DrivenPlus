
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import LoginContext from "../contexts/LoginContext";

export default function Subscriptions() {
    const { account } = useContext(LoginContext);
    const [planos, setPlanos] = useState([{}]);
    const API = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships";
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${account.token}`
            }
        };
        const promise = axios.get(API, config)
        promise.then(response => {
            setPlanos(response.data)
        }, [account.token]);
        console.log(account.token);
        promise.catch((error) => alert(error.response.data.message));
    }, [account.token]);

    return (
        <StyledSubscriptions>
            <h1>Escolha o seu plano</h1>
            {planos.map(data => (
                <PlanList key={data.id}>
                    < Link to={`/plan/${data.id}`}>
                        <img src={data.image} alt="Logo do plano" />
                        <p>
                            R$ {data.price !== undefined ? data.price.replace(".", ",") : ""}{" "}
                        </p>
                    </Link>
                </PlanList>))}
        </StyledSubscriptions >
    );


}

const StyledSubscriptions = styled.div`
    
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap:24px;
    background-color: black;
    width: 100%;
    height: 100vh;
    h1 {
        font-family: "Roboto";
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
    }
    
`
const PlanList = styled.div`
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
	    width: 290px;
        height: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        background-color: black;
        border-radius: 12px;
        border: solid 3px #7E7E7E;
    a{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        

    }
    p {
        font-family: "Roboto";
        font-size: 24px;
        font-weight: 700;
        color: #FFFFFF;
        text-decoration: none;
        padding-left: 18px;
    }
`

