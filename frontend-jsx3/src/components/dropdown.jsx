import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Form from "react-bootstrap/Form";

const fileTypes = ["JPEG", "PNG", "GIF","PDF","DOCX","MP3","MP4","SVG","JPG"];
export default function App() {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };
    return (
        <div className="App">
        
          <FileUploader
            multiple={true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />

          <br />
        </div>
      );
}

