import sound1 from '../assets/sounds/sound-1.wav';

export function playSound() {
   const sound = new Audio(sound1);
   sound.play();
}
