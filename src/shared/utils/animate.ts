export const animateEl = (el: HTMLElement, animClassName: string) => {
   const animate = () => {
      el.classList.add(animClassName);
      el.addEventListener('animationend', removeAnimation);
   };

   // resets animation
   const removeAnimation = () => {
      el.classList.remove(animClassName);
      el.removeEventListener('animationend', removeAnimation);
   };

   animate();
};
