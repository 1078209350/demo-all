import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

//定义组件
export const Music = ()=>{
  // 广播
  const channel = new BroadcastChannel('music')

  let history = useHistory();
  const [name, setName] = useState('')
  useEffect(()=>{

    if (localStorage.getItem('number') && localStorage.getItem('number') == 1) {
      channel.addEventListener('message', (e)=>{
        setName(e.data)
      })
    }else {
      const a = new URLSearchParams(history.location.search)
      setName(a.get('name'))
    }

    localStorage.setItem('number', 1)
  },[])


  return(
      <div>
        <div>这里是音乐页面</div>
        <p>上个页面传递过来的name参数为{name}</p>
      </div>
  )
}

