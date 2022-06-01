import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginContext from "./contexts/LoginContext";
import Login from "./components/Login"
import SignUp from "./components/SignUp";
import Subscriptions from "./components/Subscriptions";
import SubscriptionsId from "./components/SubscriptionsId";
import Home from "./components/Home";

export default function App() {

    const [account, setAccount] = useState({
        id: "",
        name: "",
        cpf: "",
        email: "",
        password: "",
        membership: "",
        token: ""
    });
    const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [id, setId] = useState("");
    
    

    return (
        <LoginContext.Provider value={{ account, setAccount }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/subscriptions" element={<Subscriptions setPrice={price} setImage={image} setId={id}/>}/>
                    <Route path="/subscriptions/:id" element={<SubscriptionsId price={price} image={image} id={id}/>}/>
                    <Route path="/home" element={<Home  />} />
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    )
}