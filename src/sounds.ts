const soundFiles = {
  background: "sounds/bg_sound.mp3",
  beep: "sounds/beep.wav",
  laser: "sounds/laser.mp3",
  ping: "sounds/ping.wav",
  explosion: "sounds/explosion.wav",
};

const sounds: Record<string, HTMLAudioElement> = {};

interface SoundOptions {
  loop?: boolean;
  rethrow?: boolean;
  once?: boolean;
}

export const playSound = async (
  name: keyof typeof soundFiles,
  options: SoundOptions = { loop: false, rethrow: false, once: false },
) => {
  const file = soundFiles[name];
  let sound = new Audio(file);
  if (!options.once && sounds[name]) {
    sound = sounds[name];
  }
  sounds[name] = sound;
  sound.loop = !!options.loop;
  return sound.play().catch((e) => {
    if (options.rethrow) {
      throw e;
    }
  });
};
