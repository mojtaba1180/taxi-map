import React from 'react';

const useMobileSize = () => {
     const [width, setWidth] = React.useState(window.innerWidth);
        React.useEffect(() => {
        function handleReSize(e) {
            setWidth(e.target.outerWidth)
        }
        window.addEventListener("resize", handleReSize)
        return () => {
            window.removeEventListener("resize", handleReSize)
        }
    }, [width])
  return {
    width,
    isMobile:() =>{
        if(width <= 420 ){
            return true
        }else{
            return false
        }
    }
  }
}

export default useMobileSize