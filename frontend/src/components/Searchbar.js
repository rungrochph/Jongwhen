import React, { useState, useRef, useEffect } from "react";
import "../assets/css/searchbar.css";

const Searchbar = (props) => {
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString());
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());

  // const [date, setDate] = useState('');
  const dateInputRefstart = useRef(null);
  const dateInputRefend = useRef(null);

  const handleChangeStart = (e) => {
    setStartDate(e.target.value);
    console.log("Start Date",e.target.value)
  };
  const handleChangeEnd = (e) => {
    setEndDate(e.target.value);
    console.log("End Date",e.target.value)
  };


  const [typeEvent, setTypeEvent] = useState([]);
  const [eventTypeId, setEventTypeId] = useState([]);
  async function getEventType(JasonData) {
    try {
      const response = await fetch(
        "http://localhost:3030/calender/gettype/Event",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(JasonData),
        }
      );
      const result = await response.json();
      if (result.status === "ok") {
        // console.log("result",result)
        const formattedTypeEvents = result.results.map((event) => ({
          id: event.id,
          name: event.name,
          color: event.color,
        }));
        setTypeEvent(formattedTypeEvents);
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


const [userList, setUserList] = useState([])
const [userNameId, setUserNameId] =useState([])
async function getuserList(JasonData) {
  try {
    const response = await fetch("http://localhost:3030/calender/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JasonData),
    });
    const result = await response.json();
    if (result.status === "ok") {
      console.log("result of Users",result)
      const data = result.results
      .filter(event => event.id && event.fullname && event.position) // Filter out objects with empty or undefined values
      .map(event => ({
        id:event.id,
        fullname: event.fullname,
        position: event.position,
      }));
    
    console.log("Data", data);
    setUserList(data);
    } else {
      alert("Get Event failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
  useEffect(() => {
    getEventType();
    console.log("eventTypeId", eventTypeId);
    getuserList();
    console.log("userNameId", userNameId)
  }, [eventTypeId,userNameId]);


  const [totalPrice, setTotalPrice] = useState("0")



  async function getTotalPrice(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/calender/getSumPrice", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });
      const result = await response.json();
      if (result.status === "ok") {
        console.log("result TotalPrice",result)
        setTotalPrice(result.results[0].totalprice)
        // const data = result.results
        // console.log("Data", data);
        
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const [dataUser, setDataUser] = useState([])

  async function getDataUser(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/calender/getUserList", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });
      const result = await response.json();
      if (result.status === "ok") {
        
        const formattedEvents = result.results.map((event) => ({
          id: event.id,
          title:event.typeEventName + "   => " + event.fullname ,
          start: event.start,
          end: event.end,
          editable: event.editable,
          color:event.color,
          allDay: event.allDay,
          userNameId: event.userNameId,
          price:event.price,
          event_type_id:event.event_type_id
        }));
        setDataUser(formattedEvents)
        console.log("Data-user",dataUser)  
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const getDatafromSearch = () =>{
    const JasonData = {
       userNameId: userNameId,
       event_type_id: eventTypeId,
       startDate: startDate,
       endDate : endDate
     }
     console.log("Jason...",JasonData)
     getTotalPrice(JasonData)
     getDataUser(JasonData)
     setStatus(true)
   }
   const [status,setStatus] = useState(false)
   props.sentData(dataUser)
   props.sentStatus(status)
  return (
    <div>
      <nav className="navbar-search">
        <div className="search-items">
          <ul>
            <li style={{ marginLeft: "100px" }}>
              <label>Start</label>
              <input
                name="startDate"
                id="startDate"
                type="date"
                onChange={handleChangeStart}
                ref={dateInputRefstart}
              />
              <p>Selected Date: {startDate}</p>
            </li>
            <li>
              <label>End</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                onChange={handleChangeEnd}
                ref={dateInputRefend}
              />

              <p>Selected Date: {endDate}</p>
            </li>
            <li>
              <label>Type Of Event</label>
              <select
                id="event_type_id"
                name="event_type_id"
                onChange={(e) => setEventTypeId(e.target.value)}
                value={eventTypeId}
              >
                <option value={""} key={999}>
                  --กรุณาเลือกประเภท--
                </option>
                {typeEvent.map((item, index) => (
                  <option
                    key={index}
                    style={{ backgroundColor: item.color }}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <label>Name</label>
              <select
                name="userNameId"
                id="userNameId"
                value={userNameId}
                onChange={(e) => setUserNameId(e.target.value)}
              >
                <option value={""} key={999}>
                  --กรุณาเลือกผู้รับผิดชอบ--
                </option>
                {userList.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.fullname} {item.position}
                  </option>
                ))}
              </select>
            </li>
            <li style={{margin:"20px"}}>
              <button className="btn-primary" onClick={getDatafromSearch}>Search</button>
            </li>
            <li  >
              <label style={{marginTop:"47px"}} > จำนวนทั้งหมด {totalPrice} บาท</label>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Searchbar;
