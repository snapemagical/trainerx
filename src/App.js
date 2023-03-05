import "./App.css";
import "./style/main.css";
import { Route, Routes } from "react-router-dom";

import Homepage from "./Page/Homepage/Header/Homepage";
import PageNotFound from "./Page/PageNotFound/PageNotFound";
import About from "./Page/Homepage/Header/Homepageall/About";
import Services from "./Page/Homepage/Header/Homepageall/Services";
import Careers from "./Page/Homepage/Header/Homepageall/Careers";
import Contact from "./Page/Homepage/Header/Homepageall/Contact";
import Products from "./Page/Homepage/Header/Homepageall/Products";

import AuthRoute from "./common/authRoute";
import Login from "./Page/Login/Login";
import Dashboard from "./Page/Dashboard/Dashboard";

// import Signup from "./Page/Signup/Signup";
// import Forgetpassword from "./Page/ForgetPassword/Forgetpassword";

// import Userprofile from "./Page/UserProfile/Userprofile";
// import Changepassword from "./Page/ForgetPassword/Changepassword";
// import Signupstudent from "./Page/Signup/Signupstudent";
// import Passwordchange from "./Page/ForgetPassword/Passwordchange";
// import Personal from "./Page/UserProfile/page/Personal/Personal";
// import Emergency from "./Page/UserProfile/page/Emergency/Emergency";
// import Qualification from "./Page/UserProfile/page/Qualification/Qualification";
// import Other from "./Page/UserProfile/page/Other";
// import Experience from "./Page/UserProfile/page/Experience/Experience";
// import Addprevious from "./Page/UserProfile/page/Experience/Addprevious";
// import Licenses from "./Page/UserProfile/page/Licenses/Licenses";
// import AddLicense from "./Page/UserProfile/page/Licenses/AddLicense";
// import AddELPDetails from "./Page/UserProfile/page/Licenses/AddELPDetails";
// import AddDetails from "./Page/UserProfile/page/Licenses/AddDetails";
// import InstrumentRating from "./Page/UserProfile/page/Licenses/InstrumentRating";
// import AddMedical from "./Page/UserProfile/page/Licenses/AddMedical";
// import AddRatings from "./Page/UserProfile/page/Licenses/AddRatings";
// import Roster from "./Page/Roaster";
// import AllNotifications from "./Page/Notifications";
// import AddRoster from "./Page/Roaster/add";
// import HoursRoster from "./component/hour";
// import Students from "./Page/Students";
// import AddStudents from "./Page/Students/add";
// import Instructors from "./Page/Instructors";
// import AddInstructors from "./Page/Instructors/add";
// import Aircraft from "./Page/AirCrafts";
// import LoadSheet from "./Page/Roaster/loadSheet";
// import Addaircraft from "./Page/AirCrafts/add";
// import ResetPassword from "./Page/reset-password";
// import TicketRaising from "./Page/ticket-raising";
// import Maintenece from "./Page/Maintenece/index";
// import InstructorAnal from "./Page/Dashboard/instructorAnalysis";
// import StudentAnal from "./Page/Dashboard/studentAnalysis";
// import AircraftAnal from "./Page/Dashboard/aircraftAnalysis";
// import { useEffect } from "react";

const App = () => {
  const isBackgroundRed = true;
  return (
    <Routes>
      <Route exact path="/" element={<AuthRoute component={Login} authRequired={false}><Dashboard /></AuthRoute>} />
      <Route exact path="/login" element={<AuthRoute component={Login} authRequired={false}><Dashboard /></AuthRoute>} />
      <Route exact path="/login-admin" element={<AuthRoute component={Login} authRequired={false}><Dashboard /></AuthRoute>} />
      <Route path="/dashboard" element={<AuthRoute component={Dashboard} authRequired={true} />} />
      {/* <AuthRoute exact path="/" component={Login} authRequired={false} />
        <AuthRoute exact path="/login" component={Login} authRequired={false} />
        <AuthRoute
          exact
          path="/login-admin"
          component={Login}
          authRequired={false}
        />
        <AuthRoute
          exact
          path="/changepassword/:id/:token"
          authRequired={false}
          component={Changepassword}
        />
        <AuthRoute
          exact
          path="/forgetpassword"
          component={Forgetpassword}
          authRequired={false}
        />
        <AuthRoute
          exact
          path="/signup/:id"
          authRequired={false}
          component={Signup}
        />
        <AuthRoute
          path="/dashboard"
          component={Dashboard}
          authRequired={true}
        />
        <AuthRoute
          path="/instructor-analysis"
          component={InstructorAnal}
          authRequired={true}
        />
        <AuthRoute
          path="/student-analysis"
          component={StudentAnal}
          authRequired={true}
        />
        <AuthRoute
          path="/aircraft-analysis"
          component={AircraftAnal}
          authRequired={true}
        />
        <AuthRoute
          path="/change-password"
          component={ResetPassword}
          authRequired={true}
        />
        <AuthRoute
          path="/ticket-raising"
          component={TicketRaising}
          authRequired={true}
        />
        <Route
          path="/roster"
          render={({ match: { url } }) => (
            <Switch>
              <AuthRoute
                authRequired={true}
                path={`${url}`}
                component={Roster}
                exact
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/add-roster/:type`}
                component={AddRoster}
                exact
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/load-sheet`}
                component={LoadSheet}
                exact
              />
            </Switch>
          )}
        />
        <AuthRoute
          path="/notifications"
          component={AllNotifications}
          authRequired={true}
        />
        <Route
          path="/students"
          render={({ match: { url } }) => (
            <Switch>
              <AuthRoute
                authRequired={true}
                path={`${url}/`}
                component={Students}
                exact
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/list/:id`}
                component={AddStudents}
                exact
              />
            </Switch>
          )}
        />
        <Route
          path="/instructors"
          render={({ match: { url } }) => (
            <Switch>
              <AuthRoute
                authRequired={true}
                path={`${url}/`}
                component={Instructors}
                exact
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/list/:id`}
                component={AddInstructors}
                exact
              />
            </Switch>
          )}
        />
        <Route
          path="/aircraft"
          render={({ match: { url } }) => (
            <Switch>
              <AuthRoute
                authRequired={true}
                path={`${url}/`}
                component={Aircraft}
                exact
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/aircrafts/:id`}
                component={Addaircraft}
                exact
              />
            </Switch>
          )}
        />
        <Route
          path="/user-profile"
          authRequired={true}
          render={({ match: { url } }) => (
            <Switch>
              <AuthRoute
                authRequired={true}
                path={`${url}/`}
                component={Userprofile}
                exact
              />

              <AuthRoute
                authRequired={true}
                exact
                path={`${url}/personal`}
                component={Personal}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/emergency`}
                component={Emergency}
              />

              <AuthRoute
                authRequired={true}
                path={`${url}/qualification`}
                component={Qualification}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/other`}
                component={Other}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/experience`}
                component={Experience}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/experienceadd/:id`}
                component={Addprevious}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/licenses`}
                component={Licenses}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/license/:id`}
                component={AddLicense}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/elp/:id`}
                component={AddELPDetails}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/endorsement/:id`}
                component={AddDetails}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/instrumentrating/:id`}
                component={InstrumentRating}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/medical/:id`}
                component={AddMedical}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/otherrating/:id`}
                component={AddRatings}
              />
              <AuthRoute
                authRequired={true}
                path={`${url}/passwordchange`}
                component={Passwordchange}
                exact
              />
            </Switch>
          )}
        />

        <AuthRoute
          authRequired={true}
          path={`/maintenece`}
          component={Maintenece}
        /> */}

      <Route path="/home" element={<Homepage />} exact />
      <Route path="/products" element={<Products />} exact />
      <Route path="/contact" element={<Contact />} exact />
      <Route path="/careers" element={<Careers />} exact />
      <Route path="/services" element={<Services />} exact />
      <Route path="/about" element={<About />} exact />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
