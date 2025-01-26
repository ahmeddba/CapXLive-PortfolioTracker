import './HomePage.css';
import homeanimation from '../Animations/home.json';
import Lottie from 'lottie-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const HomePage = () => {
    const [index, setIndex] = useState(0);
    const promptText =
    "Take control of your financial future with our smart investment platform. Track, analyze, and optimize your stock portfolio effortlessly. Whether you're a seasoned investor or just starting out, our app provides the tools and insights you need to make confident decisions and maximize returns. Start building your path to wealth today!";
    const [typedText, setTypedText] = useState("");

    // Prompt appears in a "typing" effect
    useEffect(() => {
      let addChar;
      function tick() {
        setTypedText((prev) => prev + promptText[index]);
        // console.log(promptText[index.current], index.current);
        setIndex((prev) => prev + 1);
      }
      if (index < promptText.length) {
        addChar = setInterval(tick, 30);
      }
      return () => clearInterval(addChar);
    }, [typedText]);


  return (
    <div className="containerhome">
        <div className='desc'>
            <h1>
               <i className='titlee'><span className="titlespan">Empower</span> Your Investments, <span className="titlespan">Simplify</span> Your <span className="titlespan"> Success</span></i>
            </h1>
            <h3>
                {typedText}
            </h3>
        </div>
        <div className='animation'>
            <Lottie
              animationData={homeanimation}
              loop={true}
              style={{width:'100%' , height:'100%'}}
              />
        </div>
    </div>
  )
}

export default HomePage
