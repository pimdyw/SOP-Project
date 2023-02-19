import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Homepage from "./screen/HomePage";
import LoginPage from "./screen/LoginPage";
import Cart from "./screen/Cart";
import SelectMenu from "./screen/selectMenu";
import MainAdmin from "./screenAdmin/mainAdmin";
import Queue from "./screen/queue";

import Allpd from "./screenAdmin/allProduct";
import WaitOne from "./screenAdmin/waitingitem1";
import WaitTwo from "./screenAdmin/waitingitem2";
import WaitThree from "./screenAdmin/waitingitem3";
import AddMenuAdmin from "./screenAdmin/addMenuAdmin";
import Total from "./screenAdmin/total";
import EditMenu from "./screenAdmin/editMenu";

export default function App() {

  useEffect(() => {
  }, [])


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/select" element={ <SelectMenu/> }/>
      <Route path="/adminPanel" element={<MainAdmin/>}/>
      <Route path="/queue" element={<Queue/>}/>

      <Route path="/allProduct" element={<Allpd/>}/>
      <Route path="/waiting1" element={<WaitOne/>}/>
      <Route path="/waiting2" element={<WaitTwo/>}/>
      <Route path="/waiting3" element={<WaitThree/>}/>
      <Route path="/addMenuAdmin" element={<AddMenuAdmin/>}/>
      <Route path="/totalproduct" element={<Total/>}/>
      <Route path="/editMenu" element={<EditMenu/>}/>
    </Routes>
    </BrowserRouter>
  );
}
