
import { Animated, Text, View, StyleSheet, Button, Easing } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../css/addMenu.css';

const addMenuAdmin = () => {
    const location = useLocation();
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const [id, setId] = useState("");
    const [image, setImage] = useState("");
    const [foodName, setFoodName] = useState("");
    const [foodIngredient, setFoodIngredient] = useState("หมู");
    const [foodMain, setFoodMain] = useState("ข้าว");
    const [file, setFile] = useState();
    const [price, setPrice] = useState(0);

    const add = () => {
        
        NotificationManager.warning('Processing', 'กำลังเพิ่มเมนูอาหาร', 3000);
        var config = {
            method: 'post',
            url: 'https://www.googleapis.com/upload/drive/v3/files/',
            headers: {
                'Authorization': 'Bearer ya29.a0AX9GBdXvBFR5dlgBCe-cfYF0knJTQ-e6bBPlQUb1MXcvOjhipR25urVymhNB1j6iufmg_THWIc1m_NAv6UU-aMQgqh4qYScjDK02iiQjv1ac6a2034kKqiKCAQmFG-FTmloCxyaaRGY6u0Jsl3GcYdGmPQW3_OQaCgYKAaQSAQASFQHUCsbCv-tljYwuKZGxyjJegZnZ4g0166',
                'Content-Type': 'image/png'
            },
            data: file
        };

        axios(config)
            .then(response => {
                let imageURL = "";
                setImage("https://drive.google.com/uc?export=view&id=" + response.data.id)
                imageURL = "https://drive.google.com/uc?export=view&id=" + response.data.id

                const fileId = response.data.id;
                const permissionConfig = {
                    method: 'post',
                    url: `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
                    headers: {
                        'Authorization': 'Bearer ya29.a0AX9GBdXvBFR5dlgBCe-cfYF0knJTQ-e6bBPlQUb1MXcvOjhipR25urVymhNB1j6iufmg_THWIc1m_NAv6UU-aMQgqh4qYScjDK02iiQjv1ac6a2034kKqiKCAQmFG-FTmloCxyaaRGY6u0Jsl3GcYdGmPQW3_OQaCgYKAaQSAQASFQHUCsbCv-tljYwuKZGxyjJegZnZ4g0166',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "role": "reader",
                        "type": "anyone"
                    }
                };

                axios(permissionConfig)
                axios.get("http://localhost:8082/food-service/add", {
                    params: {
                        id: id,
                        image: imageURL,
                        name: foodName,
                        main: foodMain,
                        ingredient: foodIngredient,
                        price: price,
                    }
                }).then(res => {
                    NotificationManager.success('Success message', 'เพิ่มเมนูอาหารสำเร็จ', 2000);
                    window.location.replace("/allProduct")
                    console.log("update Success")
                })
            })
            .catch(error => {
                NotificationManager.error('Try again', 'เพิ่มเมนูอาหารไม่สำเร็จ', 2000, () => {
                    alert('callback');
                  });
                console.log(error);
            });

    }


    return (
        <View style={styles.container} className="body">
            <div className="div1">
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2vw' }}>
                    <Link to="/"><button className="buttonOut" variant="contained" style={{ cursor: 'pointer' }}>
                        <a className="div1" style={{ fontSize: '1vw', color: 'white' }}>ออกจากระบบ</a>
                    </button></Link>
                </div>
            </div>
            <div className="first-container">
                <h1>เพิ่มเมนูอาหาร</h1>
                <div className="secound-container">
                    <div className='choice'>
                        <label >ชื่อเมนู</label>
                        <input value={foodName} onChange={(event) => {
                            setFoodName(event.target.value)
                        }} type="text" className='add-on'></input>
                    </div>
                    <div className='choice'>
                        <label style={{ marginRight: "1vw" }}>ราคา</label>
                        <input value={price} onChange={(event) => {
                            setPrice(event.target.value)
                        }} type="text" className='add-on'></input>
                    </div>
                    <div className='choice'>
                        <label style={{ marginRight: "1vw" }}>รูปภาพ</label>
                        <input onChange={(event) => {
                            setFile(event.target.files[0]);
                            console.log(event.target.files[0])
                        }} type="file"></input>
                    </div>
                    {/* <img src="https://cdn.discordapp.com/attachments/752894614448635944/1052896924497346621/salad.gif" alt='food img' width={180}></img> */}
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
                                <label style={{ marginTop: "0.6vw" }}>ข้าว</label>
                            </div>
                            <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                                <input checked={foodIngredient == "หมู"} type="radio" value="หมู" name="ingredient" style={{ marginRight: "0.5vw" }}
                                    onChange={(event) => {

                                        setFoodIngredient(event.target.value)
                                    }} />
                                <label style={{ marginTop: "0.6vw" }}>หมู</label>
                            </div>
                        </div>
                        <div>
                            <div className='sub-choice-select'>
                                <input checked={foodMain == "เส้นมาม่า"} type="radio" value="เส้นมาม่า" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                    setFoodMain(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>เส้นมาม่า</label>
                            </div>
                            <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                                <input checked={foodIngredient == "ไก่"} type="radio" value="ไก่" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {

                                    setFoodIngredient(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>ไก่</label>
                            </div>
                        </div>
                        <div>
                            <div className='sub-choice-select'>
                                <input checked={foodMain == "วุ้นเส้น"} type="radio" value="วุ้นเส้น" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                    setFoodMain(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>วุ้นเส้น</label>
                            </div>
                            <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                                <input checked={foodIngredient == "เนื้อ"} type="radio" value="เนื้อ" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {

                                    setFoodIngredient(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>เนื้อ</label>
                            </div>
                        </div>
                        <div>
                            <div className='sub-choice-select'>
                                <input checked={foodMain == "เส้นหมี่"} type="radio" value="เส้นหมี่" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                    setFoodMain(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>เส้นหมี่</label>
                            </div>
                            <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                                <input checked={foodIngredient == "กุ้ง"} type="radio" value="กุ้ง" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {

                                    setFoodIngredient(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>กุ้ง</label>
                            </div>
                        </div>
                        <div>
                            <div className='sub-choice-select'>
                                <input checked={foodMain == "มักกะโรนี"} type="radio" value="มักกะโรนี" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                    setFoodMain(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>มักกะโรนี</label>
                            </div>
                            <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                                <input checked={foodIngredient == "หมึก"} type="radio" value="หมึก" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {

                                    setFoodIngredient(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>หมึก</label>
                            </div>
                        </div>
                        <div>
                            <div className='sub-choice-select'>
                                <input checked={foodMain == "สปาเกตตี้"} type="radio" value="สปาเกตตี้" name="main" style={{ marginRight: "0.5vw" }} onChange={(event) => {
                                    setFoodMain(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>สปาเกตตี้ </label>
                            </div>
                            <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                                <input checked={foodIngredient == "หมูกรอบ"} type="radio" value="หมูกรอบ" onChange={(event) => {

                                    setFoodIngredient(event.target.value)
                                }} name="ingredient" style={{ marginRight: "0.5vw" }} />
                                <label style={{ marginTop: "0.6vw" }}>หมูกรอบ</label>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <div>
                            </div>
                            <div className='sub-choice-select' style={{ marginTop: "1vw" }}>
                                <input checked={foodIngredient == "ไส้กรอก"} type="radio" value="ไส้กรอก" name="ingredient" style={{ marginRight: "0.5vw" }} onChange={(event) => {

                                    setFoodIngredient(event.target.value)
                                }} />
                                <label style={{ marginTop: "0.6vw" }}>ไส้กรอก</label>
                            </div>
                        </div>
                    </div>
                    {/* <div className='choice'>
                    <label >หมายเหตุ</label>
                    <input type="text" className='add-on'></input>
                </div> */}
                    <div className="button-adminPage">
                        {/* <div className='manage-button'>
                        <div onClick={toggle} style={{ marginRight: "2vw" }}>
                            {LikeMenu ? <img src='https://cdn.discordapp.com/attachments/752894614448635944/1052896925231366184/heart.png' width={"30vh"}></img> :
                                <img src='https://cdn.discordapp.com/attachments/752894614448635944/1054314834289758258/love.png' width={"30vh"}></img>
                            }
                        </div>
                        <div>
                            <img src='https://cdn.discordapp.com/attachments/752894614448635944/1052896924904202310/carts.png' width={"30vh"}></img>
                        </div>
                    </div> */}
                        <div style={{ marginRight: "2vw", cursor: 'pointer' }}>
                            <button className='buttonSubmit' style={{ cursor: 'pointer' }} onClick={() => {
                                add()
                            }}>บันทึก</button>
                        </div>
                        <div >
                            <Link to="/adminPanel" >
                                <button className='buttonBack' style={{ cursor: 'pointer' }}>ย้อนกลับ</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer/>


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F0E0",
        width: '100%',
        height: '100%',
    },

});
export default addMenuAdmin;