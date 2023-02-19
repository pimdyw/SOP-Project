import React, { useRef, useState, useEffect } from "react";
import { Animated, Text, View, StyleSheet, Button, Easing } from "react-native";
import { Link } from "react-router-dom";
import '../css/waitingitem.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
// import './main.js'


const waitingitem3 = () => {
  const [order, setOrder] = useState([]);
  const [wait, setWait] = useState(0);
  const [process, setProcess] = useState(0);
  const [success, setSuccess] = useState(0);
  const [color, setColor] = useState(true);


  const processingOrder = (id) => {
    axios.get("http://localhost:8082/order-service/order/success/pay/" + id)
    window.location.replace("/waiting3")
  }

  const deleteOrder = (id) => {
    axios.get("http://localhost:8082/order-service/order/delete/" + id)
    window.location.replace("/waiting3")
  }

  const renderProcess = () => {
    axios.get("http://localhost:8082/order-service/order").then((res) => {
      let data = [];
      let wait = 1;
      let suc = 1;
      let pc = 1;
      data = res.data.filter((value) => {
        if (value.status == "success") {
          console.log("success")
          setSuccess(suc++)
         
        }
        if(value.status == "wait"){
          console.log("wait")
          setWait(wait++)
        }
        if(value.status == "processing"){
          setProcess(pc++)
        }
        // if (value.status == "success") {
        //   setSuccess(suc++)
        // }
        return value.status == "success" || value.status == "pay"
      })
      // setProcess(data.length)
      setOrder(data)
      console.log(data)
    })
  }
  useEffect(() => {
    renderProcess()
  }, [])
  return (
    <View style={styles.container} className="body">
      <div className="div1">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2vw' }}>
          <Link to="/"><button className="buttonOut" variant="contained" style={{ cursor: 'pointer' }}>
            <a className="div1" style={{ fontSize: '1vw', color: 'white' }}>ออกจากระบบ</a>
          </button></Link>
        </div>
      </div>
      <div className="div2">
        <div style={{ display: 'flex', justifyContent: 'center', marginRight: '2vw' }}>
          <Link to="/adminPanel"><button className="buttonAll" variant="contained" style={{ cursor: 'pointer' }}>
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
            <a className="div3" style={{ fontSize: '1vw', color: 'black' }}>รอการทำรายการ ({wait}) </a>
          </button></Link>
          <Link to="/waiting2"><button className="buttonAll" variant="contained" style={{ cursor: 'pointer' }}>
            <a className="div3" style={{ fontSize: '1vw', color: 'black' }}>กำลังทำรายการ ({process}) </a>
          </button></Link>
          <Link to="/waiting3"><button className="btn-Click" variant="contained" style={{ cursor: 'pointer' }}>
            <a className="div3" style={{ fontSize: '1vw', color: 'black' }}>ทำรายการสำเร็จ ({success}) </a>
          </button></Link>

        </div>
      </div>
      <div>
        <TableContainer component={Paper} style={{ margin: '5vw', width: '90%', borderRadius: '1vw', border: '0.25vw solid #2c0b06' }} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="tableBig">
            <TableHead style={{ borderBottom: '0.25vw solid #2c0b06' }}>
              <TableRow >
              <TableCell align="center"><a className="div3">ชื่อลูกค้า</a></TableCell>
                <TableCell align="center"><a className="div3">เบอร์โทร</a></TableCell>
                <TableCell align="center"><a className="div3">รายการอาหาร</a></TableCell>
                <TableCell align="center"><a className="div3">รายละเอียดเพิ่มเติม</a></TableCell>
                <TableCell align="center"><a className="div3">ราคา</a></TableCell>
                <TableCell align="center"><a className="div3">ช่องทางการจ่ายเงิน</a></TableCell>
                <TableCell align="center"><a className="div3">สถานะ</a></TableCell>
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
                  <TableCell align="center"><a className="div3">{row.payment}</a></TableCell>
                  {/* <TableCell align="center"><a className="div3" style={row.status? {color:"black"}: {}}>รอการชำระเงิน</a></TableCell>
              <TableCell align="center"><a className="div3" style={row.status? {}: {color:"red"}}>ชำระเงินแล้ว</a></TableCell> */}

                  {/* <TableCell align="center"><p className="div3">{(row.status) ? "success" : "pay"}</p></TableCell> */}
                  <TableCell align="center"><p className="div3">{(row.status) === "success" ? "รอการชำระเงิน" : "ชำระเงินแล้ว"}</p></TableCell>

                  {/* <TableCell align="center"><a className="div3">{row.status}</a></TableCell> */}
                  <TableCell align="center">
                    <button disabled={row.status === "pay" ? true : false} onClick={() => {processingOrder(row._id)}} className="buttonWait" variant="contained" style={row.status === "success" ? { backgroundColor: '#7ad441', cursor: 'pointer'} : { backgroundColor: '#9e9e9e' }}>
                      {row.status === "success" ? 
                      <a className="div3" style={{ fontSize: '1vw', color: 'white' }}>
                        รอการชำระเงิน
                        </a> :
                         <a className="div3" style={{ fontSize: '1vw', color: 'white' }}>
                         ชำระเงินแล้ว
                         </a>
                      }
                    </button>

                    {/* <TableCell align="center"><a className="div3">{row.status}</a></TableCell> */}
                    {/* <TableCell align="center">
              <button className="buttonAll" variant="contained" style={{ cursor: 'pointer',  backgroundColor: '#7ad441' }}>
                        <a className="div3" style={{ fontSize: '1vw', color: 'white' }}>ชำระเงินแล้ว</a>
                    </button> */}
                  </TableCell>
                  <TableCell align="center"><a className="div3">{row.phoneNumber}</a></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
export default waitingitem3;