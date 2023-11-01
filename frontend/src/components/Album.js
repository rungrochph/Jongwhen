import { useEffect } from "react";
import Button from '@mui/material/Button';

const Album = () => {
	const handleLogout = (event) => {
		localStorage.removeItem('token');
		window.location = "./login";
	}

  useEffect(() => {
	const token = localStorage.getItem('token')
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
        } else {
          alert("Authen  failed");
		  localStorage.removeItem('token');
		  window.location = "./login";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, []);
  return <Button variant="contained" onClick={handleLogout}>Log out</Button>;
};
export default Album;
