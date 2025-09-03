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

export const transitionEl = (el: HTMLElement, transitionClassName: string) => {
   const transition = () => {
      el.classList.add(transitionClassName);
      el.addEventListener('transitionend', removeTransition);
   };

   // resets animation
   const removeTransition = () => {
      el.classList.remove(transitionClassName);
      el.removeEventListener('transitionend', removeTransition);
   };

   transition();
};
