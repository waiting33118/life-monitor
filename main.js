const AQI_URL = `https://opendata.epa.gov.tw/api/v1/ATM00493?sort=SiteId&format=json&token=rbFYzLQnZkiGON7r+VUSyQ`
const airQualityData = []
const taoyuanAQI = []
const pm10 = []
const pm2_5 = []
const temperature = []
const humidity = []
const rainfall = []

const model = {
	getApiData() {
		axios
			.get(AQI_URL)
			.then((res) => {
				airQualityData.push(...res.data)
				taoyuanAQI.push(
					...airQualityData.filter((item) => item.SiteName === '桃園')
				)
				// console.log(taoyuanAQI)
				model.getNeededData()
			})
			.catch((err) => console.log(err))
	},
	getNeededData() {
		pm10.push(...taoyuanAQI.filter((item) => item.ItemId === '4').reverse())
		pm2_5.push(...taoyuanAQI.filter((item) => item.ItemId === '33').reverse())
		temperature.push(
			...taoyuanAQI.filter((item) => item.ItemId === '14').reverse()
		)
		humidity.push(
			...taoyuanAQI.filter((item) => item.ItemId === '38').reverse()
		)
		rainfall.push(
			...taoyuanAQI.filter((item) => item.ItemId === '23').reverse()
		)

		// console.log(pm10)
		// console.log(pm2_5)
		// console.log(temperature)
		// console.log(humidity)
		// console.log(rainfall)

		let pm10Values = pm10.map((item) => item.Concentration)
		let pm10Date = pm10.map((item) =>
			item.MonitorDate.slice(item.MonitorDate.indexOf(' ')).trim()
		)
		let pm25Values = pm2_5.map((item) => item.Concentration)
		let pm25Date = pm2_5.map((item) =>
			item.MonitorDate.slice(item.MonitorDate.indexOf(' ')).trim()
		)
		let tempValues = temperature.map((item) => item.Concentration)
		let tempDate = temperature.map((item) =>
			item.MonitorDate.slice(item.MonitorDate.indexOf(' ')).trim()
		)
		let humidValues = humidity.map((item) => item.Concentration)
		let humidDate = humidity.map((item) =>
			item.MonitorDate.slice(item.MonitorDate.indexOf(' ')).trim()
		)
		let rainfallValues = rainfall.map((item) => item.Concentration)
		let rainfallDate = rainfall.map((item) =>
			item.MonitorDate.slice(item.MonitorDate.indexOf(' ')).trim()
		)

		view.pm10_Chart(pm10Date, pm10Values)
		view.pm25_Chart(pm25Date, pm25Values)
		view.temp_Chart(tempDate, tempValues)
		view.humid_Chart(humidDate, humidValues)
		view.rainfall_Chart(rainfallDate, rainfallValues)
	},
}

const view = {
	pm10_Chart(pm10Date, pm10Values) {
		let ctx = document.getElementById('pm10-Chart')
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: pm10Date,
				datasets: [
					{
						label: `${pm10[0].ItemEngName} (${pm10[0].ItemUnit})`,
						data: pm10Values,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 2,
					},
				],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		})
	},
	pm25_Chart(pm25Date, pm25Values) {
		let ctx = document.getElementById('pm25-Chart')
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: pm25Date,
				datasets: [
					{
						label: `${pm2_5[0].ItemEngName} (${pm2_5[0].ItemUnit})`,
						data: pm25Values,
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 2,
					},
				],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		})
	},
	temp_Chart(tempDate, tempValues) {
		let ctx = document.getElementById('temp-Chart')
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: tempDate,
				datasets: [
					{
						label: `${temperature[0].ItemName} (${temperature[0].ItemUnit})`,
						data: tempValues,
						backgroundColor: 'rgba(255, 206, 86, 0.2)',
						borderColor: 'rgba(255, 206, 86, 1)',
						borderWidth: 2,
					},
				],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		})
	},
	humid_Chart(humidDate, humidValues) {
		let ctx = document.getElementById('humid-Chart')
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: humidDate,
				datasets: [
					{
						label: `${humidity[0].ItemName} (%)`,
						data: humidValues,
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 2,
					},
				],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		})
	},
	rainfall_Chart(rainfallDate, rainfallValues) {
		let ctx = document.getElementById('rainfall-Chart')
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: rainfallDate,
				datasets: [
					{
						label: `${rainfall[0].ItemName} (${rainfall[0].ItemUnit})`,
						data: rainfallValues,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 2,
					},
				],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		})
	},
}

const controller = {
	dataInit() {
		model.getApiData()
	},
}

controller.dataInit()
