import { useEffect } from "react";

const Authen = () => {


  useEffect(() => {
	const token = localStorage.getItem('token')
  const fname = localStorage.getItem('fname')
  const lname = localStorage.getItem('lname')
    
	postJSON()
    async function postJSON() {
      try {
        const response = await fetch("http://localhost:3030/authen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
			"Authorization": 'Bearer ' + token,
          },
        });

        const result = await response.json();
		console.log("token Authen",token)
		console.log("result Authen",result.status)
        if (result.status === "ok") {
        //   alert("Authen Success");
        console.log("Name",fname," ",lname)
        } else {
          alert("Please Login");
		  localStorage.removeItem('token');
		  localStorage.removeItem('fname');
		  localStorage.removeItem('lname');
		  window.location = "./login";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, []);


};
export default Authen;
