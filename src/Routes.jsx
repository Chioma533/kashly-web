import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import DigitalWallet from "pages/digital-wallet";
import SavingsGroups from "pages/savings-groups";
import BudgetingCoach from "pages/budgeting-coach";
import SendMoney from "pages/send-money";
import GroupDetails from "pages/group-details";
import FinancialLiteracyHub from "pages/financial-literacy-hub";
import NotFound from "pages/NotFound";
// New auth and profile imports
import LandingPage from 'pages/landing-page/index'
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import ForgotPassword from "pages/auth/ForgotPassword";
import ProfileSettings from "pages/profile/ProfileSettings";
import Dashboard from "pages/dashboard/Dashboard";
import ReceiveMoneyModal from "pages/recieve-money"
const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Main app routes - directly accessible in development mode */}
          <Route path="/Home" element={<LandingPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/digital-wallet" element={<DigitalWallet />} />
          <Route path="/savings-groups" element={<SavingsGroups />} />
          <Route path="/budgeting-coach" element={<BudgetingCoach />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/group-details" element={<GroupDetails />} />
          <Route path="/financial-literacy-hub" element={<FinancialLiteracyHub />} />
          <Route path="/receive-money" element={<ReceiveMoneyModal />}/>
          
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;