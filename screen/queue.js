import React, { useRef, useEffect, useState } from "react";
import { Animated, Text, View, StyleSheet, Button, Easing } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Link } from "react-router-dom";
import '../css/mainAdmin.css';
import axios from "axios";

const queue = () => {
    const [order, setOrder] = useState([]);
    const [countQ, setcountQ] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8082/order-service/order").then((res) => {
            console.log(res.data)
            let fil = res.data.filter((val) => {
                return val.status != "pay"
            })
            setOrder(fil)
            setcountQ(fil.length)
        })
    }, [])
    return (
        <View style={styles.container}>
            <div>
                <div >
                    <p style={styles.textcard}>คิวของฉัน {countQ} คิว</p>
                </div>
                <div style={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '2vw' }}>
                        <p>รายการอาหารทั้งหมด</p>
                    </div>
                    {order.map((val) => {
                        return (<div style={styles.card2}>
                            <div style={styles.dis}>
                                <img style={styles.image} src='https://cdn.discordapp.com/attachments/921293798884134923/1052594450414702602/2927347.png' alt="Logo" />
                                <div style={styles.textfood}>
                                    <a style={{ fontSize: '2vw', marginTop: '0.5vw', width: "40vw" }}>{val.food}</a>
                                    <a style={{ fontSize: '1.25vw' }}>ราคา: {val.price} บาท</a>
                                    <a style={{ fontSize: '1.25vw' }}>ผู้สั่ง: {val.name} เบอร์โทร: {val.phone}</a>
                                    {/* <a style={{ fontSize: '1.2vw' }}>888</a> */}
                                    {/* <button className="button" variant="contained" style={styles.button1}>
                                                    <Text color="black" style={{ fontSize: '0.8vw' }}>ดูรายละเอียด</Text>
                                                </button> */}
                                </div>
                                <div style={styles.dis3}>
                                    <div style={styles.card3}>
                                        <div style={styles.dis2}>
                                            <img style={styles.imageCheck} src='https://cdn.discordapp.com/attachments/921293798884134923/1052898900421390346/800px-Sign-check-icon.png' alt="Logo" />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <p style={{ fontSize: '1.5vw', marginTop: '0.5vw' }}>{val.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })}
                            {/* ------------------------------------------------ */}
                    {/* <div style={styles.dis}>
                            <img style={styles.image} src='https://cdn.discordapp.com/attachments/921293798884134923/1052594450414702602/2927347.png' alt="Logo" />
                            <div style={styles.textfood}>
                                <a style={{ fontSize: '1.2vw', marginTop: '0.5vw' }}>แพนแค้กหมูตุ๋น</a>
                                <a style={{ fontSize: '1vw' }}>35 B</a>
                               
                            </div>
                            <div style={styles.dis3}>
                                <div style={styles.card3}>
                                    <div style={styles.dis2}>
                                        <img style={styles.imageCheck} src='https://cdn.discordapp.com/attachments/921293798884134923/1052898900421390346/800px-Sign-check-icon.png' alt="Logo" />
                                    </div>
                                    <div style={{ display: 'grid', justifyContent: 'center' }}>
                                        <p style={{ fontSize: '0.8vw', marginLeft: '0.5vw', marginTop: '-0.1vw' }}>ยืนยันคำสั่งซื้อ</p>
                                    </div>
                                </div>
                            </div> */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2vw"}}>
                    {/* <Link to="/"><button className="buttonBack" variant="contained" style={{ cursor: 'pointer', marginRight: '2vw'  }}>
                        <a className="div1" style={{ fontSize: '1vw', color: 'blsck' }}>ย้อนกลับ</a>
                    </button></Link> */}
                    <Link to="/"><button className="buttonMain" variant="contained" style={{ cursor: 'pointer'}}>
                        <a className="div1" style={{ fontSize: '1vw', color: 'white' }}>หน้าหลัก</a>
                    </button></Link>
                </div>
                </div>

                {/* </div> */}
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
        padding: "1vw"
    },
    card: {
        transition: '0.3s',
        width: '95%',
        height: '100%',
        border: '0.25vw solid #927363',
        borderRadius: '2vw',
        backgroundColor: '#F7E6C4',
        margin: '2vw',
        display: 'grid',
        justifyContent: 'center',
        // boxShadow: '0 4px 8px 0 ',
    },
    card2: {
        width: '96%',
        height: '80%',
        transition: '0.3s',
        margin: '1.5vw',
        border: '7px solid #B2918A',
        borderRadius: '3vw',
        backgroundColor: '#B2918A',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",

    },
    card3: {
        width: '20%',
        height: '50%',
        transition: '0.3s',
        padding: '0.5vw',
        border: '7px solid #F8F0E0',
        borderRadius: '2vw',
        backgroundColor: '#F8F0E0',
        marginLeft: '10vw',
        marginTop: '1vw',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

    },
    image: {
        width: '10%',
        height: '10%',
        marginLeft: '1.5vw',
        display: 'flex'
    },
    imageCheck: {
        width: '30%',
        height: '30%',
        marginTop: '0.05vw',
        display: 'flex',
        marginLeft: '-1vw'
    },
    textcard: {
        fontSize: '2.5vw',
        marginLeft: '3vw',
        color: '#71463C'
    },
    textfood: {
        display: 'grid',
        marginLeft: '2vw'
    },
    dis: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginLeft: '1vw'
    },
    dis2: {
        display: 'flex',
        marginLeft: '1vw',
        justifyContent: 'center'
    },
    dis3: {
        display: 'flex',
        justifyContent: 'center'
    },

    button1: {
        color: 'white',
        cursor: 'pointer',
        borderRadius: '2vw',
        backgroundColor: '#F7E6C4'
    },




});
export default queue;