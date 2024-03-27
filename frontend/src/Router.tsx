import { Route, Switch } from "wouter";
import Default from "./pages/default";
import Users from "./pages/users";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Default} />
      <Route path="/users" component={Users} />
    </Switch>
  );
}

export default Router;
