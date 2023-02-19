import React, { useRef, useEffect, useState } from "react";
import { Animated, Text, View, StyleSheet, Button, Easing } from "react-native";
import { Link } from "react-router-dom";
import axios from "axios";

import '../css/total.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const total = () => {
    const [order, setOrder] = useState([]);
    const [sum, setSum] = useState(0);
    const [customer, setCustomer] = useState(0);
    let number = 0;
    let set1 = new Set();


    useEffect(() => {
        axios.get("http://localhost:8082/order-service/order").then((res) => {
            console.log(res.data)
            let fil = res.data.filter((val) => {
                return val.status == "pay"
            })
            setOrder(fil)
            let total = fil;

            total.forEach(value => {
                number += parseInt(value.price);
                set1.add(value.name);
            })

            // console.log(number)
            setSum(number);
            console.log(sum)

            setCustomer(set1);
            console.log(set1.values().next().value)
            console.log(set1.values())
            console.log(set1.size)
        })
    }, [])
    
    return (
        <View >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2vw', marginTop: '1vw' }}>
                <Link to="/"><button className="buttonOut" variant="contained" style={{ cursor: 'pointer'}}>
                    <a className="div1" style={{ fontSize: '1vw', color: 'white' }}>ออกจากระบบ</a>
                </button></Link>
            </div>

            <div className='box-total'>
            <h1>สรุปยอดขาย</h1>
                <div className='sub-box'>
                    <br></br><br></br>
                    <div className='box-summary'>

                        <div className='summary'>
                            <h3 style={{ marginRight: "5vw", marginLeft: "5vw" }}>จำนวนลูกค้า</h3>
                            <h3 style={{ marginRight: "5vw", marginLeft: "5vw" }}>รายการทั้งหมด</h3>
                            <h3 style={{ marginRight: "5vw", marginLeft: "5vw" }}>ราคาทั้งหมด</h3>
                        </div>
                        <div className='summary'>
                            <h3 style={{ marginRight: "5vw", marginLeft: "5vw" }}>{customer.size}</h3>
                            <h3 style={{ marginRight: "5vw", marginLeft: "5vw" }}>{order.length}</h3>
                            <h3 style={{ marginRight: "5vw", marginLeft: "5vw" }}>{sum}</h3>
                        </div>
                        <div className='summary'>
                            <h3 style={{ marginRight: "5vw", marginLeft: "5vw" }}>คน</h3>
                            <h3 style={{ marginRight: "5vw", marginLeft: "5vw" }}>รายการ</h3>
                            <h3 style={{ marginRight: "5vw", marginLeft: "5vw" }}>บาท</h3>
                        </div>
                    </div>

                    <TableContainer component={Paper} style={{ margin: '5vw', width: '90%', borderRadius: '1vw', border: '0.25vw solid #2c0b06' }} >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="tableBig">
                            <TableHead style={{ borderBottom: '0.25vw solid #2c0b06' }}>
                                <TableRow >
                                    <TableCell align="center"><a className="div3">ชื่อลูกค้า</a></TableCell>
                                    <TableCell align="center"><a className="div3">เบอร์โทร</a></TableCell>
                                    <TableCell align="center"><a className="div3">รายการอาหาร</a></TableCell>
                                    <TableCell align="center"><a className="div3">รายละเอียดเพิ่มเติม</a></TableCell>
                                    <TableCell align="center"><a className="div3">ราคา</a></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center"><a className="div3">{row.name}</a></TableCell>
                                        <TableCell align="center"><a className="div3">{row.phone}</a></TableCell>
                                        <TableCell align="center"><a className="div3">{row.food}</a></TableCell>
                                        <TableCell align="center"><a className="div3">{row.other}</a></TableCell>
                                        <TableCell align="center"><a className="div3">{row.price}</a></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='box-button'>
                        <Link to="/adminPanel"><button className="buttonBack" variant="contained" style={{ cursor: 'pointer', marginLeft: '0.5vw', marginTop: '2vw' }}>
                            <a >ย้อนกลับ</a>

                        </button></Link>
                    </div>
                </div>
            </div>
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
export default total;