import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {

    const navigate = useNavigate();
    const API = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up";
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        const register = {
            email,
            name,
            cpf,
            password
        };

        const promise = axios.post(API, register);
        promise.then(() => {
            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        });

        promise.catch((err) => {
            alert(err.response.data.message);
        });

    }

    return (
        <StyledCadastro>
            <form onSubmit={handleSubmit}>
                <input type="name" placeholder="Nome " onChange={(e) => setName(e.target.value)} />
                <input type="CPF" placeholder="CPF" onChange={(e) => setCpf(e.target.value)} />
                <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">ENTRAR</button>
                <Link to="/">Já tem uma conta? Faça login!</Link>
            </form>
        </StyledCadastro>
    )
}

const StyledCadastro = styled.div`
    width: 100%;
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }
    input {
        height: 52px;
        width: 299px;
        border: none;
        border-radius: 8px;
        padding-left: 14px;
    }
    input::placeholder {
        
        font-size: 14px;
        color: #7E7E7E;
    }
    button{
        margin-top: 8px;
        height: 52px;
        width: 100%;
        border: none;
        border-radius: 8px;
        background-color: #FF4791;
        font-size: 14px;
        font-weight: 700;
        color: #FFFFFF;
    }
    a{
        margin-top: 8px;
        color: #FFFFFF;
        font-size: 14px;
        text-decoration: underline;
        font-family: "Roboto";
    }
`
