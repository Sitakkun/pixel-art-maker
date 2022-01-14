import React,{useState} from 'react';
import './App.css';
import PixelArt from 'PixelArt';


function App() {
  const[pixel, setPixel] = useState(4);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPixel(parseInt(event.target.value));
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>ドット絵作成くん</h1>
      </header>
      <PixelArt pixel={pixel}/>
      <br />
      <div className="changePixcel-container">
        <input type="radio" name="pixcelRadio" value="4" checked={pixel === 4} onChange={handleChange} />
        <label htmlFor="">4 × 4 </label>
        <input type="radio" name="pixcelRadio" value="8" checked={pixel === 8} onChange={handleChange}/>
        <label htmlFor="">8 × 8 </label>
        <input type="radio" name="pixcelRadio" value="16" checked={pixel === 16} onChange={handleChange} />
        <label htmlFor="">16 × 16 </label>
      </div>
    </div>
  );
}

export default App;
