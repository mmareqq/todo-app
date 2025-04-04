export function animateExit(cb, ref, animationTime = 250) {
   ref.current.classList.add('exit-animation');
   setTimeout(cb, animationTime);
}
