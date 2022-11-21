import { useState } from "react";
// import "./App.css";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<Swiper
				// install Swiper modules
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={50}
				slidesPerView={3}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log("slide change")}
			>
				<SwiperSlide>
					<div style={{ height: 300, background: "red" }}></div>
				</SwiperSlide>
				<SwiperSlide>
					<div style={{ height: 300, background: "blue" }}></div>
				</SwiperSlide>
				<SwiperSlide>
					<div style={{ height: 300, background: "yellow" }}></div>
				</SwiperSlide>
				<SwiperSlide>
					<div style={{ height: 300, background: "green" }}></div>
				</SwiperSlide>
			</Swiper>

			<Swiper navigation={true} modules={[Navigation]} className="mySwiper">
				<SwiperSlide>
					<div style={{ height: 300, background: "red" }}></div>
				</SwiperSlide>
				<SwiperSlide>
					<div style={{ height: 300, background: "blue" }}></div>
				</SwiperSlide>
				<SwiperSlide>
					<div style={{ height: 300, background: "yellow" }}></div>
				</SwiperSlide>
				<SwiperSlide>
					<div style={{ height: 300, background: "green" }}></div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}

export default App;
