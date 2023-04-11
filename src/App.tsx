import PhotoGallery from "@components/PhotoGallery";
import "@styles/app.css";
import { local } from "@utils";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  useEffect(() => {
    const isVisited = local({ key: "isVisited" }).get();
    if (!isVisited) local({ key: "isVisited", value: "true" }).set();
  }, []);

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
