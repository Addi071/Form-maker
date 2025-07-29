import logo from './logo.svg';
import './styles/Login.css'
import './styles/Register.css'
import './App.css';
import './styles/CreateSurvey.css'
import './styles/Surveyform.css'
import './styles/AdminDashboard.css'
import './styles/Navbar.css'
import './styles/SurveyResponses.css'
import './styles/MySurvey.css'
import './styles/SurveyAnswerForm.css'
import './styles/FormMakerLanding.css'

import {BrowserRouter, Route, Routes, useLocation, matchPath} from 'react-router-dom'
// import { FormMakerLanding } from './components/FormMakerLanding';
import FormMakerLanding from './components/FormMakerLanding';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Privatecomp } from './components/Privatecomp';
import CreateSurvey from './components/CreateSurvey';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import CreateSurveyForm from './components/CreateSurveyForm';
import SurveyAnswerForm from './components/SurveyAnswerForm';
import SurveyResponses from './components/SurveyResponses';
import MySurveys from './components/MySurveys';
import UpdateSurvey from './components/UpdateSurvey';



function AppLayout() {
  const location = useLocation();
  const { pathname } = location;

  // Define paths where navbar should be hidden
  const hideNavbarPaths = [
    "/login",
    "/signup",
    "/"
  ];

  // Check if current route matches exact path or pattern (e.g., /survey/:id)
  const hideNavbar = 
    hideNavbarPaths.includes(pathname) || 
    matchPath("/survey/:id", pathname);  // for dynamic routes

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route element={<Privatecomp />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/survey-responses/:surveyId/responses" element={<SurveyResponses />} />
          <Route path="/update-survey/:id" element={<UpdateSurvey />} />
          <Route path="/my-surveys" element={<MySurveys />} />
          <Route path="/create-survey" element={<CreateSurveyForm />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/survey/:id" element={<SurveyAnswerForm />} />
        <Route path="/" element={<FormMakerLanding />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}


export default App;
