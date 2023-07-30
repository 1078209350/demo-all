import React from 'react';
import {BrowserRouter,HashRouter,Route,Link,Switch} from "react-router-dom"

//定义组件
export const Home = ()=>{
  // 广播
  const channel = new BroadcastChannel('music')

  const handleJump1 = () =>{
    //是用广播的形式传播参数
    if (localStorage.getItem('number') && localStorage.getItem('number') == 1) {
      channel.postMessage('guantong')
    } else {
      window.open('http://localhost:3000/music?name=guantong', 'music')
    }
  }

  const handleJump2 = () =>{
    //是用广播的形式传播参数
    if (localStorage.getItem('number') && localStorage.getItem('number') == 1) {
      channel.postMessage('11122223333')
    } else {
      window.open('http://localhost:3000/music?name=guantong', 'music')
    }
  }
  return(
      <div>
        <div>这里是主页</div>
        <button onClick={handleJump1}>跳转到音乐页面,传递参数为guantong</button>
        <br/>
        <button onClick={handleJump2}>跳转到音乐页面,传递参数为11122223333</button>
      </div>

  )
}

