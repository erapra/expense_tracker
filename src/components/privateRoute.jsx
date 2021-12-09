import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
export default function PrivateRoute({ path, component: Component, render }) {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <Route
      path={path}
      render={(props) => {
        if (currentUser)
          return Component ? <Component {...props} /> : render(props);
        else return <Redirect to="/" />;
      }}
    />
  );
}
