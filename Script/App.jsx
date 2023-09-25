import React, {useState} from "react";
import RenderIMG from "./RenderIMG.jsx";


const App =()=> {
const [imageURL , setImageUrl] = useState(0)
    const handleFileChange =(event)=>{
     const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    }

  return (
      <>
      <form>
        <label>product IMG</label><br/>
        <input type="file" onChange={handleFileChange} />
      </form>
          <RenderIMG imageUrl={imageURL}/>
      </>
  );


}
export default App;