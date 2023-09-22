export const roundToNearestN = (number: number, numberToRoundTo: number): number => {
  return Math.round(number / numberToRoundTo) * numberToRoundTo;
};

export const randomIntFromInterval = (min: number, max: number): number => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomArrayElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const seededRandomIntFromInterval = (seed: string, min: number, max: number): number => { // min and max included
  // TODO: Seeding isn't working for whichever reason, it's disabled for now. Fix when you have the nerve for it.
  // const seededRandom = prngAlgorithm(seed);
  // const advancedSeededFunction = advancePrngState(seededRandom, 10);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const seededRandomArrayElement = <T>(seed: string, array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const isFloat = (number: number): boolean => {
  return !Number.isInteger(number) && !Number.isNaN(number);
};

export const partialArraySum = (array: number[], index: number): number => {
  const sum: number = array.filter((e, i) => i < index)
    .reduce((a, b) => a + b, 0);
  return isFloat(sum) ? Number(sum.toFixed(2)) : sum;
};

// TODO: Properly type this
export const arrayTupleToObject = <K = (string | number | symbol)[], V = any[]>(array1: K, array2: V): Record<string, any> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.fromEntries(array1.map((key, index) => [key, array2[index]]));
};

export const snakeToCamelCase = (string: string): string => {
  return string.split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();
};

export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const remainingMinutes = time % 3600;
  const minutes = Math.floor(remainingMinutes / 60);
  const remainingSeconds = Math.floor(remainingMinutes % 60);
  return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}:${remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`}`;
};

export const formatRemainingTime = (endTime: number): string => {
  const now = Date.now() / 1000;
  const difference = endTime - now;
  return formatTime(difference);
};

export const debounce = (callback: () => void, duration: number = 300) => {
  let timer: NodeJS.Timeout;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, duration);
  };
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

export const clamp = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

export const chunk = <T, >(array: T[], size: number): T[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};