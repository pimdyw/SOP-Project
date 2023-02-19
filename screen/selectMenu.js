import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import '../css/selectMenu.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function SelectMenu() {
    const [foodSelect, setFoodSelect] = useState({});
    const location = useLocation();
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const [LikeMenu, SetlikeMenu] = useState(false);
    const [ingredient, setIngredient] = useState([]);
    const [price, setPrice] = useState(0);
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [foodIngredient, setFoodIngredient] = useState("");
    const [foodMain, setFoodMain] = useState("");
    const [text, setText] = useState("");
    
    //storage
    const [rice, setRice] = useState(0);
    const [busy, setBusy] = useState(0);
    const [spaghetti, setSpaghetti] = useState(0);
    const [vermicelli, setVermicelli] = useState(0);
    const [macaroni, setMacaroni] = useState(0);
    const [instantnoodles, setInstantNoodles] = useState(0);
    const [pork, setPork] = useState(0);
    const [squid, setSquid] = useState(0);
    const [shrimp, setShrimp] = useState(0);
    const [chicken, setChicken] = useState(0);
    const [fish, setFish] = useState(0);
    const [bacon, setBacon] = useState(0);
    const [crispypork, setCrispypork] = useState(0);
    const [sausage, setSausage] = useState(0);
    const [meet, setMeet] = useState(0);

    const save = () => {
        let name = foodSelect.name;
        if (localStorage.getItem("CartName")) {
            let storage = localStorage.getItem("CartName")
            localStorage.setItem("CartName", storage + "," + name)
        } else {
            localStorage.setItem("CartName", name)
        }

        if (localStorage.getItem("CartIngredient")) {
            let storage = localStorage.getItem("CartIngredient")
            localStorage.setItem("CartIngredient", storage + "," + foodMain + "+" + foodIngredient)
        } else {
            localStorage.setItem("CartIngredient", foodMain + "+" + foodIngredient)
        }

        if (localStorage.getItem("CartPrice")) {
            let storage = localStorage.getItem("CartPrice")
            localStorage.setItem("CartPrice", storage + "," + price)
        } else {
            localStorage.setItem("CartPrice", price)
        }
        let txt = text
        if (!txt){
            txt = "-"
        }
        if (localStorage.getItem("CartOther")) {
            let storage = localStorage.getItem("CartOther")
            localStorage.setItem("CartOther", storage + "," + txt)
        } else {
            localStorage.setItem("CartOther", txt)
        }
        NotificationManager.success('Success message', 'เพิ่มไปยังรถเข็นแล้ว', 2000);
    }

    useEffect(() => {
        axios.get("http://localhost:8082/food-service/food/" + params.get('value').split('"')[1], { crossdomain: true }).then(res => {
            setFoodSelect(res.data)
            setFoodIngredient(res.data.ingredient)
            setFoodMain(res.data.main)
            setDefaultPrice(res.data.price)
            setPrice(res.data.price)
        })
        axios.get("http://localhost:8082/storage-service/storage").then((res) => {
            setIngredient(res.data)
            res.data.map((val) => {
                if (val.ingredient == "ข้าว"){
                    setRice(val.quantity)
                }else if (val.ingredient == "วุ้นเส้น"){
                    setBusy(val.quantity)
                }else if (val.ingredient == "สปาเกตตี้"){
                    setSpaghetti(val.quantity)
                }else if (val.ingredient == "เส้นหมี่"){
                    setVermicelli(val.quantity)
                }else if (val.ingredient == "มักกะโรนี"){
                    setMacaroni(val.quantity)
                }else if (val.ingredient == "เส้นมาม่า"){
                    setInstantNoodles(val.quantity)
                }else if (val.ingredient == "หมู"){
                    setPork(val.quantity)
                }else if (val.ingredient == "หมึก"){
                    setSquid(val.quantity)
                }else if (val.ingredient == "กุ้ง"){
                    setShrimp(val.quantity)
                }else if (val.ingredient == "ไก่"){
                    setChicken(val.quantity)
                }else if (val.ingredient == "ปลา"){
                    setFish(val.quantity)
                }else if (val.ingredient == "เบคอน"){
                    setBacon(val.quantity)
                }else if (val.ingredient == "หมูกรอบ"){
                    setCrispypork(val.quantity)
                }else if (val.ingredient == "ไส้กรอก"){
                    setSausage(val.quantity)
                }else if (val.ingredient == "เนื้อ"){
                    setMeet(val.quantity)
                }
            })
        })
    }, [])

    return (
        <div className="container-select">
            <div className="container-select2">
                <div>
                    <h1>{foodSelect.name}</h1>
                    <img src={foodSelect.image} style={{ borderRadius: '2vw' }} alt='food img' width={"200vw"}></img>
                </div>
                <div className='choice-select'>
                    <div style={{ display: "flex", alignItems: "center", marginRight: "1vw", flexDirection: "column", justifyContent: "space-around" }}>
                        <label>ข้าว/เส้น</label>
                        <label>เนื้อสัตว์</label>
                    </div>
                    <div>
                        <div className='sub-choice-select'>
                            <input checked={foodMain == "ข้าว"} type="radio" value="ข้าว" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setFoodMain(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>ข้าว ({rice})</label>
                        </div>
                        <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                            <input checked={foodIngredient == "หมู"} type="radio" value="หมู" name="ingredient" style={{ marginRight: "0.5vw" }}
                                onChange={(event) => {
                                    setPrice(defaultPrice)
                                    setFoodIngredient(event.target.value)
                                }} />
                            <label style={{ marginTop: "0.6vw" }}>หมู ({pork}) +0฿</label>
                        </div>
                    </div>
                    <div>
                        <div className='sub-choice-select'>
                            <input checked={foodMain == "เส้นมาม่า"} type="radio" value="เส้นมาม่า" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setFoodMain(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>เส้นมาม่า ({instantnoodles})</label>
                        </div>
                        <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                            <input checked={foodIngredient == "ไก่"} type="radio" value="ไก่" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setPrice(defaultPrice)
                                setFoodIngredient(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>ไก่ ({chicken}) +0฿</label>
                        </div>
                    </div>
                    <div>
                        <div className='sub-choice-select'>
                            <input checked={foodMain == "วุ้นเส้น"} type="radio" value="วุ้นเส้น" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setFoodMain(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>วุ้นเส้น ({busy})</label>
                        </div>
                        <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                            <input checked={foodIngredient == "เนื้อ"} type="radio" value="เนื้อ" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setPrice(defaultPrice + 5)
                                setFoodIngredient(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>เนื้อ ({meet}) +5฿</label>
                        </div>
                    </div>
                    <div>
                        <div className='sub-choice-select'>
                            <input checked={foodMain == "เส้นหมี่"} type="radio" value="เส้นหมี่" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setFoodMain(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>เส้นหมี่ ({vermicelli})</label>
                        </div>
                        <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                            <input checked={foodIngredient == "กุ้ง"} type="radio" value="กุ้ง" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setPrice(defaultPrice + 10)
                                setFoodIngredient(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>กุ้ง ({shrimp}) +10฿</label>
                        </div>
                    </div>
                    <div>
                        <div className='sub-choice-select'>
                            <input checked={foodMain == "มักกะโรนี"} type="radio" value="มักกะโรนี" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setFoodMain(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>มักกะโรนี ({macaroni})</label>
                        </div>
                        <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                            <input checked={foodIngredient == "หมึก"} type="radio" value="หมึก" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setPrice(defaultPrice + 10)
                                setFoodIngredient(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>หมึก ({squid}) +10฿</label>
                        </div>
                    </div>
                    <div>
                        <div className='sub-choice-select'>
                            <input checked={foodMain == "สปาเกตตี้"} type="radio" value="สปาเกตตี้" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setFoodMain(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>สปาเกตตี้ ({spaghetti})</label>
                        </div>
                        <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                            <input checked={foodIngredient == "หมูกรอบ"} type="radio" value="หมูกรอบ" onChange={(event) => {
                                setPrice(defaultPrice + 10)
                                setFoodIngredient(event.target.value)
                            }} name="ingredient" style={{ marginRight: "0.5vw" }} />
                            <label style={{ marginTop: "0.6vw" }}>หมูกรอบ ({crispypork}) +10฿</label>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <div>
                        </div>
                        <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                            <input checked={foodIngredient == "ไส้กรอก"} type="radio" value="ไส้กรอก" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                setPrice(defaultPrice)
                                setFoodIngredient(event.target.value)
                            }} />
                            <label style={{ marginTop: "0.6vw" }}>ไส้กรอก ({sausage}) +0฿</label>
                        </div>
                    </div>
                </div>
                <div className='choice-select'>
                    <label style={{ marginRight: "0.5vw" }}>หมายเหตุ</label>
                    <input type="text" value={text} onChange={(event) => {
                        setText(event.target.value)
                    }} className='add-on-select'></input>
                </div>
                <p style={{fontSize:'1.2vw'}}>ราคา {price} บาท</p>
                <div className="buttonBox">
                    <div className='manage-button'>
                        <div style={{cursor: 'pointer'}}  className='buy-but-select' onClick={save}>
                            <img src='https://cdn.discordapp.com/attachments/752894614448635944/1052896924904202310/carts.png' width={"20vw"} style={{marginRight: "1vw"}}></img>
                            <p style={{ fontSize: "1vw"}}>สั่งซื้อ</p>
                        </div>
                        <Link to="/"><button className="buttonBack" style={{cursor: 'pointer', marginLeft:'1vw'}}>ย้อนกลับ</button></Link>
                    </div>
                    {/* <div className='buy-but-select' style={{cursor: 'pointer'}}>สั่งซื้อ</div> */}
                </div>
            </div>
            <NotificationContainer/>

        </div>



    );
}

export default SelectMenu;