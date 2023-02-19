import React, { useRef, useState, useEffect } from "react";
import { Animated, Text, View, StyleSheet, Button, Easing } from "react-native";
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/mainAdmin.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Cart = () => {
    const [food, setFood] = useState([]);
    const [sum, setSum] = useState(0);
    const [customer, setCustomer] = useState("");
    const [phone, setPhone] = useState("");
    const [payment, setPayment] = useState("cash")
    const [count, setCount] = useState(0);
    let number = 0;

    useEffect(() => {
        let name, ingredient, price, other = "";
        if (localStorage.getItem("CartName")) {
            name = localStorage.getItem("CartName").split(",")
        }
        if (localStorage.getItem("CartIngredient")) {
            ingredient = localStorage.getItem("CartIngredient").split(",")
        }
        if (localStorage.getItem("CartPrice")) {
            price = localStorage.getItem("CartPrice").split(",")
        }
        if (localStorage.getItem("CartOther")) {
            other = localStorage.getItem("CartOther").split(",")
        }
        if (name != undefined) {
            axios.get("http://localhost:8082/food-service/food", { crossdomain: true }).then(res => {
                let filter = []
                name.map((item, index) => {
                    res.data.map((value) => {
                        if (item == value.name) {
                            value.price = price[index]
                            value.ingredient = ingredient[index]
                            value.other = other[index]
                            filter.push(value)
                        }
                    })
                })
                setFood(filter)
                setCount(filter.length)
                filter.forEach(value => {
                    number += parseInt(value.price);
                })
                setSum(number);
            })
        }

    }, [])

    const createOrder = () => {
        if (customer != "" && phone != "") {
            food.map((value) => {
                console.log(value)
                axios.get("http://localhost:8082/order-service/create", {
                    params: {
                        name: customer,
                        phone: phone,
                        food: value.name + " (" + value.ingredient + ")",
                        other: value.other,
                        price: value.price,
                        payment: payment

                    }
                })
                let array = value.ingredient.split("+");
                let mainData = array[0]
                let ingredientData = array[1]
                console.log(mainData, ingredientData)
                axios.get("http://localhost:8082/storage-service/storage/discount", {
                    params: {
                        main: mainData,
                        ingredient: ingredientData,
                    }
                })
            })
            NotificationManager.success('Success message', 'สั่งซื้อสำเร็จ', 2000);
            localStorage.removeItem("CartName");
            localStorage.removeItem("CartIngredient")
            localStorage.removeItem("CartPrice")
            localStorage.removeItem("CartOther")
            setTimeout(() => {
                window.location.replace("/")
            }, 3500)
        } else {
            // alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            NotificationManager.error('Try again', 'กรุณากรอกข้อมูลให้ครบถ้วน', 2000, () => {
                alert('callback');
            });
        }

    }

    const removeCart = () => {
        NotificationManager.success('Success message', 'ลบสินค้าในตระกร้าสำเร็จ', 2000);

        window.location.replace("/")
        localStorage.removeItem("CartName");
        localStorage.removeItem("CartIngredient")
        localStorage.removeItem("CartPrice")
        localStorage.removeItem("CartOther")
    }
    return (
        <View style={styles.container}>
            <div>
                <div>
                    <p style={styles.textcard}>ตระกร้า</p>
                </div>
                {count == 0 ?
                    <div style={styles.card}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "10vw" }}>
                            <img src="https://cdn.discordapp.com/attachments/752894614448635944/1055029480588062721/carts.png" width={"200vw"}></img>
                            <p style={{ marginLeft: "2vw" }}>ขณะนี้ยังไม่มีสินค้าอยู่ในตระกร้า</p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '1vw', marginLeft: "2.3vw" }}>
                                <Link to={"/"}><button className="buttonMain" style={{ color: 'white', cursor: 'pointer', marginRight: "0vw" }}>
                                    เมนูหลัก
                                </button></Link>
                            </div>
                        </div>
                    </div>

                    :
                    <div style={styles.card}>
                        {
                            food.map((value) => {
                                return (
                                    <div style={styles.card2}>
                                        <div style={styles.dis}>
                                            <img style={styles.image} src={value.image} alt="Logo" />
                                            <div style={styles.textfood}>
                                                <a style={{ fontSize: '1.5vw', marginTop: '0.5vw' }}>เมนู: {value.name}</a>
                                                <a style={{ fontSize: '1.2vw' }}>วัตถุดิบ: {value.ingredient}</a>
                                                <a style={{ fontSize: '1.2vw' }}>ราคา: {value.price} ฿</a>
                                                <a style={{ fontSize: '1.2vw' }}>อื่นๆ: {value.other}</a>
                                                {/* <a style={{ fontSize: '1.2vw' }}>888</a> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* ---------------------------------------------------------- */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button variant="contained" onClick={removeCart} style={styles.buttonDel}>
                                <Text style={{ fontSize: '1vw', color: 'white' }}>DELETE</Text>
                            </button>
                        </div>
                        <div className="under-datalist">

                            <div className="user-data">

                                <div className="InputConfirm">
                                    <div>
                                        <label className="labelnameConfirm" for="fname">ผู้สั่งซื้อ</label>
                                        <input value={customer} onChange={(event) => {
                                            setCustomer(event.target.value)
                                        }} className="inputConfirm" type="text" id="fname" name="firstname"></input>
                                    </div>
                                    <div>
                                        <label className="labelnameConfirm" for="fname">เบอร์ติดต่อ</label>
                                        <input value={phone} onChange={(event) => {
                                            setPhone(event.target.value)
                                        }} type="text" id="phone" name="phone"></input>
                                    </div>
                                </div>
                                <div className="how-to-pay">
                                    <div className="money">
                                        <input value="cash" name="payment" checked={payment == "cash"} onChange={(event) => {
                                            setPayment(event.target.value)
                                        }} type="radio" style={{ marginRight: "1vw" }}></input>
                                        <label style={{ marginTop: "0.5vw" }}>เงินสด</label>
                                    </div>
                                    <div className="money">
                                        <input value="prompt" name="payment" type="radio" style={{ marginRight: "1vw" }} onChange={(event) => {
                                            setPayment(event.target.value)
                                        }}></input>
                                        <img src="https://cdn.discordapp.com/attachments/753288592071196713/1054474018801066094/1nueyBV0RNEpETYMKpsYWhA.png" width={"50vw"}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="buttonGroup">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginBottom: '1vw', marginRight: "3vw" }}>
                                    <img src="https://cdn.discordapp.com/attachments/753288592071196713/1054475229495308308/pay.png" width={"100vw"}></img>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2vw' }}>
                                    <button variant="contained" style={styles.buttonTotal}>
                                        <Text style={{ fontSize: '1.4vw', color: 'white' }}>Total: {sum} B</Text>
                                    </button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2vw', marginTop: '1vw' }}>
                                    <Link to={"/"}><button className="buttonMain" style={{ color: 'white', cursor: 'pointer', marginRight: "1vw" }}>
                                        เมนูหลัก
                                    </button></Link>
                                    <button onClick={createOrder} variant="contained" className="buttonSubmit" style={{ color: 'white', cursor: 'pointer' }}>
                                        ยืนยัน
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </div>
            <NotificationContainer />

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
    card: {
        transition: '0.3s',
        width: '95%',
        height: '100%',
        border: '0.25vw solid #927363',
        borderRadius: '2vw',
        backgroundColor: '#F7E6C4',
        marginLeft: '2%',
        // display: 'flex',
        justifyContent: 'center'
        // boxShadow: '0 4px 8px 0 ',
    },
    card2: {
        transition: '0.3s',
        margin: '1%',
        border: '8px solid #B2918A',
        borderRadius: '3vw',
        backgroundColor: '#B2918A',
    },
    image: {
        width: '10%',
        height: '10%',
        marginLeft: '2%',
        display: 'flex',
        borderRadius: '2vw',
    },
    textcard: {
        fontSize: '2.5vw',
        marginLeft: '3%',
        color: '#71463C'
    },
    textfood: {
        display: 'grid',
        marginLeft: '2%'
    },
    dis: {
        display: 'flex'
    },
    button1: {
        color: 'white',
        cursor: 'pointer',
        borderRadius: '2vw',
        backgroundColor: '#F7E6C4'
    },
    buttonDel: {
        borderRadius: '2vw',
        cursor: 'pointer',
        backgroundColor: '#F36155',
        border: '0.25vw solid #F36155',
        width: '25%',
        height: '60%',
        // marginLeft: '52vw',
        // marginTop: '2vw',
    },
    buttonTotal: {
        borderRadius: '2vw',
        backgroundColor: '#B2918A',
        border: '0.1vw solid #F69443C',
        width: '21vw',
        // height: '40%'
    },
    buttonMenu: {
        borderRadius: '2vw',
        cursor: 'pointer',
        backgroundColor: '#B2918A',
        border: '0.5vw solid #B2918A',
        width: '10vw',
        height: '3.1vw',
        fontSize: '1.4vw',
        color: 'white'
    },
    buttonConfirm: {
        borderRadius: '2vw',
        cursor: 'pointer',
        backgroundColor: '#7AD441',
        border: '0.5vw solid #7AD441',
        width: '12%',
        height: '40%',
        marginLeft: '0.5vw'
    }




});
export default Cart;