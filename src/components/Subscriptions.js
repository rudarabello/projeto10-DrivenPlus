
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import LoginContext from "../contexts/LoginContext";



export default function Subscriptions(price, image, id) {

	const { account } = useContext(LoginContext);
	const [planos, setPlanos] = useState([]);
	const navigate = useNavigate();
	const API = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships";
	const config = {
		headers: {
			"Authorization": `Bearer ${account.token}`
		}
	};
	useEffect(() => {
		const promise = axios.get(API, config)
		promise.then(response => {
			setPlanos(response.data)
		}, []);
	}, []);


	function dadosPlano(e, plan) {
		e.preventDefault();
		price(plan.price);
		image(plan.image);
		id(plan.id);
		navigate(`/subscriptions/${plan.id}`)
	}

	return (
		<StyledSubscriptions>
			<h1>Escolha seu Plano</h1>
			<PlanList>
				{planos.map(plan => (
					<div onClick={(event) => dadosPlano(event, plan)} key={plan.id} className="plano">
						<img src={plan.image} alt="logo" />
						<h3>R$ {plan.price}</h3>
					</div>
				))}
			</PlanList>
		</StyledSubscriptions>
	)
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
	display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
	.plano {
        width: 290px;
        height: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        background-color: black;
        border-radius: 12px;
        border: solid 3px #7E7E7E;
    }
    .plano h3 {
        font-family: "Roboto";
        font-size: 24px;
        font-weight: 700;
        color: #FFFFFF;
        text-decoration: none;
    }
`

