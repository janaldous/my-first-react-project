import * as React from "react";

export const useKeyPress = (targetKey, callback: () => void) => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = React.useState(false);
  
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
        callback && callback();
      }
    }
  
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
  
    // Add event listeners
    React.useEffect(() => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return keyPressed;
  }