import React from "react"
import { Route, Link } from "react-router-dom";
class About extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let {match, routes} = this.props;
        console.log(match);
        console.log(routes)
        return(
            <div>
                <div>
                    <Link to={`${match.url}/info`}>我的消息</Link>
                    <br/>
                    <Link to={`${match.url}/msg`}>我的信息</Link>
                </div>
                <div >
                    {
                        routes.map(({path, ComponentName, exact = true},key) => {
                            return <Route
                                exact={exact}
                                key={key}
                                path={path}
                                component={ComponentName}
                            />
                        })
                    }

                </div>
            </div>
        )
    }
}

export default About
