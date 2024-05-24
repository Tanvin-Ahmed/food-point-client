import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 min-h-screen max-h-full">
        <div className="mt-16">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
