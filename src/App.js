import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import OfficerLogin from "./pages/OfficerLogin";
import ViolatorLogin from "./pages/ViolatorLogin";
import RegisterViolator from "./pages/RegisterViolator";
import OfficerRegister from "./pages/OfficerRegister";
import ViewViolator from "./pages/ViewViolator";
import CreateViolation from "./pages/CreateViolation";
import OfficerDashboard from "./pages/OfficerDashboard";
import ViewViolation from "./pages/ViewViolation";
import ViewInvoice from "./pages/ViewInvoice";
import AdminDashboard from "./pages/AdminDashboard";
import ViewOfficer from "./pages/ViewOfficer";
import EditOfficer from "./pages/EditOfficer";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccess";
import ViewMessage from "./pages/ViewContact";
import Invoice from "./pages/Invoice";
import ViewAllInvoice from "./pages/ViewAllInvoices";
import PaymentInvoice from "./pages/PaymentInvoice";
import LoginHome from "./pages/LoginHome";
import OfficerHome from "./pages/OfficerHome";
import AdminHome from "./pages/AdminHome";
import ViewViolatorCopy from "./pages/ViewViolatorCopy";
import ViewViolationCopy from "./pages/ViewViolationCopy";
import ViewAllInvoiceCopy from "./pages/ViewAllInvoiceCopy";
import EditViolator from "./pages/EditViolator";
import EditViolation from "./pages/EditViolation";
import ForgotPassword from "./pages/ForgetPassword";
import ContactUs from "./pages/Contact";
import SendRequest from "./pages/SendRequest";
import ViewPayment from "./pages/ViewPayment";

function App() {

  return (
    <Router>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-home" element={<LoginHome />} />
        <Route path="/officer-home" element={<OfficerHome/>} />
        <Route path="/admin-home" element={<AdminHome/>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/officerlogin" element={<OfficerLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/violatorlogin" element={<ViolatorLogin />} />
        <Route path="/reg-violator" element={<RegisterViolator />} />
        <Route path="/view-violator" element={<ViewViolator/>} />
        <Route path="/view-violators" element={<ViewViolatorCopy/>} />
        <Route path="/register" element={<OfficerRegister/>} />
        <Route path="/view-officer" element={<ViewOfficer/>} />
        <Route path="/edit-officer/:id" element={<EditOfficer/>} />
        <Route path="/edit-violator/:id" element={<EditViolator/>} />
        <Route path="/edit-violation/:id" element={<EditViolation/>} />
        <Route path="/create-violation" element={<CreateViolation/>} />
        <Route path="/invoice" element={<Invoice/>} />
        <Route path="/view-violation" element={<ViewViolation />} />
        <Route path="/view-violations" element={<ViewViolationCopy />} />
        <Route path="/view-invoice/:invoiceId" element={<ViewInvoice />} />
        <Route path="/view-all-invoice" element={<ViewAllInvoice />} />
        <Route path="/view-all-invoices" element={<ViewAllInvoiceCopy />} />
        <Route path="/view-payment" element={<ViewPayment />} />
        <Route path="/view-message" element={<ViewMessage />} />
        <Route path="/officer-dashboard" element={<OfficerDashboard/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-invoice" element={<PaymentInvoice />} />
        <Route path="/contact-us" element={<SendRequest />} />
      </Routes>
    </Router>
  );
}

export default App;




