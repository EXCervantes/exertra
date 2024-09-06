// Start coords at 39.173659, -94.788111

const points = [
    [39.173684, -94.788134], // Trailhead start
    [39.173696, -94.788107],
    [39.173758, -94.788016],
    [39.173834, -94.787955],
    [39.173894, -94.787889],
    [39.173932, -94.787749],
    [39.173929, -94.787638],
    [39.173952, -94.787602],
    [39.173991, -94.787535],
    [39.174076, -94.787498],
    [39.174127, -94.787476] // Run end
]

let counter = 0;
let intervalId;

const mock = (successFunc) => {
    console.log('mock initialized');
    intervalId = setInterval(() => {
        console.log('sending location', counter)
        successFunc({ coords: { latitude: points[counter][0], longitude: points[counter][1] } })
        counter++;
        counter = counter % points.length
    }, 1000)
    return true
}

navigator.geolocation.watchPosition = mock

navigator.geolocation.clearWatch = () => {
    console.log('clearInterval')
    clearInterval(intervalId)
}

const [currentPosition, setCurrentPosition] = useState()
const [latitudeOffset, setLatitudeOffset] = useState()
const [longitudeOffset, setLongitudeOffset] = useState()

onkeydown(e.onkeydown => {
    e.key(currentPosition d, y)
})