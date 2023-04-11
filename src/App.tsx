import PhotoGallery from "@components/PhotoGallery";
import "@styles/app.css";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Home - Image Gallery</title>
      </Helmet>
      <div className="App">
        <PhotoGallery />
      </div>
    </HelmetProvider>
  );
}

export default App;
