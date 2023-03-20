import './App.css';
import { AddEmployeeForm } from './pages/AddEmployeeForm';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EmployeeList } from './pages/EmployeeList';
import { UpdateEmployee } from './pages/UpdateEmployee';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<EmployeeList />}></Route>
        <Route path="/" element={<EmployeeList />}></Route>
        <Route path="/addEmployee" element={<AddEmployeeForm />}></Route>
        <Route path="/updateEmployee/:id" element={<UpdateEmployee/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
