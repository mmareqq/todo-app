function getNearestMultiple(num, multipleFactor) {
   const lowerMultiple = Math.floor(num / multipleFactor) * multipleFactor;
   const upperMultiple = lowerMultiple + multipleFactor;

   const distanceToLower = num - lowerMultiple;
   const distanceToUpper = upperMultiple - num;

   if (distanceToUpper < distanceToLower) return upperMultiple;
   else return lowerMultiple;
}

export default getNearestMultiple;
