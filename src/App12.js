//代码分割
import React,{Component,Suspense} from 'react';
const Header=React.lazy(()=>import("./App2"))
class News extends  React.Component{
    state={
    };

    render(){
        return(
            <div>
                <Suspense fallback={<div>正在加载...</div>}>
                    <Header />
                </Suspense>
            </div>
        )
    }
}
export default  News; //导出组件


