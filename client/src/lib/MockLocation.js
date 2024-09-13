// For development purposes and testing app can be invoked by command in the console

// Coords to map a test run

// Start coords at 39.173659, -94.788111
// const points = [
//     [39.173684, -94.788134], // Trailhead start
//     [39.173696, -94.788107],
//     [39.173758, -94.788016],
//     [39.173834, -94.787955],
//     [39.173894, -94.787889],
//     [39.173932, -94.787749],
//     [39.173929, -94.787638],
//     [39.173952, -94.787602],
//     [39.173991, -94.787535],
//     [39.174076, -94.787498],
//     [39.174127, -94.787476] // Run end
// ]

// Central Park
// Start coords at 40.774927, -73.972846
const points = [
    [40.774961, -73.972887],
    [40.775050, -73.972952],
    [40.775126, -73.972992],
    [40.775230, -73.972973],
    [40.775316, -73.972884],
    [40.775363, -73.972745],
    [40.775401, -73.972546],
    [40.775428, -73.972271],
    [40.774961, -73.972887],
    [40.775407, -73.971930],
    [40.775419, -73.971882],
    [40.775492, -73.971621],
    [40.775458, -73.971542],
    [40.775358, -73.971417],
    [40.775249, -73.971264],
    [40.775152, -73.971142],
    [40.774990, -73.971155],
    [40.774903, -73.971183],
    [40.774687, -73.971213],
]

let counter = 0;
let intervalId;

const mockWatchPosition = (successFunc) => {
    console.log('mock initialized');
    intervalId = setInterval(() => {
        console.log('sending location', counter)
        successFunc({ coords: { latitude: points[counter][0], longitude: points[counter][1] } })
        counter++;
        counter = counter % points.length
    }, 1000)
    return true
}

const origWatchPosition = navigator.geolocation.watchPosition;

const mockClearWatch = () => {
    console.log('clearInterval')
    clearInterval(intervalId)
}

const origClearWatch = navigator.geolocation.clearWatch;

window.doMock = () => {
    navigator.geolocation.watchPosition = mockWatchPosition
    navigator.geolocation.clearWatch = mockClearWatch;
}

window.unMock = () => {
    navigator.geolocation.watchPosition = origWatchPosition
    navigator.geolocation.clearWatch = origClearWatch;
}
