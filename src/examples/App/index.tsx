import * as React from "react";
import {
  Link,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Button from "../Button";
import * as styles from "./index.less";

interface IRoute {
  path: string;
  component: React.ComponentType;
  name: string;
}

const routes: [IRoute] = [
  {
    component: Button,
    name: "Button",
    path: "/Button",
  },
];

class App extends React.PureComponent<any, any> {

  public render() {
    return (
      <div className={styles.container}>
        {this.renderHeader()}
        {this.renderRoutes()}
      </div>
    );
  }

  private backHome = () => {
    this.props.history.push("/");
  }

  private renderHomeList = () => {
    const demoList = routes.map((route, index) => {
      return (
        <li className={styles.listItem} key={index}>
          <Link to={`${route.path}`}>
            {route.name}
          </Link>
        </li>
      );
    });
    return (
      <ul className={styles.demoList}>
        {demoList}
      </ul>
    );
  }

  private renderHeader() {
    const pathname = this.props.location.pathname;
    const demoName = pathname.split("/")[1];
    if (demoName) {
      return (
        <div className={styles.demoHeader}>
          <h1 onClick={this.backHome}>Home</h1>
          <span className={styles.separate}>|</span>
          <h2>{demoName}</h2>
        </div>
      );
    }
    return (
      <div className={styles.demoHeader}>
        <h1>Home</h1>
        <span className={styles.separate}>|</span>
        <span>Poplar-基于React的移动端组件库</span>
      </div>
    );
  }

  private renderRoutes = () => {
    const routeList = routes.map((route, index) => {
      return (
        <Route exact={true} path={route.path} component={route.component} key={index} />
      );
    });
    return (
      <Switch>
        {<Route exact={true} path="/" component={this.renderHomeList} />}
        {routeList}
      </Switch>
    );
  }
}

export default withRouter(App);