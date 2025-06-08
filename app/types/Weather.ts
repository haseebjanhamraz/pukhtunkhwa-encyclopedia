// Weather type



// Sample API Request
// {
//     "name": "Mardan",
//     "coordinates": [
//         34.1989,
//         72.0231
//     ],
// "currentHourWeather": {
//     "time": "07:00:00",
//     "temperature": 28
// },
// "weather": [
//     {
//         "time": "05:00:00",
//         "temperature": 25
//     },
//     {
//         "time": "06:00:00",
//         "temperature": 25
//     },
//     {
//         "time": "07:00:00",
//         "temperature": 28
//     },
//     {
//         "time": "08:00:00",
//         "temperature": 31
//     },
//     {
//         "time": "09:00:00",
//         "temperature": 34
//     },
//     {
//         "time": "10:00:00",
//         "temperature": 36
//     },
//     {
//         "time": "11:00:00",
//         "temperature": 38
//     },
// ]
//}


export type Weather = {
    name: string
    coordinates: number[]
    currentHourWeather: {
      time: string
      temperature: number
      condition: string
      icon: string
      feelsLike: number
      humidity: number
      wind: number
      uvIndex: number
    }
    weather: {
      time: string
      temperature: number
      icon: string
    }[]
    currentTime: Date

}