import logo from './logo.svg';
import './App.css';
import { Bind } from 'lodash-decorators'

function App() {
    let timer = null;

    //防抖
    const debounce = () => {
        let timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(()=>{
                console.log(1111);
            }, 1000)
        }
    }

    //节流
    const throttle = () => {
        let timer = null;
        return function () {
            if(timer){
                return null;
            }
            timer = setTimeout(()=>{
                console.log(2222);
                timer = null;
            }, 2000)
        }
    }

    const test = ()=>{
        console.log("执行了")
    }

    const handleClick = (e)=>{
        console.log(e);
    }

  console.log(process.env)
  return (
    <>
      <div>
          <input type="text" onChange={throttle()} onClick={handleClick}/>
        哈哈哈哈哈呵呵呵呵
      </div>
    </>
  );
}

export default App;
