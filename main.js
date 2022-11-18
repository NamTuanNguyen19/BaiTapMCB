let chartLimit = 15;
const ctx = document.getElementById('ssChart').getContext('2d');
const data = {
	labels: [],
	datasets: [
		{
			type: 'bar',
			label: 'Temp',
			yAxisID: 'A',
			data: [],
			borderColor: 'rgba(215, 0, 0, 0.899)',
			backgroundColor: 'rgba(215, 0, 0, 0.899)',
		},
		{
			type: 'bar',
			label: 'Humi',
			yAxisID: 'A',
			data: [],
			borderColor: 'rgba(15, 6, 139, 0.9)',
			backgroundColor: 'rgba(15, 6, 139, 0.9)',
		},
		{
			type: 'line',
			label: 'Light',
			yAxisID: 'B',
			data: [],
			backgroundColor: 'rgba(252, 186, 3, 0.9)',
			borderColor: 'rgba(252, 186, 3, 0.9)',
		},
	],
};

Chart.defaults.color = '#fff';
const ssChart = new Chart(ctx, {
	type: 'scatter',
	data: data,
	options: {
		responsive: true,
		maintainAspectRatio: false,
		showTooltips: true,
		interaction: {
			intersect: true,
			mode: 'index',
		},
		plugins: {
			title: {
				display: true,
				text: 'Data Chart',
			},
			tooltip: {
				enabled: true,
				callbacks: {
					title: function (ctx) {
						return ctx[0].label;
					},
					label: function (ctx) {
						let label = ctx.dataset.label || '';

						if (label) label += ': ';
						if (ctx.parsed.y !== null) label += ctx.parsed.y;
						return label;
					},
				},
			},
		},
		scales: {
			A: {
				type: 'linear',
				position: 'left',
				max: 100,
			},
			B: {
				type: 'linear',
				position: 'right',
				min: 0,
			},
		},
	},
});

// Update data
function updateData(temp, humi, light, updated_at) {
	let t = document.getElementById('Temp');
	let h = document.getElementById('Humidity');
	let l = document.getElementById('Light');
	let time = updated_at;

	t.innerText = `${temp}℃`;
	h.innerText = `${humi}%`;
	l.innerText = `${light}lux`;

	//
	if(`${light}`>0 && `${light}`<900){
		document.getElementById("LightBG").style.background = 'green'
	}
	if(`${light}`>900){
		document.getElementById("LightBG").style.background = 'rgba(252, 186, 3, 0.9)'
	}
	// Xoa du lieu dau tien trong bieu do
	if (ssChart.data.labels.length > chartLimit - 1) {
		ssChart.data.labels.shift();
		ssChart.data.datasets[0].data.shift();
		ssChart.data.datasets[1].data.shift();
		ssChart.data.datasets[2].data.shift();
	}

	// Them du lieu
	ssChart.data.labels.push(time);
	ssChart.data.datasets[0].data.push(temp);
	ssChart.data.datasets[1].data.push(humi);
	ssChart.data.datasets[2].data.push(light);
	ssChart.update();
}
socket.on('sensors', (msg) => {
	updateData(msg.temp, msg.humi, msg.light, msg.updated_at);
});


let turnon = "./img/bongdensang.jpg";
let turnoff = "./img/bongden.jpg";
function device1() {
  if (btn1.innerText == "ON")
    if (confirm("Ban muon bat bong den") == true) {
      socket.emit("DEVICE1", "0");
      btn1.innerText = "OFF";
      btn1.classList.remove("btn-success");
      btn1.classList.add("btn-danger");
      document.getElementById("myImage1").src = turnon;
	//   document.getElementById("bgbtn1").style.backgroundColor = "lightblue";
    } 
	else {
      btn1.innerText = "ON";
      btn1.classList.remove("btn-danger");
      btn1.classList.add("btn-success");
      document.getElementById("myImage1").src = turnoff;
    }
  else {
    if (confirm("Ban muon tat bong den") == true) {
      socket.emit("DEVICE1", "1");
      btn1.innerText = "ON";
      btn1.classList.remove("btn-danger");
      btn1.classList.add("btn-success");
      document.getElementById("myImage1").src = turnoff;
	//   document.getElementById("bgbtn1").style.backgroundColor = "rgba(0, 0, 0, 0.82)";
    } 
	else {
      btn1.innerText = "OFF";
      btn1.classList.remove("btn-success");
      btn1.classList.add("btn-danger");
      document.getElementById("myImage1").src = turnon;
    }
  }
}


function device2() {
  if (btn2.innerText == "ON") {
	
    socket.emit("DEVICE2", "0");
    btn2.innerText = "OFF";
    btn2.classList.remove("btn-success");
    btn2.classList.add("btn-danger");
    document.getElementById("myImage2").src = turnon;
	// document.getElementById("bgbtn2").style.backgroundColor = "red";
	
  } 
  else {
	
    socket.emit("DEVICE2", "1");
    btn2.innerText = "ON";
    btn2.classList.remove("btn-danger");
    btn2.classList.add("btn-success");
    document.getElementById("myImage2").src = turnoff;
	// document.getElementById("bgbtn2").style.backgroundColor = "rgba(0, 0, 0, 0.82)";
  
  }
}

