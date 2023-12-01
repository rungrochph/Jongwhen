import React, { useState, useRef, useEffect } from "react";
// import "../assets/css/searchbar.css";
import "../input.css";

const Searchbar = (props) => {
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();

  // const [date, setDate] = useState('');
  const dateInputRefstart = useRef(null);
  const dateInputRefend = useRef(null);

  const handleChangeStart = (e) => {
    setStartDate(e.target.value);
    console.log("Start Date", e.target.value);
  };
  const handleChangeEnd = (e) => {
    setEndDate(e.target.value);
    console.log("End Date", e.target.value);
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

  const [userList, setUserList] = useState([]);
  const [userNameId, setUserNameId] = useState([]);
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
        console.log("result of Users", result);
        const data = result.results
          .filter((event) => event.id && event.fullname && event.position) // Filter out objects with empty or undefined values
          .map((event) => ({
            id: event.id,
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
    console.log("userNameId", userNameId);
  }, [eventTypeId, userNameId]);

  const [totalPrice, setTotalPrice] = useState("0");

  async function getTotalPrice(JasonData) {
    try {
      const response = await fetch(
        "http://localhost:3030/calender/getSumPrice",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(JasonData),
        }
      );
      const result = await response.json();
      if (result.status === "ok") {
        console.log("result TotalPrice", result);
        setTotalPrice(result.results[0].totalprice);
        // const data = result.results
        // console.log("Data", data);
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const [dataUser, setDataUser] = useState([]);

  async function getDataUser(JasonData) {
    try {
      const response = await fetch(
        "http://localhost:3030/calender/getEventsList",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(JasonData),
        }
      );
      const result = await response.json();
      if (result.status === "ok") {
        const formattedEvents = result.results.map((event) => ({
          id: event.id,
          title: event.typeEventName + "   => " + event.fullname,
          start: event.start,
          end: event.end,
          editable: event.editable,
          color: event.color,
          allDay: event.allDay,
          userNameId: event.userNameId,
          price: event.price,
          event_type_id: event.event_type_id,
        }));
        setDataUser(formattedEvents);
        console.log("Data-user", dataUser);
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const getDatafromSearch = () => {
    // Check if all required fields are filled
    if (startDate && endDate && eventTypeId && userNameId) {
      const JasonData = {
        userNameId: userNameId,
        event_type_id: eventTypeId,
        startDate: startDate,
        endDate: endDate,
      };

      getTotalPrice(JasonData);
      getDataUser(JasonData);
      setStatus(true);
    } else {
      // Handle case when required fields are not filled
      alert("กรุณาใส่ input ให้ครับทุกช่อง ");
    }
  };

  const [status, setStatus] = useState(false);
  props.sentData(dataUser);
  props.sentStatus(status);

  //  function exportData() {
  //   window.location.href = 'http://localhost:8080/jasperserver/rest_v2/reports/reports/jwReports/test.pdf?j_username=jasperadmin&j_password=jasperadmin&ID=51';
  //  ;

  //   }

  return (
    <div className=" p-9 ml-6">
      <div
          className=" ml-8 text-base bg-white border border-white-200 rounded "
          ><label>ค้นหา *(กรอกข้อมูลให้ครบทุกช่อง)</label></div>
          
      <div className="flex flex-row shadow-xl rounded-xl " >
        <div className="menu-item" style={{ marginLeft: "10rem" }}>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            เริ่มตั้งแต่
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startDate"
            type="date"
            onChange={handleChangeStart}
            ref={dateInputRefstart}
            required
          />
          {/* <p>Selected Date: {startDate}</p> */}
        </div>
        <div className="menu-item">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            สิ้นสุด
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endDate"
            name="endDate"
            type="date"
            onChange={handleChangeEnd}
            ref={dateInputRefend}
            required
          />

          {/* <p>Selected Date: {endDate}</p> */}
        </div>
        <div className="menu-item ">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ประเภทของอีเวนท์
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="event_type_id"
            name="event_type_id"
            onChange={(e) => setEventTypeId(e.target.value)}
            value={eventTypeId}
            required
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
        </div>
        <div className="menu-item ">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ผู้รับผิดชอบ
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userNameId"
            value={userNameId}
            onChange={(e) => setUserNameId(e.target.value)}
            required
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
        </div>
        <div>
          <button
            style={{ marginTop: "2.8rem", marginLeft: "2rem" }}
            class=" p-1 px-3  bg-white border border-white-200 rounded shadow hover:bg-gray-100 dark:bg-yellow-500 dark:border-gray-700 dark:hover:bg-gray-700 shadow-xl text-sm"
            onClick={getDatafromSearch}
          >
            ค้นหา
          </button>
        </div>
        <div className="p-12 ml-12 ">
          <p className="text-xl ml-8">จำนวนเงินทั้งสิ้นรวม {totalPrice} บาท</p>
        </div>
          
        
      </div>
    </div>
  );
};

export default Searchbar;
