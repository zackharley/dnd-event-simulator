import { dice } from './dice.js';

const d8 = dice('1d8');

const events = [
  {
    name: 'Sky Conditions',
    repeats: 'daily',
    startDate: null,
    outcomes: () => [
      {
        name: 'Clear/Sunny',
        probability: 1 / 3,
      },
      {
        name: 'Partly Cloudy/Partly Sunny',
        probability: 1 / 3,
      },
      {
        name: 'Cloudy',
        probability: 1 / 3,
      },
    ],
  },
  {
    name: 'Precipitation',
    repeats: 'daily',
    startDate: null,
    reliesOn: ['Sky Conditions'],
    outcomes: () => [
      {
        name: 'None',
        probability: 0.5,
      },
      {
        name: 'Minor precipitation',
        probability: 0.2,
      },
      {
        name: 'Major precipitation',
        probability: 0.2,
      },
      {
        name: 'Extreme precipitation',
        probability: 0.1,
      },
    ],
  },
  {
    name: 'Market Day',
    repeats: 'tendaily',
    outcomes: () => [
      {
        name: 'Market Day',
        sideEffects: [`Del Nailo receives ${d8()}gp`],
        probability: 1,
      },
    ],
  },
];

export default events;
