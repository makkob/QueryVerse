import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react"; // Імпортуйте useState

import { authRoutes, publicRoutes } from "../src/routes";
import LoginPage from "./pages/LoginPage"; // Імпортуйте ваш компонент логіну

function App() {
  // Використовуйте стейт для визначення статусу аутентифікації
  const [isAuth, setIsAuth] = useState(true);

  return (
    <>
      <Router>
        <Switch>
          {/* Маршрути публічних сторінок */}
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} exact />
          ))}

          {/* Маршрут для сторінки логіну */}
          <Route path="/login" component={LoginPage} exact />

          {/* Приватні маршрути */}
          {isAuth &&
            authRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} component={Component} exact />
            ))}

          {/* Перенаправлення на сторінку логіну, якщо користувач не аутентифікований */}
          <Redirect to="/login" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
