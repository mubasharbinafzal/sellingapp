import React from "react";
import Login from "../components/Login"
import PersonalInfo from "../components/PersonalInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/PersonalInfo" element={<PersonalInfo />} />
            </Routes>
        </BrowserRouter>
    );

}
