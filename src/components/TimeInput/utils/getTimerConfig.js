function getTimerConfig(numCount, fontSize, initialNum) {
   const numHeight = 3.75 * fontSize;
   const timerHeight = numHeight * numCount;
   return {
      numCount,
      fontSize,
      numHeight,
      timerHeight,
      minOffset: timerHeight * -1.5,
      maxOffset: timerHeight * -0.5,
      speedFactor: 2.5,
      initialNum,
      initialOffset: timerHeight * -1 + numHeight - initialNum * numHeight,
   };
}

export default getTimerConfig;
