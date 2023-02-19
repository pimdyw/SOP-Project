import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Animated, Text, View, StyleSheet, Button, Easing } from "react-native";
import { Link } from "react-router-dom";
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../css/mainAdmin.css';


const allPd = () => {
    const [food, setFood] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8082/food-service/food", { crossdomain: true }).then(res => {
            console.log(res.data)
            setFood(res.data)
        })
    }, [])
    const deleteFood = (data) => {
        axios.get("http://localhost:8082/food-service/delete", {
            params: {
                name: data
            }
        }).then(res => {
            console.log("Delete Success")
            NotificationManager.success('Success message', 'ลบเมนูอาหารสำเร็จ', 2000);
            window.location.replace("/allProduct")
        })
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
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5vw', fontSize: '2vw' }}>
                <p style={{ marginLeft: '5vw' }}>เมนูอาหารทั้งหมด</p>
                <Link to={"/addMenuAdmin"}><button class="buttonPlus button3">+</button></Link>
                <div style={{ marginLeft: '57vw', marginTop: '1.5vw' }}>

                    <Link to={"/adminPanel"}><button className="buttonMain" variant="contained" style={{ cursor: 'pointer', marginLeft: '0.5vw' }}>
                        <a >หน้าหลัก</a>

                    </button></Link>
                </div>
            </div>
            <div className="div4" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '0.5vw' }}>
                <div className="divContent" >

                    <div>
                        {
                            food.map((value) => {
                                return (
                                    <div key={value._id}>
                                        <div style={styles.dis}>
                                            <img style={styles.image} src={value.image} alt="Logo" />
                                            <div style={styles.textfood}>
                                                <a style={{ fontSize: '1.2vw', marginTop: '0.5vw' }}>{value.name}</a>
                                                <a style={{ fontSize: '1vw' }}>{value.price} ฿</a>
                                                {/* <a style={{ fontSize: '1.2vw' }}>888</a> */}
                                                {/* <button className="button" variant="contained" style={styles.button1}>
                                        <Text color="black" style={{ fontSize: '0.8vw' }}>ดูรายละเอียด</Text>
                                    </button> */}
                                            </div>
                                            <div style={{ width: '50vw' }}></div>

                                            <div style={{ display: 'grid', justifyContent: 'flex-end' }}>
                                                <div style={styles.dis3}>
                                                    <Link to={{ pathname: "/editMenu", search: `?value=${JSON.stringify(value.name)}` }}><button className="buttonEdit" style={{ fontSize: '0.8vw', marginLeft: '0.5vw', marginTop: '-0.1vw', cursor: 'pointer' }}>แก้ไข</button></Link>
                                                    <button className="buttonDelete" onClick={() => {
                                                        deleteFood(value.name)
                                                    }} style={{ fontSize: '0.8vw', marginLeft: '0.5vw', marginTop: '-0.1vw', cursor: 'pointer', color: 'white' }}>ลบ</button>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="Line"></div>
                                    </div>
                                )
                            })
                        }
                    </div>


                </div>
            </div>
            <NotificationContainer />
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
    card: {
        transition: '0.3s',
        width: '95%',
        height: '100%',
        border: '0.25vw solid #927363',
        borderRadius: '2vw',
        backgroundColor: '#F7E6C4',
        marginLeft: '2vw',
        display: 'grid',
        justifyContent: 'center'
        // boxShadow: '0 4px 8px 0 ',
    },
    card2: {
        width: '97%',
        height: '80%',
        transition: '0.3s',
        margin: '1.5vw',
        border: '7px solid #B2918A',
        borderRadius: '3vw',
        backgroundColor: '#B2918A',

    },
    card3: {
        width: '20%',
        height: '50%',
        transition: '0.3s',
        // margin: '1vw',
        border: '7px solid #F8F0E0',
        borderRadius: '2vw',
        backgroundColor: '#F8F0E0',
        marginLeft: '10vw',
        marginTop: '1vw'
    },
    image: {
        width: '8vw',
        height: '7vw',
        marginLeft: '1.5vw',
        display: 'flex'
    },
    imageCheck: {
        width: '25%',
        height: '25%',
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
        marginLeft: '2vw',
        width: '10vw'
    },
    dis: {
        display: 'flex',
        marginLeft: '1vw',
        // backgroundColor: '#B2918A',

        borderRadius: '3vw',
    },
    dis2: {
        display: 'flex',
        marginLeft: '1vw',
        justifyContent: 'center'
    },
    dis3: {

        display: 'grid',
        marginTop: '0.55vw'


    },

    button1: {
        color: 'white',
        cursor: 'pointer',
        borderRadius: '2vw',
        backgroundColor: '#F7E6C4'
    },





});
export default allPd;