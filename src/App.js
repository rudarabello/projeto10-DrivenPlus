import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginContext from "./contexts/LoginContext";
import Login from "./components/Login"
import SignUp from "./components/SignUp";
import Home from "./components/Home";

export default function App() {

    const [token, setToken] = useState('');
    const [idPlano, setIdPlano] = useState('');
    const [name, setName] = useState('');


    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [id, setId] = useState('');

    return(
        <LoginContext.Provider value={{setIdPlano, setToken, token, idPlano, setName, name}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/signup" element={<SignUp />}/>
                    {/* <Route path="/subscriptions" element={<Subscriptions setPrice={setPrice} setImage={setImage} setId={setId}/>}/>
                    <Route path="/subscriptions/:id" element={<Subscriptionsid price={price} image={image} id={id}/>}/> */}
                    <Route path="/home" element={<Home idPlano={idPlano} />}/>
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    )
}