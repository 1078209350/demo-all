import React from "react";
import {Children,CmHoc} from "./App9"
const CmHoc1=CmHoc(Children);
class App15 extends React.Component {
    render() {

        return(
            <CmHoc1></CmHoc1>
        )


    }
}
export default App15

