import "../input.css";
function Testtailwind() {
  return (
    <div className="flex flex-row ml-10">
      {/* <nav className="navbar-search">
        <div className="search-items">
          <ul>
            <li style={{ marginLeft: "100px" }}> */}
      <div className="menu-item">
        <label >Start</label>
        <input
          name="startDate"
          id="startDate"
          type="date"
          // onChange={handleChangeStart}
          // ref={dateInputRefstart}
        />
      </div>
      <div className="menu-item">
        <label>End</label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          // onChange={handleChangeEnd}
          // ref={dateInputRefend}
        />
      </div>

      <div className="menu-item">
        <label>Type Of Event</label>
        <select
          id="event_type_id"
          name="event_type_id"
          // onChange={(e) => setEventTypeId(e.target.value)}
          // value={eventTypeId}
        >
          <option value={""} key={999}>
            --กรุณาเลือกประเภท--
          </option>
          {/* {typeEvent.map((item, index) => (
                  <option
                    key={index}
                    style={{ backgroundColor: item.color }}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))} */}
        </select>
      </div>

      <div className="menu-item">
        <label>Name</label>
        <select
          name="userNameId"
          id="userNameId"
          // value={userNameId}
          // onChange={(e) => setUserNameId(e.target.value)}
        >
          <option value={""} key={999}>
            --กรุณาเลือกผู้รับผิดชอบ--
          </option>
          {/* {userList.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.fullname} {item.position}
                  </option>
                ))} */}
        </select>
      </div>
      <div className="menu-item">
        <button  className="mt-4 ml-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Search</button>
      </div>
      <div className="menu-item">
        <label style={{ marginTop: "47px" }}> จำนวนทั้งหมด 555 บาท</label>
      </div>
    </div>
    //         />
    //         <p>Selected Date: {startDate}</p>
    //       </li>
    //       <li>
    //
    //         <p>Selected Date: {endDate}</p>
    //       </li>
    //       <li>

    //       </li>
    //       <li>
    //
    //       </li>
    //       <li style={{margin:"20px"}}>
    //
    //       </li>
    //       <li  >
    //
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
    // </div>
  );
}
export default Testtailwind;
