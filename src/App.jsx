// import { Toaster } from "react-hot-toast"; //*react-hot-toast is a super easy toast library for React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import NotFound from "./NotFound";
import { Toaster } from "react-hot-toast";
import Edit from "./pages/Edit";

function App() {
  return (
    <div>
      <BrowserRouter> {/*//*BrowserRouter is used to wrap the Routes*/}
        <Routes> {/*//*Routes is used to define the routes*/}
        <Route path="/" element={<Home/>}/> {/*//*Route is used to define the path and the component that will be rendered when the path is matched*/}
        <Route path="/create" element={<Create/>}/> 
        <Route path="/edit/:id" element={<Edit/>}/> 
        <Route path="*" element={<NotFound/>}/> {/*//*if the path is not matched then NotFound component will be rendered*/}
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />{" "}
      {/*//*Toaster is a component that will show the toast messages*/}
    
    </div>
  );
}

export default App;
