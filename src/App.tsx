import UserForm from "@/components/UserForm";
import "@styles/app.css";
import { local } from "@utils";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const [prevUsername, setPrevUsername] = useState<string>("");
  const titlePrefix = prevUsername ? `${prevUsername}'s` : "My";

  useEffect(() => {
    if (prevUsername) return;
    const prevUser = local({ key: "username" }).get();
    if (prevUser) setPrevUsername(prevUser);
  }, [prevUsername]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Home - Image Gallery</title>
      </Helmet>
      <div className="App">
        {/* title and user */}
        <div className="title-wrapper">
          <h1 className="title">{`${titlePrefix} Photo Gallery`}</h1>
          <UserForm
            hasPrevUser={prevUsername !== ""}
            setPrevUsername={setPrevUsername}
          />
        </div>

        {/* photo gallery */}
        <div className="gallery-wrapper"></div>
      </div>
    </HelmetProvider>
  );
}

export default App;
