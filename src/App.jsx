import React from "react";
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import Form from "./components/Form";
const App = () => {
  return (
    <div>
      <Header />
      <Dashboard />
      <Form />
    </div>
  );
};

export default App;
