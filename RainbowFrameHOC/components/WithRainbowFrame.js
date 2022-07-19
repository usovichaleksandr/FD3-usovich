import React from 'react';


const withRainbowFrame = colors => Comp => props =>{
  
  let frames = <Comp {...props}/>;
    for (let color of colors){
      frames=<div style={{border: 'solid 2px '+color}}>{frames}</div>
    }return frames;
};

export { withRainbowFrame };
