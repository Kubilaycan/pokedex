import hoverSound from '../../public/audio/card-hover.wav';
import selectSound from '../../public/audio/select.wav';

const hoverAudio = new Audio(hoverSound);
hoverAudio.volume = 0.2;
const selectAudio = new Audio(selectSound);

function playHoverAudio(): void {
    hoverAudio.currentTime = 0;
    hoverAudio.play();
}

function playSelectAudio(): void {
    selectAudio.currentTime = 0;
    selectAudio.play();
}

export default { playHoverAudio, playSelectAudio }