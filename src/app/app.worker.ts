// src/app/app.worker.ts
/// <reference lib="webworker" />
import { DataElement } from './models/data-element.model';

let timerInterval = 1000; // Default value in ms
let incomeDataSize = 10;
let intervalObject:any;
let uniqueId = 0;
let restartParam = false;

addEventListener('message', ({ data }) => {
  if (data.type === 'updateInterval') {
    timerInterval = Number(data.value);
    startPseudoSocket();
    restartParam = true;
  } else if(data.type === 'updateArraySize'){
    restartParam = true;
    incomeDataSize = Number(data.value);
  }
});

function generateMockDataArray() {
  const generateMockDataElement = () => {
    const randomId = (): number => uniqueId++;
    const randomInt = (): number => Math.floor(Math.random() * 100);
    const randomFloat = (): number => parseFloat((Math.random() * 100).toFixed(18));
    const randomColor = (): string => {
      const color = Math.floor(Math.random() * 16777215).toString(16);
      return `#${color.padStart(6, '0')}`;
    };
    postMessage({
      id: uniqueId,
      int: randomInt(),
      float: randomFloat(),
      color: randomColor(),
      child: Array.from({ length: Math.floor(Math.random() * 5) }, () => ({
        id: randomId(),
        color: randomColor(),
      })),
    });
  };
  for(let key = 0; key< incomeDataSize; key++){
    if(restartParam){
      restartParam = false;
      break;
    }
    generateMockDataElement();
  }
}


// This function acts as the "pseudo-socket", periodically generating and posting data
const startPseudoSocket = () => {
  if(intervalObject){
    clearInterval(intervalObject);
  }
  intervalObject = setInterval(() => {
    generateMockDataArray();
  }, timerInterval);
};
startPseudoSocket();
