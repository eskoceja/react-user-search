import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";  //importing app.js

const rootElement = document.getElementById("root");  //pulling in HTML
const root = createRoot(rootElement);   //creates a new root (replacing original?)

root.render(    //rendering or displaying App.js without problems (StrictMode)
  <StrictMode>  
    <App/>    
  </StrictMode>
);

// resource: https://codesandbox.io/s/mutable-sky-iesdhc?from-embed=&file=/src/App.js