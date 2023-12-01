import { useEffect, useState } from "react";
import "../input.css";
// import DataTable from "react-data-table-component";
import "../input.css";
import DataTable, { Media } from "react-data-table-component";
import "../assets/css/manageusers.css";
import Navbar from "./Navbar";
import {  Modal } from "antd";
const ManageUsers = () => {
  useEffect(() => {
    getData();
  }, []);
  async function getData(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/manage/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });
      const result = await response.json();
      if (result.status === "ok") {
        const formatteddata = result.results.map((event) => ({
          id: event.id,
          fullname: event.fullname,
          email: event.email,
          position: event.position,
          type_name: event.type_name,
        }));
        console.log("SSSSSS", formatteddata);
        setDataList(formatteddata);
        // setEventlist(formattedEvents);
        // return formattedEvents
        console.log("You results", result);
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const [dataList, setDataList] = useState([]);

  const handleEditButtonClick = (e, id) => {
    e.preventDefault();
    console.log("Row Id", id);
    const values ={
      id:id,
    }
    getUserById(values)
    setIsModalOpen1(true)
    getUserTypeList()
    setUserId(id)
  };
  const [deleteEventID, setDeleteEventId] = useState({id:null});
  // const [editUserID, seteditUserId] = useState({ id: null });

  const handleDeleteButtonClick = (clickInfo, id) => {
    clickInfo.preventDefault();
    console.log("Row Id", id);
    setIsModalOpen(true);
  
    // Set only the 'id' property of the values object
    setDeleteEventId({ id: id });
  
    console.log("kkkk", { id: id });
    console.log("kkkkrrr", clickInfo);
  };

  const columes = [
    {
      name: "ID",
      selector: (row) => row.id,
      hide: Media.SM,
      
    },
    {
      name: "Name",

      selector: (row) => row.fullname,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Position",
      selector: (row) => row.position,
    },

    {
      name: "Type",
      selector: (row) => row.type_name,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <div className="flex space-x-2">
         
          <button
            type="button"
            className="bg-blue-500 inline-block rounded px-2 pb-0 pt-0  font-medium uppercase leading-normal  hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
            onClick={(e) => handleEditButtonClick(e, row.id)}
          >
            Edit
          </button>
          <button
            className="inline-block rounded bg-red-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white-500 shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
            type="button"
            onClick={(e) => handleDeleteButtonClick(e, row.id)}
          >
           <p className="bg-white-500">Delete</p> 
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        // paddingLeft: "100px", // Adjust as needed
        paddingRight: "-100px", // Adjust as needed
        color: "green",
        marginRight: "100px",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        // paddingLeft: "1px", // Adjust as needed
        paddingRight: "1px", // Adjust as needed
        marginRight: "100px",
        fontSize: "14px",
      },
    },
  };

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const handleDeleteEvent = () => {
    // console.log(deleteEventID);
    deleteUserById(deleteEventID);
    console.log("deleted Id =",deleteEventID)
    setIsModalOpen(false);
    // window.location.reload();
  };
  async function deleteUserById(JasonData) {
    try {
      const response = await fetch(
        "http://localhost:3030/user/deleteUser/id",
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
 const [userId,setUserId] = useState("")

 const handleUpdateEvent = (e,id) =>{
  setUserId(id)
  const updatedData = {
    id: userId, 
    fname:fname,
    lname:lname,
    email:email,
    position:position,
    users_type_id:userTypeId
  };
    updateUserByID(updatedData)
    console.log("7777",updatedData)
    window.location.reload();
  }

 const Id = "ID  " + userId;
 const [fname, setFname] = useState()
 const [lname, setLname] = useState()
 const [email, setEmail] = useState()
 const [position, setPosition] = useState()
 const [userTypeId, setUserTypeId] = useState()

 async function getUserById(JasonData) {
  try {
    const response = await fetch(
      "http://localhost:3030/user/getUser/id",
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
      setFname(result.results[0].fname)
      setLname(result.results[0].lname)
      setEmail(result.results[0].email)
      setPosition(result.results[0].position)
      setUserTypeId(result.results[0].users_type_id)
      console.log("results",result)
    } else {
      alert("get User failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const [userTypeList, setUserTypeList] = useState([])
async function getUserTypeList(JasonData) {
  try {
    const response = await fetch(
      "http://localhost:3030/user/getUserType",
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
      console.log("results777",result)
      const formatted = result.results.map((event) => ({
        id: event.id,
        name: event.type_name,
      }));
      setUserTypeList(formatted)
      console.log("UserTypeList////",userTypeList)
    } else {
      alert("get User failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


async function updateUserByID(JasonData) {
  try {
    const response = await fetch("http://localhost:3030/user/update/id", {
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
  return (
    <div>
      <Navbar/>
    <div
      style={{
        width: "1600px",
        height: "150px",
        marginLeft: "150px",
        marginTop: "80px",
      }}
    >
       <div className="p-3 rounded-xl shadow-2xl">
       <div>
        <h2 className="mb-4"> ManageUsers</h2>
      </div>
      <div>
        <DataTable
          columns={columes}
          data={dataList}
          initialPageLength={4}
          selectableRows
           persistTableHead
          customStyles={customStyles}
          pagination
          
        ></DataTable>
      </div>
    </div>
       </div>
      
    
    <Modal
        title="ยืนยันการลบบัญชีผู้ใช้งาน"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button key="cancel" className="inline-block rounded bg-blue-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]" onClick={handleCancel}>
            Cancel
          </button>,
          <button key="delete" className="ml-2 inline-block rounded bg-red-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"  onClick={handleDeleteEvent}>
            Delete
          </button>,

        ]}
      >
        <div className="ml-4"> ข้อมูลทั้งหมดของผู้ใช้ ID = {deleteEventID.id} จะหายไปจากระบบ </div>
      </Modal>
    
      <Modal
        title="แก้ไขรายละเอียด"
        open={isModalOpen1}
        onCancel={handleCancel1}
        footer={[
          <button key="cancel" className="inline-block rounded bg-blue-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]" onClick={handleCancel1}>
            Cancel
          </button>,
          <button key="update" className=" ml-2 inline-block rounded bg-yellow-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]" 
          onClick={handleUpdateEvent
          }>
            Update
          </button>,
        ]}
      >
        <input
        style={{ marginTop: "10px" }}
        type="text"
        name="ID"
        value={Id}
        /> 

        <input
        style={{ marginTop: "10px" }}
        type="text"
        name="fname"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
        /> 

        <input
        style={{ marginTop: "10px" }}
        type="text"
        name="lname"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
        /> 

        <input
        style={{ marginTop: "10px" }}
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        /> 

        <input
        style={{ marginTop: "10px" }}
        type="text"
        name="position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        /> 

<select
          style={{ marginTop: "10px" }}
          name="event_type_id"
          value={userTypeId} // Bind the input value to the state
          onChange={(e) => setUserTypeId(e.target.value)} // Set the event handler for input changes
        >
         {userTypeList.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </Modal>
    </div>
  );
};
export default ManageUsers;
