import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Account } from "./pages/account/Account"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Register } from "./pages/login/Register"
import { ProjectDetails } from "./components/projects/ProjectDetails"
import { useSelector } from "react-redux";
import PaymentPage from "./components/payment-page/Payment"
import Dashboard from "./pages/innovator/Dashboard"
import Signup from "./pages/innovator/Signup"


const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const cartItems = useSelector((state) => state.cart.itemsList)
  console.log(cartItems);

  useEffect(() => {
    // axios.get("http://localhost:3001/projects").then((resp) => {
    //   console.log(resp)
    // })
  })
  return (
    <>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/account' component={Account} />
            <Route path='/projects/:whichProject' component={ProjectDetails} />
            <Route path='/payment/:id' component={PaymentPage} />
            <Route path='/innovator/dashboard/:id' component={Dashboard} />
          </Switch>
          <Footer />
        </Router>
    </>
  )
}
export default App
