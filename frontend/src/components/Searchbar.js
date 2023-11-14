import React, { useState, useRef, useEffect } from "react";
// import "../assets/css/searchbar.css";
import "../input.css";

const Searchbar = (props) => {
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString());
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());

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
        "http://localhost:3030/calender/getUserList",
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
    const JasonData = {
      userNameId: userNameId,
      event_type_id: eventTypeId,
      startDate: startDate,
      endDate: endDate,
    };
    console.log("Jason...", JasonData);
    getTotalPrice(JasonData);
    getDataUser(JasonData);
    setStatus(true);
  };
  const [status, setStatus] = useState(false);
  props.sentData(dataUser);
  props.sentStatus(status);
  return (
    <div className="flex flex-row ml-10 p-8 ">
      <div className="menu-item">
        <label>Start</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="startDate"
          id="startDate"
          type="date"
          onChange={handleChangeStart}
          ref={dateInputRefstart}
        />
        {/* <p>Selected Date: {startDate}</p> */}
      </div>
      <div className="menu-item">
        <label>End</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="endDate"
          name="endDate"
          type="date"
          onChange={handleChangeEnd}
          ref={dateInputRefend}
        />

        {/* <p>Selected Date: {endDate}</p> */}
      </div>
      <div className="menu-item">
        <label className="block mb-2 text-sm font-medium text-gray-900 white:text-dark">Type Of Event</label>
        <select
          className="bg-white-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 white:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      </div>
      <div className="menu-item">
        <label>Name</label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      </div>
      <div>
        <button className="btn-primary" onClick={getDatafromSearch}>
          Search
        </button>
      </div>
      <div>
        <label style={{ marginTop: "47px" }}>
          {" "}
          จำนวนทั้งหมด {totalPrice} บาท
        </label>
      </div>
    </div>
  );
};

export default Searchbar;
