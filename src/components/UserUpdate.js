import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { ArrowBackOutline } from 'react-ionicons'
import Context from "../contexts/Context";


export default function UserUpdate() {
    const navigate = useNavigate();
    const { account, setAccount } = useContext(Context);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [password, setPassword] = useState("");
    const [cpf, setCPF] = useState("");
    const [name, setName] = useState("");

    function sendAlterationsToApi() {
        const decision = window.confirm(
            "Tem certeza que deseja atualizar o seu cadastro? Você terá que logar no aplicativo novamente!"
        );
        if (decision) {
            if (
                email !== "" &&
                cpf !== "" &&
                name !== "" &&
                password !== "" &&
                newPassword !== ""
            ) {
                const userAlterations = {
                    name: name,
                    cpf: cpf,
                    email: email,
                    currentPassword: password,
                    newPassword: newPassword,
                };
                const config = {
                    headers: {
                        Authorization: `Bearer ${account.token}`,
                    },
                };
                const promise = axios.put(
                    "https://mock-api.driven.com.br/api/v4/driven-plus/users/",
                    userAlterations,
                    config
                );

                promise.then((response) => {
                    setAccount(response.data);
                    console.log(response.data)
                    alert("Login alterado com sucesso");
                    navigate("/");
                });
                promise.catch((error) => {
                    alert("Houve um erro no procedimento, tente novamente mais tarde ", error);
                });
            } else alert("Por favor entre com todos os dados acima para mudar o seu cadastro...");

        }
    }

    return (
        <Container>
            <ContainerUsers>
                <BackArrow onClick={() => navigate(`/user/${account.id}`)}>
                    <ArrowBackOutline color={'#ffffff'} height="40px" width="40px" />
                </BackArrow>
                <ButtonsFromApi>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder={account.name}
                    />
                    <input
                        type="number"
                        onChange={(e) => setCPF(e.target.value)}
                        placeholder={account.cpf}
                    />
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={account.email}
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha Atual"
                    />
                    <input
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nova Senha"
                    />
                    <button
                        onClick={() => {
                            sendAlterationsToApi();
                        }}
                    >
                        SALVAR
                    </button>
                </ButtonsFromApi>
            </ContainerUsers>
        </Container>
    );
};

const BackArrow = styled.div`
    position: fixed;
    top: 10px;
    left: 38px;
    `;
const Container = styled.div`
background: black;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;
const ContainerUsers = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const ButtonsFromApi = styled.div`
width: 70%;
max-width: 260px;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 25%;
margin-bottom: 40%;
input {
    width: 100%;
    height: 45px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 10px;
}

button{
    width: 100%;
    height: 45px;
    margin-top: 10px;
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



