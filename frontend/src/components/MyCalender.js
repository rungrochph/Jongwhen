import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { Col, Modal } from "antd";
import { useState } from "react";
import "../assets/css/mycalender.css";
import moment from "moment";
import Searchbar from "./Searchbar";
import Navbar from "./Navbar";
import "../input.css";

const Calendar = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getuserList();
  }, []);

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

  const [typeEvent, setTypeEvent] = useState([]);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const [values, setValues] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    color: "",
    editable: "",
    userNameId: "",
    price: "",
    event_type_id: "",
  });

  const [eventlist, setEventlist] = useState([]);

  // Call the drag function only once when the component mounts
  const count = useRef(0);
  useEffect(() => {
    if (count.current !== 0) {
      drag();
    }
    count.current++;
  }, []);

  const handleRecieve = (eventinfo) => {
    console.log("Youdata handleRecieve", eventinfo);
    let value = {
      event_type_id: eventinfo.draggedEl.getAttribute("id"),
      title: eventinfo.draggedEl.getAttribute("title"),
      // color: eventinfo.draggedEl.getAttribute("color"),
      start: eventinfo.dateStr,
      end: moment(eventinfo.dateStr).add(+1, "days").format("YYYY-MM-DD"),
      allDay: true,
      editable: true,
      //userNameId:eventinfo.draggedEl.getAttribute("userNameId"),
      //price:eventinfo.draggedEl.getAttribute("price"),
    };
    console.log("Value Youdata handleRecieve", value);
    addDragEvent(value);
  };

  const drag = () => {
    console.log("Drag");
    let draggable = document.getElementById("external-event");
    new Draggable(draggable, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let id = eventEl.getAttribute("id");
        let title = eventEl.getAttribute("title");
        // let color = eventEl.getAttribute("color");
        return {
          id: id,
          title: title,
          // color: color,
        };
      },
    });
  };

  async function addDragEvent(JasonData) {
    try {
      const response = await fetch(
        "http://localhost:3030/calender/create/drag",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(JasonData),
        }
      );

      const result = await response.json();
      if (result.status === "ok") {
        alert("Add Event Sucess");
      } else {
        alert("Add Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    getEventType();
    // setEventlist(getEvent())
  }, []);

  async function getEvent(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/calender/getEvent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });
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
        console.log("SSSSSS", formattedEvents);
        setEventlist(formattedEvents);
        // return formattedEvents
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSelect = (info) => {
    showModal();
    console.log("handleSelect", info);
    setValues({
      ...values,
      start: info.startStr,
      end: info.endStr,
      color: info.color,
    });
  };

  const onChangeValues = (e) => {
    // console.log(e);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleOk = (event) => {
    console.log("Values", values);
    window.location.reload();
    getEvent();
    setIsModalOpen(false);
    event.preventDefault();
    const JasonData = {
      event_type_id: values.event_type_id,
      title: values.title,
      start: values.start,
      end: values.end,
      allDay: true,
      editable: true,
      userNameId: values.userNameId,
      price: values.price,
    };
    addEvent(JasonData);
  };

  async function addEvent(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/calender/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });

      const result = await response.json();
      if (result.status === "ok") {
        alert("Add Event Sucess");
      } else {
        alert("Add Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const handleChange = (info) => {
    // console.log(info);
    const values = {
      id: info.event._def.publicId,
      start: moment(info.event._instance.range.start).format("YYYY-MM-DD"),
      end: moment(info.event._instance.range.end).format("YYYY-MM-DD"),
    };
    updateEvent(values);
    // console.log(values);
  };
  const handleEventResize = (resizeInfo) => {
    const values = {
      id: resizeInfo.event.id,
      start: resizeInfo.event.startStr,
      end: resizeInfo.event.endStr,
    };

    console.log(values);
  };

  async function updateEvent(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/calender/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });

      const result = await response.json();
      if (result.status === "ok") {
        alert("Update Event Sucess");
      } else {
        alert("Update Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleEventClick = (clickInfo) => {
    console.log("clickInfo", clickInfo);
    const values = {
      id: clickInfo.event._def.publicId,
    };
    setUpdateEventID(clickInfo.event._def.publicId);
    setDeleteEventId(values);
    setModalTitle(clickInfo.event._def.title);
    setModalColor(clickInfo.event.backgroundColor);
    setModalUserNameId(clickInfo.event._def.extendedProps.userNameId);
    setModaleventTypeId(clickInfo.event._def.extendedProps.event_type_id);
    setModalPrice(clickInfo.event._def.extendedProps.price);
    showModal1();
  };

  const [deleteEventID, setDeleteEventId] = useState();
  const handleDeleteEvent = () => {
    // console.log(deleteEventID);
    deleteEventById(deleteEventID);
    setIsModalOpen1(false);
    window.location.reload();
  };
  async function deleteEventById(JasonData) {
    try {
      const response = await fetch(
        "http://localhost:3030/calender/deleteEvent/id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(JasonData),
        }
      );
      const result = await response.json();
      if (result.status === "ok") {
        alert("Delete Event Sucess");
      } else {
        alert("Delete Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const [modalTitle, setModalTitle] = useState("");
  const [modalColor, setModalColor] = useState("");
  const [modalUserNameId, setModalUserNameId] = useState("");
  const [modaleventTypeId, setModaleventTypeId] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [updateEventID, setUpdateEventID] = useState("");
  const handleUpdateEvent = () => {
    const updatedData = {
      id: updateEventID, // The ID of the event to be updated
      title: modalTitle,
      color: modalColor,
      userNameId: modalUserNameId,
      price: modalPrice,
      event_type_id: modaleventTypeId,
    };
    updateEventByID(updatedData);
    // console.log("Data to update",updatedData)
    setIsModalOpen1(false);
    window.location.reload();
  };

  async function updateEventByID(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/calender/update/id", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });

      const result = await response.json();
      if (result.status === "ok") {
        alert("Update Event Sucess");
      } else {
        alert("Update Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const [dataListFromSearch, setDataListFromSearch] = useState([]);
  const dataRecripts = (item) => {
    setDataListFromSearch(item);
    console.log("hhhhh", dataListFromSearch);
  };

  const setData = () => {
    console.log("Data Recripts", dataListFromSearch);
  };

  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (status) {
      setEventlist(dataListFromSearch);
      console.log("ddddd");
    } else {
      getEvent();
    }
  }, [status, dataListFromSearch]);

  const getStatus = (st) => {
    setStatus(st);
    console.log("rrrrrddd", status);
  };
  return (
    <div className="flex flex-col ">
      <Navbar/>
      <div>
        <Col span={24} style={{ justifyContent: "center" }} onClick={setData}>
          {" "}
          <Searchbar sentData={dataRecripts} sentStatus={getStatus} />
        </Col>
      </div>

      <div className="grid grid-rows-4 grid-flow-col gap-8 mx-8 ml-8">

        <div class="row-span-3 ml-8" id="external-event">
          <ul>
            {typeEvent.map((item, index) => (
              <li
                id={item.id}
                title={item.name}
                color={item.color}
                price={item.price}
                className="fc-event"
                key={index}
                style={{ backgroundColor: item.color }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div class="row-span-4 col-span-2 mx-8 calender ">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
              left: "today",
              center: "title",
              right: "prev,next",
            }}
            events={eventlist}
            selectable={true}
            select={handleSelect}
            drop={handleRecieve}
            editable={true}
            eventChange={handleChange}
            eventResizableFromStart={true}
            eventResize={handleEventResize}
            eventClick={handleEventClick}
            
          />
        </div>
      </div>

      <div />

      <Modal
        title="เพิ่มรายละเอียด"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          placeholder="Event Name"
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={onChangeValues}
          style={{ marginTop: "30px" }}
        />

        <select
          name="event_type_id"
          onChange={onChangeValues}
          style={{ marginTop: "10px" }}
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

        <select
          name="userNameId"
          onChange={onChangeValues}
          style={{ marginTop: "10px" }}
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

        <input
          placeholder="ค่าตอบแทน (บาท)"
          type="text"
          id="price"
          name="price"
          value={values.price}
          onChange={onChangeValues}
          style={{ marginTop: "10px", marginBottom: "30px" }}
        />
      </Modal>

      <Modal
        title="แก้ไขรายละเอียด"
        open={isModalOpen1}
        onOk={handleOk}
        onCancel={handleCancel1}
        footer={[
          <button key="cancel" onClick={handleCancel1}>
            Cancel
          </button>,
          <button key="delete" type="danger" onClick={handleDeleteEvent}>
            Delete
          </button>,
          <button key="update" onClick={handleUpdateEvent}>
            Update
          </button>,
        ]}
      >
        <input
          type="text"
          name="title1"
          value={modalTitle} // Bind the input value to the state
          onChange={(e) => setModalTitle(e.target.value)} // Set the event handler for input changes
          style={{ marginTop: "30px" }}
        />

        <select
          style={{ marginTop: "10px" }}
          name="event_type_id"
          value={modaleventTypeId} // Bind the input value to the state
          onChange={(e) => setModaleventTypeId(e.target.value)} // Set the event handler for input changes
        >
          <option value={""} key={999}>
            --กรุณาเลือกประเภท--
          </option>
          {typeEvent.map((item, index) => (
            <option
              key={index}
              // style={{ backgroundColor: item.color }}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        <select
          name="userNameId"
          value={modalUserNameId}
          onChange={(e) => setModalUserNameId(e.target.value)}
          style={{ marginTop: "10px" }}
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

        <input
          placeholder="ค่าตอบแทน (บาท)"
          type="text"
          id="price"
          name="price"
          value={modalPrice}
          onChange={(e) => setModalPrice(e.target.value)}
          style={{ marginTop: "10px", marginBottom: "30px" }}
        />
      </Modal>
    </div>
  );
};

export default Calendar;
