import { useMap } from 'react-map-gl';
import MainMap from './components/main-map/main-map';
// import MapBoxMap from './components/main-map/mapbox-gl';
import { HomeBottomBox, HomeBottomContainer, HomeBottomSearchBar, HomeTopBox, HomeTopContainer } from './app-style';
import { MainMenuButton, NavigationButton } from './assets/style/global-style';
function App() {


  const { usemap } = useMap();

  const handleGo = () => {
    // mainMap.flyTo({ center: [51.420175149565466, 35.700956782132934] })
    console.log(usemap.getCenter())

  }
  return (
    <div >
      <HomeTopContainer>
        <HomeTopBox>
          <MainMenuButton onClick={() => handleGo()} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </MainMenuButton>
          <div style={{ background: "#fff", padding: "10px", borderRadius: "15px" }}>
            Taxi Map
          </div>
          <NavigationButton onClick={() => handleGo()} >
            Nav
          </NavigationButton>
        </HomeTopBox>
      </HomeTopContainer>
      <MainMap />
      <HomeBottomContainer>
        <HomeBottomBox>
          <HomeBottomSearchBar>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <div>text</div>
          </HomeBottomSearchBar>
        </HomeBottomBox>
      </HomeBottomContainer>
    </div>
  )
}

export default App
