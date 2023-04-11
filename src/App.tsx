import "@styles/app.css";
import { local } from "@utils";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PhotoGallery from "@components/PhotoGallery";

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
