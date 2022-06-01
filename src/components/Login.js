import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import LoginContext from "../contexts/LoginContext";
import logo from "../assets/Driven_white 1.png";


export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { setIdPlano, setToken, setName } = useContext(LoginContext);

    const navigate = useNavigate()

    function handleLogin(e) {

        e.preventDefault();

        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', {
            email: email,
            password: password
        });

        promise.then(response => {
            setToken(response.data.token);
            setName(response.data.name);

            if (response.data.membership === null) {
                navigate('/subscriptions')
            } else if (response.data.membership !== null) {
                setIdPlano(response.data.membership.id)
                navigate('/home')
            }



        });

        promise.catch(error => alert(error.response.data.message));

    }

    return (
        <StyledLogin>
            <Page>
                <img src={logo} alt="Logo Driven+" />
                <Form onSubmit={handleLogin}>
                    <Input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        placeholder="E-mail"
                        type="email"
                        required
                        autoComplete="email"
                    />
                    <Input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        placeholder="Senha"
                        type="password"
                        required
                        autoComplete="password"
                    />
                    <FormButton type="submit">ENTRAR</FormButton>
                </Form>
                <Link to="/SignUp">Não tem uma conta? Cadastre-se!</Link>
            </Page>
        </StyledLogin>
    )
}


const StyledLogin = styled.div`
    width: 100%;
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    a{
        margin-top: 8px;
        color: #FFFFFF;
        font-size: 14px;
        text-decoration: underline;
        font-family: "Roboto";
    }
    img{
        margin-bottom: 20px;
    }
`
const Page = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;


const Form = styled.form`
width: 100%;
display: flex;
flex-direction: column;
gap: 6px;
margin-bottom: 25px;
`;



const Input = styled.input`
width: 100%;
height: 45px;
background: white;
border: 1px solid #DBDBDB;
border-radius: 8px;
box-sizing: border-box;
padding: 11px;
margin-top: 20px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #7E7E7E;
`;

const FormButton = styled.button`
width: 100%;
height: 45px;
border: none;
background: #FF4791;
border-radius: 8px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
margin-top: 20px;
`;