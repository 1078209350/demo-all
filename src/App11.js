//react 动画
import React from 'react';
import {TransitionGroup,CSSTransition} from "react-transition-group"
import uuid from "uuid"
import "./App.css"
import "animate.css"

//总的组件
class News extends  React.Component{
    state={
        data:[
            {id:uuid(),text:'我爱你佳佳'},
            {id:uuid(),text:'我爱你佳佳'},
            {id:uuid(),text:'我爱你佳佳'}
        ]
    };
    handleClick=()=>{
        this.setState({
            data:[
                ...this.state.data,
                {
                    id:uuid(),text:''+Date.now()
                }
            ]
        })
    }
    handleRemove(index){
        console.log(index);
        let data=[...this.state.data];
        data.splice(index,1)
        this.setState({
            data
        })
    }
    render(){
        return(
           <div>
               <button onClick={this.handleClick}>添加一项</button>
               <TransitionGroup>
                   {
                       this.state.data.map((item,index)=>(
                           <CSSTransition key={item.id} timeout={500} classNames={{
                               enter:'animated',
                               enterActive:'swing',
                               exit:'animated',
                               exitActive:'jello'
                           }}>
                               <div>
                                   <div>{item.text}</div>
                                   <button onClick={()=>this.handleRemove(index)}>删除</button>
                               </div>
                           </CSSTransition>
                       ))

                   }
               </TransitionGroup>

           </div>
        )
    }
}
export default  News; //导出组件


