import LeftNav from "./components/LeftNav"
import Navbar from "./components/Navbar"
import PageLayout from "./components/PageLayout"
import Map from "./components/Map"

const App = () => {
  return (
    <main>
      <PageLayout/>
      <Map />
      <LeftNav/>
      <Navbar/>
    </main>
  )
}

export default App
