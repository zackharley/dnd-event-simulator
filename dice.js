const PATTERN = /^(\d+)d(\d+)(?:\+(\d)+)?/;

export function dice(descriptor) {
  let [_, numDice, probability, add] = descriptor.match(PATTERN);
  numDice = parseInt(numDice);
  probability = parseInt(probability);
  add = parseInt(add);

  return () => {
    const rolls = Array.from(new Array(numDice), () => roll(probability));

    return add ? sum(rolls) + add : sum(rolls);
  };
}

function sum(nums) {
  return nums.reduce((sum, num) => sum + num, 0);
}

export function roll(probability) {
  const lowestNumberOnDie = 1;
  return Math.floor(
    Math.random() * (probability - lowestNumberOnDie) + lowestNumberOnDie,
  );
}
