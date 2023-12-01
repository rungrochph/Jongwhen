import "../assets/css/main.css";
import "../assets/css/noscript.css";
import screen from "../images/Logo/555.png"
import pic1 from "../images/homepage/addevent.png"
import pic2 from "../images/homepage/calender.png"
import pic3 from "../images/homepage/search1.png"
import Navbar from "./Navbar";
const Homepage = () => {
  return <div>
	<Navbar></Navbar>
    <header id="header">
				<div class="content">
					<h1>JongWhen</h1>
					<p>จัดการกับตารางงานของทีมคุณ ได้ง่ายมากขึ้น<br />
					เพียงคุณใช้ระบบของเรา <a href="/Login">เข้าสู่ระบบ</a></p>
					<ul class="actions">
						<li><a href="/Login" class="button primary ">เข้าสู่ระบบ / ล็อกอิน</a></li>
						<li><a href="#one" class="button icon solid fa-chevron-down scrolly">เรียนรู้เพิ่มเติม</a></li>
					</ul>
				</div>
				<div ><div class="inner"><img src={screen} alt="" style={{ width: '600px', height: '700px', marginBottom:"10px" ,padding:"10px"}}/></div></div>
			</header>
            {/* <!-- one --> */}
            <section id="one" class="wrapper style2 special">
				<header class="major">
					<h2>มีฟีเจอร์ที่หลากหลาย<br />
					ให้คุณเลือกใช้</h2>
				</header>
				{/* <ul class="icons major">
					<li><span class="icon solid fa-camera-retro"><span class="label">Shoot</span></span></li>
					<li><span class="icon solid fa-sync"><span class="label">Process</span></span></li>
					<li><span class="icon solid fa-cloud"><span class="label">Upload</span></span></li>
				</ul> */}
			</section>

		{/* <!-- Two --> */}
			<section id="two" class="wrapper">
				<div class="inner alt">
					<section class="spotlight">
						<div class="image"><img src={pic1} alt="" style={{width:"300px", height: '300px'} }/></div>
						<div class="content">
							<h3>จัดการกับตารางงานให้กับทีมของคุณ</h3>
							<p>คุณสามารถสร้าง เพิ่ม ลบ และแก้ไข อีเวนท์ของคุณในปฏิทินได้</p>
						</div>
					</section>
					<section class="spotlight">
						<div class="image"><img src={pic2} alt="" /></div>
						<div class="content">
							<h3>หน้าแดชบอร์ดปฏิทิน</h3>
							<p>คุณสามาดูรายการอีเวนท์ต่าง ๆ ผ่านหน้าปฏิทิน </p>
						</div>
					</section>
					<section class="spotlight mb-8">
						<div class="image"><img src={pic3} alt="" style={{width:"300px", height: '300px'} } /></div>
						<div class="content">
							<h3>ค้นหาอีเวนท์ต่าง ๆ </h3>
							<p>สามารถค้นหาข้อมูลอีเวนท์ต่าง ๆ ในหน้าปฎิทิน อีกทั้งยังสามารถคำนวนราคารามได้อีกด้วย</p>
						</div>
					</section>
					
				</div>
			</section>

		

  </div>;
};

export default Homepage;
