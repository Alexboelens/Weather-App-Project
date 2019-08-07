const app = new Vue({
    el: '#app',
    data: {
        isLoading: true,
        data: [],
        date: [],
        hour: [],
        windSpd: [],
        icon: [],
        temp: [],
        search: "Almere,nl",
        day1Icons: [],
        day2Icons: [],
        day3Icons: [],
        day4Icons: [],
        day5Icons: [],
        day1Date: [],
        day2Date: [],
        day3Date: [],
        day4Date: [],
        day5Date: [],
        day2Min: 0,
        day3Min: 0,
        day4Min: 0,
        day5Min: 0,
        day2Max: 0,
        day3Max: 0,
        day4Max: 0,
        day5Max: 0
    },
    created() {
        this.getData();
    },
    methods: {
        getData: async function () {
            var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + this.search + "&units=metric&APPID=fa2704f7ee6b50e42c8b170b4362eb1f"

            this.data = await fetch(url, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(json => json)
                .catch(error => console.log(error))
            this.pushArray(this.data);
            this.isLoading = false;
        },
        pushArray: function (data) {
            this.date = []
            this.hour = []
            this.windSpd = []
            this.icon = []
            this.temp = []
            this.day1Icons = []
            this.day2Icons = []
            this.day3Icons = []
            this.day4Icons = []
            this.day5Icons = []
            this.day1TempMin = []
            this.day2TempMin = []
            this.day3TempMin = []
            this.day4TempMin = []
            this.day5TempMin = []
            this.day1TempMax = []
            this.day2TempMax = []
            this.day3TempMax = []
            this.day4TempMax = []
            this.day5TempMax = []
            this.day1Date = []
            this.day2Date = []
            this.day3Date = []
            this.day4Date = []
            this.day5Date = []

            let currentDay = new Date(data.list[0].dt_txt.split(" ")[0]);
            let days = [];
            for (let d = 0; d < 5; d++) {
                let day = new Date(new Date().setDate(currentDay.getDate() + d));
                let date = day.getDate();
                if (date < 10) {
                    date = "0" + date
                }
                let month = day.getMonth() + 1;
                if (month < 10) {
                    month = "0" + month
                }
                days.push("" + day.getFullYear() + "-" + month + "-" + date + "")
            }
            for (var i = 0; i < data.list.length; i++) {
                this.date.push(data.list[i].dt_txt.split(" ")[0].split("-").reverse().join("-"));
                this.hour.push(data.list[i].dt_txt.split(" ")[1].split(":").splice(0, 2).join(":"));
                this.icon.push(data.list[i].weather[0].icon);
                this.temp.push(data.list[i].main.temp);
                this.windSpd.push(data.list[i].wind.speed);

                if (data.list[i].dt_txt.split(" ")[0] == days[0]) {
                    this.day1Icons.push(data.list[i].weather[0].icon);
                    this.day1TempMin.push(data.list[i].main.temp_min);
                    this.day1TempMax.push(data.list[i].main.temp_max);
                    this.day1Date.push(data.list[i].dt_txt.split(" ")[0].split("-").reverse().join("-"));
                } else if (data.list[i].dt_txt.split(" ")[0] == days[1]) {
                    this.day2Icons.push(data.list[i].weather[0].icon);
                    this.day2TempMin.push(data.list[i].main.temp_min);
                    this.day2TempMax.push(data.list[i].main.temp_max);
                    this.day2Date.push(data.list[i].dt_txt.split(" ")[0].split("-").reverse().join("-"));
                } else if (data.list[i].dt_txt.split(" ")[0] == days[2]) {
                    this.day3Icons.push(data.list[i].weather[0].icon);
                    this.day3TempMin.push(data.list[i].main.temp_min);
                    this.day3TempMax.push(data.list[i].main.temp_max);
                    this.day3Date.push(data.list[i].dt_txt.split(" ")[0].split("-").reverse().join("-"));
                } else if (data.list[i].dt_txt.split(" ")[0] == days[3]) {
                    this.day4Icons.push(data.list[i].weather[0].icon);
                    this.day4TempMin.push(data.list[i].main.temp_min);
                    this.day4TempMax.push(data.list[i].main.temp_max);
                    this.day4Date.push(data.list[i].dt_txt.split(" ")[0].split("-").reverse().join("-"));
                } else if (data.list[i].dt_txt.split(" ")[0] == days[4]) {
                    this.day5Icons.push(data.list[i].weather[0].icon);
                    this.day5TempMin.push(data.list[i].main.temp_min);
                    this.day5TempMax.push(data.list[i].main.temp_max);
                    this.day5Date.push(data.list[i].dt_txt.split(" ")[0].split("-").reverse().join("-"));
                }
            }
            this.day2Min = Math.min(...this.day2TempMin)
            this.day3Min = Math.min(...this.day3TempMin)
            this.day4Min = Math.min(...this.day4TempMin)
            this.day5Min = Math.min(...this.day5TempMin)
            this.day2Max = Math.max(...this.day2TempMax)
            this.day3Max = Math.max(...this.day3TempMax)
            this.day4Max = Math.max(...this.day4TempMax)
            this.day5Max = Math.max(...this.day5TempMax)
        },
    },
});
