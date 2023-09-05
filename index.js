import { Calendar } from './calendar.js';
import events from './events.js';

const NUMBER_OF_DAYS_IN_A_TENDAY = 10;

const pp = (obj) => console.log(JSON.stringify(obj, null, 2));

const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

function shouldEventOccurToday(event, today) {
  if (event.startDate === today) {
    return true;
  }
  if (event.repeats === 'daily') {
    return true;
  }
  if (event.repeats === 'tendaily') {
    if (!event.startDate) {
      // occurs on the 1, 11, and 21
      return today.day % NUMBER_OF_DAYS_IN_A_TENDAY === 1;
    } else {
      const targetDayOfWeek =
        event.startDate.day % NUMBER_OF_DAYS_IN_A_TENDAY || 0;
      return today.day % NUMBER_OF_DAYS_IN_A_TENDAY === targetDayOfWeek;
    }
  }
  console.warn(
    `Skipping "${event.name}" as it doesn't occur on day "${today}".`,
  );
  return false;
}

function sum(nums) {
  return nums.reduce((prev, curr) => prev + curr, 0);
}

function validateEvents(events) {
  events.forEach((event) => {
    const totalProbability = sum(
      event.outcomes().map((outcome) => outcome.probability),
    );
    if (!approximatelyEqual(totalProbability, 1)) {
      throw new Error(
        `Probabilities for event "${event.name}" do not equal 1, instead ${totalProbability}`,
      );
    }
  });
}

function determineOutcome(event) {
  let prevMax;
  const ranges = event.outcomes().reduce((ranges, outcome) => {
    const min = prevMax || 0;
    const max = min + outcome.probability;
    prevMax = max;
    return [
      ...ranges,
      {
        ...outcome,
        min,
        max: max > 1 ? 1 : max,
      },
    ];
  }, []);
  const value = Math.random();
  const outcome = ranges.find(
    (range) => value <= range.max && value > range.min,
  );
  return {
    event: event.name,
    value: outcome.name,
    ...(outcome.sideEffects && { sideEffects: outcome.sideEffects }),
  };
}

class Simulator {
  constructor({ day, month, year }) {
    this.calendar = new Calendar(day, month, year);
  }

  simulateDay() {
    const date = this.calendar.today;
    validateEvents(events);
    const outcomes = events
      .filter((event) => shouldEventOccurToday(event, date))
      .map((event) => determineOutcome(event));
    pp({ date, outcomes });
    this.calendar.advanceDay();
  }
}

(function main() {
  const simulator = new Simulator({ day: 1, month: 'Shieldmeet', year: 1516 });
  simulator.simulateDay();
  simulator.simulateDay();
  simulator.simulateDay();
  simulator.simulateDay();
  simulator.simulateDay();
  simulator.simulateDay();
  simulator.simulateDay();
  simulator.simulateDay();
})();
