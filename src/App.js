import Canvas from "./components/Canvas/Canvas"
import './App.css';
import TopPropertiesBar from './components/TopPropertiesBar/TopPropertiesBar';

function App() {
  return (
    <div>
    <TopPropertiesBar/>
    <Canvas filter_id="a" pattern_id="b"/>
    </div>
  );
}

export default App;
