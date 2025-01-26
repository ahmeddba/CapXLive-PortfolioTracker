import NotFoundd from '../Animations/NotFound.json'
import Lottie from 'lottie-react'

const NotFound = () => {
    const displayAnimation = {width:'100%' , height:'450px' , display:'flex' , alignItems:'center', justifyContent:'center'}
  return (
    <div style={displayAnimation}>
        <Lottie
       animationData={NotFoundd}
       loop={true}
       autoPlay={true}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  )
}

export default NotFound
