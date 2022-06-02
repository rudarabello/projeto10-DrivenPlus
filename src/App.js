import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContext from "./contexts/LoginContext";
import Login from "./components/Login"
import SignUp from "./components/SignUp";
import Subscriptions from "./components/Subscriptions";
import Plan from "./components/Plan";
import Home from "./components/Home";
import { useState } from "react";

export default function App() {
    const [account, setAccount] = useState([{}]);
    const [plan, setPlan] = useState([]);
    return (
        <LoginContext.Provider value={{account, setAccount, plan, setPlan}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/subscriptions" element={<Subscriptions />} />
                        <Route path="/plan/:idPlan" element={<Plan />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </BrowserRouter>
        </LoginContext.Provider>
    )
}