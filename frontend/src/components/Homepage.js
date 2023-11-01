import "../assets/css/main.css";
import "../assets/css/noscript.css";
import screen from "../images/homepage/screen.jpg"
import pic1 from "../images/homepage/pic01.jpg"
import pic2 from "../images/homepage/pic02.jpg"
import pic3 from "../images/homepage/pic03.jpg"
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
				<div class="image phone"><div class="inner"><img src={screen} alt="" /></div></div>
			</header>
            {/* <!-- one --> */}
            <section id="one" class="wrapper style2 special">
				<header class="major">
					<h2>มีฟีเจอร์ที่หลากหลาย<br />
					ให้คุณเลือกใช้</h2>
				</header>
				<ul class="icons major">
					<li><span class="icon solid fa-camera-retro"><span class="label">Shoot</span></span></li>
					<li><span class="icon solid fa-sync"><span class="label">Process</span></span></li>
					<li><span class="icon solid fa-cloud"><span class="label">Upload</span></span></li>
				</ul>
			</section>

		{/* <!-- Two --> */}
			<section id="two" class="wrapper">
				<div class="inner alt">
					<section class="spotlight">
						<div class="image"><img src={pic1} alt="" /></div>
						<div class="content">
							<h3>จัดการกับตารางงานให้กับทีมของคุณ</h3>
							<p>Morbi mattis ornare ornare. Duis quam turpis, gravida at leo elementum elit fusce accumsan dui libero, quis vehicula lectus ultricies eu. In convallis amet leo non sapien iaculis efficitur consequat lorem ipsum.</p>
						</div>
					</section>
					<section class="spotlight">
						<div class="image"><img src={pic2} alt="" /></div>
						<div class="content">
							<h3>หน้าแดชบอร์ดปฏิทิน</h3>
							<p>Morbi mattis ornare ornare. Duis quam turpis, gravida at leo elementum elit fusce accumsan dui libero, quis vehicula lectus ultricies eu. In convallis amet leo non sapien iaculis efficitur consequat lorem ipsum.</p>
						</div>
					</section>
					<section class="spotlight">
						<div class="image"><img src={pic3} alt="" /></div>
						<div class="content">
							<h3>แชทเพื่อแลกเปลี่ยนเวร</h3>
							<p>Morbi mattis ornare ornare. Duis quam turpis, gravida at leo elementum elit fusce accumsan dui libero, quis vehicula lectus ultricies eu. In convallis amet leo non sapien iaculis efficitur consequat lorem ipsum.</p>
						</div>
					</section>
					
				</div>
			</section>

		{/* <!-- Three --> */}
			<section id="three" class="wrapper style2 special">
				<header class="major">
					<h2>Magna leo sapien gravida</h2>
					<p>Gravida at leo elementum elit fusce accumsan dui libero, quis vehicula<br />
					lectus ultricies eu. In convallis amet leo sapien iaculis efficitur.</p>
				</header>
				<ul class="actions special">
					<li><a href="#top" class="button primary icon solid fa-download">Download</a></li>
					<li><a href="#top" class="button">Learn More</a></li>
				</ul>
			</section>

  </div>;
};

export default Homepage;
