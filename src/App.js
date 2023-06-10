import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style/style.scss";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import About from "./pages/About";
import ChatPage from "./pages/ChatPage";
import DiscipleForgetPassword from "./components/auth/DiscipleForgetPassword";
import DiscipleListPage from "./pages/DiscipleListingPage";
import DiscipleProfile from "./components/DiscipleProfile.js";
import GenralArticle from "./components/GenralArticle.js";
import HereIsYourMentor from "./components/HereIsYourMentor.js";
import Home from "./pages/Home";
import IntroVideo from "./components/IntroVideo.js";
import LegacyGroup from "./components/LegacyGroup.js";
import Login from "./components/auth/Login";
import MentorProfile from "./pages/MentorProfile";
import Payment from "./components/Payment.js";
import PmLevel from "./components/PmLevel.js";
import PmStudyMaterial from "./components/PmStudyMaterial.js";
import PmTest from "./components/PmTest.js";
import PmTestResult from "./components/PmTestResult.js";
import PrivacyPolicy from "./pages/PrivacyPolicy.js";
import Profilepage from "./pages/ProfilePage";
import React from "react";
import RegistrationFormCertification from "./components/auth/RegistrationFormCertification.js";
import RequestChangeDesciple from "./pages/RequestChangeDesciple.js";
import RequestChangeMentor from "./pages/RequestChangeMentor.js";
import ResetPassword from "./components/auth/ResetPassword";
import ScriptureGiftResult from "./components/ScriptureGiftResult.js";
import ScriptureGiftStartTest from "./components/ScriptureGiftStartTest.js";
import ScriptureGiftTest from "./components/ScriptureGiftTest";
import ScriptureKey from "./components/ScriptureKey.js";
import ScriptureKeyLevelPage from "./pages/ScriptureKeyLevelPage.js";
import ScriptureStudyMaterial from "./components/ScriptureStudyMaterial.js";
import ScriptureYourAnswer from "./components/ScriptureYourAnswer.js";
import Singlechatpage from "./pages/singleChatPage";
import Splash from "./components/Splash.js";
import StudyMaterial from "./pages/StudyMaterial.js";
import TermsAndCondition from "./pages/TermsAndCondition.js";
import Welcome from "./components/Welcome";
import WelcomeVideo from "./components/WelcomeVideo";
import YourAnswer from "./components/YourAnswer.js";
import Success from "./components/Success";
import Checkout from "./components/Checkout";

import ChangePassword from "./components/auth/ChangePassword";
import Faq from "./pages/Faq";


function App(props) {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route path="/registrationFormCertification">
            <RegistrationFormCertification />
          </Route>
         
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/profile">
            <Profilepage />
          </Route>
          <Route path="/studyMaterial">
            <StudyMaterial />
          </Route>
          <Route path="/scriptureKeyLevel">
          <ScriptureKeyLevelPage />
        </Route>
          <Route path="/resetPassword">
            <ResetPassword />
          </Route>
          <Route path="/changePassword">
            <ChangePassword />
          </Route>
          <Route path="/mentorProfile">
            <MentorProfile />
          </Route>
          <Route path="/privacy">
            <PrivacyPolicy />
          </Route>
          <Route path="/termsAndCondition">
            <TermsAndCondition />
          </Route>
          <Route path="/faq">
            <Faq />
          </Route>
          <Route path="/chatPage">
            <ChatPage />
          </Route>
          <Route path="/singlechat">
            <Singlechatpage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        
          <Route path="/discipleForgetPassword">
            <DiscipleForgetPassword />
          </Route>
          <Route path="/introVideo">
            <IntroVideo />
          </Route>
          <Route path="/requestChangeMentor">
            <RequestChangeMentor />
          </Route>
          <Route path="/requestChangeDesciple">
          <RequestChangeDesciple />
        </Route>
          <Route path="/hereIsYourMentor">
            <HereIsYourMentor />
          </Route>
          <Route path="/welcomeVideo">
            <WelcomeVideo />
          </Route>
          <Route path="/splash">
            <Splash />
          </Route>
          <Route path="/genralArticle">
            <GenralArticle />
          </Route>
          <Route path="/legacyGroup">
            <LegacyGroup />
          </Route>
          <Route path="/discipleList">
            <DiscipleListPage />
          </Route>
          <Route path="/discipleProfile">
            <DiscipleProfile />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/scriptureKey">
            <ScriptureKey />
          </Route>
          <Route path="/pmLevel">
            <PmLevel />
          </Route>
          <Route path="/pmStudyMaterial/:id">
            <PmStudyMaterial />
          </Route>
          <Route path="/scriptureStudyMaterial/:id">
            <ScriptureStudyMaterial />
          </Route>
          <Route path="/pmTest/:id">
            <PmTest />
          </Route>
          <Route path="/pmTestResult">
            <PmTestResult />
          </Route>
          <Route path="/scriptureGiftResult">
            <ScriptureGiftResult />
          </Route>
          
          <Route path="/scriptureYourAnswer">
            <ScriptureYourAnswer />
          </Route>
          <Route path="/yourAnswer">
            <YourAnswer />
          </Route>
          <Route path="/scriptureGiftTest">
            <ScriptureGiftTest />
          </Route>
          <Route path="/scriptureGiftStartTest">
            <ScriptureGiftStartTest />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Splash />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
