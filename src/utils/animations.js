export function animateExit(cb, ref, animationTime = 810) {
   ref.current.classList.add('exit-animation');
   setTimeout(cb, animationTime);
}
