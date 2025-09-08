const sound = {
  tracks: [
    {
      play: 'you-win',
      sound: 'assets/sound/you-win.mp3',
    },
    {
      play: 'pencil',
      sound: 'assets/sound/pencil.mp3',
    },
    {
      play: 'clear',
      sound: 'assets/sound/clear.mp3',
    },
    {
      play: 'cross',
      sound: 'assets/sound/cross.mp3',
    },
  ]
};

let soundEnabled = true;

document.addEventListener('DOMContentLoaded', () => {
  const soundIcon = document.querySelector('.sound__icon');
    const toggleSound = () => {
      soundEnabled = !soundEnabled;
      soundIcon.classList.toggle('muted', !soundEnabled);
    };
    soundIcon.addEventListener('click', toggleSound);
});

export const playSound = (event) => {
  if (!soundEnabled) {
    return;
  }
  const track = sound.tracks.find(track => track.play === event);
  const audio = new Audio(track.sound);
  audio.volume = event === 'clear' ? 1.0 : 0.5;
  audio.play();
}