 import React from "react";
import '../css/mainpage.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [food, setFood] = useState([]);
  const [foodMain, setFoodMain] = useState([]);
  const [btnMain, setbtnMain] = useState("btnClick");
  const [btnFav, setbtnFave] = useState("btn");
  const [queue, setQueue] = useState(0);
  const [styleFoodMain, setStyleFoodMain] = useState(1);
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resStatus, setResStatus] = useState(0);
  const [order, setOrder] = useState(0);


  useEffect(() => {
    let status=0
    axios.get("http://localhost:8082/order-service/order").then((res) => {
      let fil = res.data.filter((val) => {
        return val.status != "pay"
    })
      setQueue(fil.length)
    })
    axios.get("http://localhost:8082/grpc-service/dummy.gateway").then(res => {
      setResName(res.data)
    })
    axios.get("http://localhost:8082/restaurant-service/restaurant").then(res => {
      setResPhone(res.data[0].phone)
      setResStatus(res.data[0].status)
      status = res.data[0].status
      
    }).catch(error => {
      console.error(error)
    })
    axios.get("http://localhost:8082/food-service/food", { crossdomain: true }).then(res => {
      if(status == 1){
        setFoodMain(res.data)
        setFood(res.data)
      }
    })
    if (localStorage.getItem("CartName")){
      setOrder(localStorage.getItem("CartName").split(",").length)
    }
  }, [foodMain])


  return (
    <body>
      <div className="container-main">
      <Link to="/login"><button className="btn" style={{position: "relative", marginTop: "1vw"}}>Owner Login</button></Link>
        <div className="header-homepage">
          <h1>{resName}</h1>
          <h3>TEL. {resPhone}</h3>
          <h3 style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>สถานะ:
            <p style={resStatus? {width: '1.25vw', height: '1.25vw', backgroundColor: '#00FF00', borderRadius: '5vw', marginTop: '0.3vw', marginLeft: '0.3vw'} : 
            {backgroundColor: '#808080',width: '1.25vw', height: '1.25vw', borderRadius: '5vw', marginTop: '0.3vw', marginLeft: '0.3vw'}}>
            </p>
            </h3>
        </div>
        <div className="Btn-container">
          <div style={{ textAlign: "left" }}>
            <Link to="/queue"><button className="btn" onClick={() => { setbtnMain("btn"); setbtnFave("btn");}}>ทั้งหมด {queue} คิว</button></Link>
          </div>
          <div style={{ textAlign: "right" }}>
          <Link to="/cart"><button className="btn" onClick={() => { setbtnMain("btn"); setbtnFave("btn"); }}>ตะกร้า ({order})</button></Link>
          </div>
        </div>
        <hr style={{ backgroundColor: "#69443C", height: "0.15vw", marginTop: "2vw", marginBottom: "2vw" }} />
        {/* <Link to="/addMenu"><button className="btnAdd" onClick={() => { console.log("เบลอ") }}>+ เพิ่มเมนูใหม่</button></Link> */}
        <div className="food-homepage">
          {
            foodMain.map((value) => {
              return (
                <div className="food-menu-homepage" id="foodHome" style={{ opacity: styleFoodMain }} key={value._id}>
                  <img style={{borderRadius: '2vw'}} class="image-menu-homepage" src={value.image} />
                  <p className="pop" style={{ fontSize: "1.5vw", margin: "0.75vw", color: '#dd343c' }}>{value.name}</p>
                  <p style={{ fontSize: "1.45vw", margin: "0.5vw", color: '#444' }}>{value.price} ฿</p>
                  <Link key={value} to={{pathname: "/select", search: `?value=${JSON.stringify(value.name)}`}}><button className="btnDetail" onClick={() => { }}>ดูรายละเอียด</button></Link>
                </div>
              )
            })
          }

        </div>
      </div>
    </body>
  );
}
