import React from 'react';
import {BrowserRouter,HashRouter,Route,Link,NavLink,Switch,Redirect} from "react-router-dom"

import router from "./router"

const Main=()=>(
    <div>
        <Switch>
            {
                router.map(({path, ComponentName, exact = true,routes = []},key) => {
                    return <Route
                        exact={exact}
                        key={key}
                        path={path}
                        //component={componentName}
                        render={props => (
                            //主要是为了传递嵌套路由到子组件
                            //类似于 <User {...props} routes={routes} />
                            <ComponentName {...props} routes={routes}/>
                        )}
                    />
                })
            }
        </Switch>
    </div>
)
export default Main
