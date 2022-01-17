import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/dashboard" element={<CourseDashboard/>} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":id" element={<CourseID />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById("root")
);

function Home() {
  return (
    <div>
      <h1>Home Route</h1>
    </div>
  );
}

function Learn() {
  return (
    <div>
      <h1>Learn Route</h1>
      <h4>All courses are listed here</h4>
      <Link to="/learn/courses">courses</Link>
      <Link to="/learn/bundles">bundles</Link>
      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "Node.js"];
  const randomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];

  return (
    <div>
      <h1>Courses List</h1>
      <h4>Courses Card</h4>
      <NavLink style={({isActive}) => {
        return {
          backgroundColor: isActive ? "red": "blue"
        }
      }} to={`/learn/courses/${randomCourseName}`}>
        {randomCourseName}
      </NavLink>

      <Outlet />
    </div>
  );
}

function Bundles() {
  return (
    <div>
      <h1>Bundle List</h1>
      <h4>Bundle Card</h4>
    </div>
  );
}

function CourseID() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1>URL params is : {id}</h1>
      <h4>
        <button onClick={() => {
          navigate("/dashboard", {state: "399"})
        }} >Price</button>
      </h4>
    </div>
  );
}

function CourseDashboard(){
  const location = useLocation();
  return (
    <div>
      The price of this course is {location.state}
    </div>
  )
}
