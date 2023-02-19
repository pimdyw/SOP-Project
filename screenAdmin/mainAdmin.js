import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet, Button, Easing } from "react-native";
import { Link } from "react-router-dom";
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../css/mainAdmin.css';



const mainAdmin = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState(0);
    const [id, setId] = useState("");
    const [ingredient, setIngredient] = useState([]);
    const [quantity, setqQantity] = useState(0);
    const [wait, setWait] = useState(0);
    const [process, setProcess] = useState(0);
    const [success, setSuccess] = useState(0);

    const updateRestaurant = () => {
        NotificationManager.warning('Processing', 'กำลัง Update', 3000);
        axios.get("http://localhost:8082/restaurant-service/restaurant/update/", {
            params: {
                id: id,
                name: name,
                phone: phone,
                status: status
            },
            crossdomain: true
        }).then(res => {
            NotificationManager.success('Success message', 'Update สำเร็จ', 2000);
            console.log("อัพเดทสำเร็จ", res)
        })

    }
    const updateStorage = () => {
        const array = ingredient
        const bodyFormData = new FormData();
        array.forEach((item) => {
            NotificationManager.warning('Processing', 'กำลัง Update', 3000);
            axios.get('http://localhost:8082/storage-service/storage/save', {
                params: {
                    id: item._id,
                    ingredient: item.ingredient,
                    main: item.main,
                    quantity: item.quantity
                },
                crossdomain: true
            }).then(res => {
                NotificationManager.success('Success message', 'Update สำเร็จ', 2000);
                console.log("อัพเดทสำเร็จ", res)
            })
        });
    }
    const renderOrder = () => {
        axios.get("http://localhost:8082/order-service/order").then((res) => {
            let data = [];
            let wait = 1;
            let pro = 1;
            let suc = 1;
            data = res.data.map((value) => {
                if (value.status == "processing") {
                    setProcess(pro++)
                }
                if (value.status == "success") {
                    setSuccess(suc++)
                }
                if (value.status == "wait") {
                    setWait(wait++)
                }
            })

        })
    }

    useEffect(() => {
        axios.get("http://localhost:8082/restaurant-service/restaurant", { crossdomain: true }).then(res => {
            setName(res.data[0].name)
            setPhone(res.data[0].phone)
            setStatus(res.data[0].status)
            setId(res.data[0]._id)
        })
        axios.get("http://localhost:8082/storage-service/storage").then((res) => {
            console.log(res.data)
            console.log(res.data[0])
            setIngredient(res.data)

        })
        renderOrder();
    }, [])

    function increaseValue(name) {

        const data = ingredient.filter((value) => value.ingredient == name)
        data[0].quantity--;
        console.log(data)
        document.getElementById(data[0]._id).value = data[0].quantity

    }

    function decreaseValue(name) {

        const data = ingredient.filter((value) => value.ingredient == name)
        data[0].quantity++;
        console.log(data)
        document.getElementById(data[0]._id).value = data[0].quantity
    }
    return (
        <View style={styles.container} className="body">
            <NotificationContainer />
            <div className="div1">
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2vw' }}>
                    <Link to="/"><button className="buttonOut" variant="contained" style={{ cursor: 'pointer' }}>
                        <a className="div1" style={{ fontSize: '1vw', color: 'white' }}>ออกจากระบบ</a>
                    </button></Link>
                </div>
            </div>
            <div className="div2">
                <div style={{ display: 'flex', justifyContent: 'center', marginRight: '2vw' }}>
                    <Link to="/adminPanel"><button className="btn-Click" variant="contained" style={{ cursor: 'pointer' }}>
                        <a className="div2" style={{ fontSize: '1vw', color: 'black' }}>หน้าหลัก</a>
                    </button></Link>

                    <Link to="/totalproduct"><button className="buttonAll" variant="contained" style={{ cursor: 'pointer' }}>
                        <a className="div2" style={{ fontSize: '1vw', color: 'black' }}>ดูยอดทั้งหมด</a>
                    </button></Link>
                </div>
            </div>
            <div className="div3">
                <div style={{ display: 'flex', justifyContent: 'center', marginRight: '2vw' }}>
                    <Link to="/waiting1"><button className="buttonAll" variant="contained" style={{ cursor: 'pointer' }}>
                        <a className="div3" style={{ fontSize: '1vw', color: 'black' }}>รอการทำรายการ ({wait})</a>
                    </button></Link>
                    <Link to="/waiting2"><button className="buttonAll" variant="contained" style={{ cursor: 'pointer' }}>
                        <a className="div3" style={{ fontSize: '1vw', color: 'black' }}>กำลังทำรายการ ({process})</a>
                    </button></Link>
                    <Link to="/waiting3"><button className="buttonAll" variant="contained" style={{ cursor: 'pointer' }}>
                        <a className="div3" style={{ fontSize: '1vw', color: 'black' }}>ทำรายการสำเร็จ ({success})</a>
                    </button></Link>

                </div>
            </div>
            <div className="div4" style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5vw' }}>
                <div className="divContent" >
                    <div style={{ display: 'grid', justifyContent: 'flex-start', marginRight: '2vw' }}>
                        <div style={{ display: 'flex', margin: '0.5vw' }}>
                            <label htmlFor="fname">ชื่อร้านอาหาร:</label>
                            <input onChange={(event) => {
                                setName(event.target.value)
                            }} value={name} style={{ marginLeft: '0.5vw' }} type="text" />
                            <label htmlFor="fname" style={{ marginLeft: '0.5vw' }}>โทรศัพท์:</label>
                            <input onChange={(event) => {
                                setPhone(event.target.value)
                            }} value={phone} style={{ marginLeft: '0.5vw' }} type="text" />
                        </div>
                        <div style={{ display: 'flex', margin: '0.5vw' }}>
                            <a>สถานะ: </a>
                            <input type="radio" id="open" checked={status == "1"} name="status" value="1" onChange={(value) => {
                                setStatus(1)
                            }} />
                            <label for="open">เปิด</label>
                            <input type="radio" id="close" checked={status == "0"} name="status" value="0" onChange={(value) => {
                                setStatus(0)
                            }} />
                            <label for="close">ปิด</label>
                        </div>
                        <div style={{ width: '80vw' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2vw' }}>

                                <button className="buttonSubmit" variant="contained" style={{ cursor: 'pointer' }} onClick={updateRestaurant}>
                                    <a className="div1" style={{ fontSize: '1vw', color: 'white' }} >Submit</a>
                                </button>

                            </div>
                        </div>
                        <div style={{ display: 'flex', margin: '0.5vw' }}>
                            <label htmlFor="fname">รายการอาหาร:</label>
                            <Link to={"/allProduct"}><button className="buttonFood" variant="contained" style={{ cursor: 'pointer' }}>
                                <a className="div2" style={{ fontSize: '0.8vw', color: 'black' }}>เมนูอาหารทั้งหมด</a>
                            </button></Link>
                            <Link to={"/addMenuAdmin"}><button className="buttonFood" variant="contained" style={{ cursor: 'pointer' }}>
                                <a className="div2" style={{ fontSize: '0.8vw', color: 'black' }}>เพิ่มเมนูใหม่</a>
                            </button></Link>
                        </div>
                        <div style={{ margin: '0.5vw' }}>
                            <a>วัตถุดิบ: </a>
                            <div style={{ display: 'grid', justifyContent: 'flex-start', marginRight: '2vw', marginTop: '1vw', gridTemplateColumns: "repeat(5, 1fr)", gridGap: 6 }}>
                                {
                                    ingredient.map((value) => {
                                        return (

                                            <from className="fromMenu" key={value._id}>
                                                <label className="labelMenu" for="close">{value.ingredient}</label>
                                                <div class="value-button" id="decrease" onClick={(event) => { increaseValue(value.ingredient) }} value="Decrease Value">-</div>
                                                <input type="number" className="valueIn" id={value._id} value={value.quantity} />
                                                <div class="value-button" id="increase" onClick={(event) => { decreaseValue(value.ingredient) }} value="Increase Value">+</div>

                                            </from>
                                        )
                                    })
                                }

                            </div>

                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2vw', marginTop: '1.5vw' }}>

                        <button className="buttonSubmit" variant="contained" style={{ cursor: 'pointer' }} onClick={updateStorage}>
                            <a className="div1" style={{ fontSize: '1vw', color: 'white' }}>Submit</a>
                        </button>

                    </div>
                </div>

            </div>

        </View >
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
export default mainAdmin;