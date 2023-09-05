const isLeapYear = (year) => year % 4 === 0;

// Using the calendar of Harptos (https://forgottenrealms.fandom.com/wiki/Calendar_of_Harptos)
const buildMonthConfigs = (year) => [
  {
    name: 'Hammer',
    numberOfDays: 30,
  },
  {
    name: 'Midwinter',
    numberOfDays: 1,
    dateFormat: (_day, month, year) => `${month}, ${year}`,
  },
  {
    name: 'Alturiak',
    numberOfDays: 30,
  },
  {
    name: 'Ches',
    numberOfDays: 30,
  },
  {
    name: 'Tarsakh',
    numberOfDays: 30,
  },
  {
    name: 'Greengrass',
    numberOfDays: 1,
    dateFormat: (_day, month, year) => `${month}, ${year}`,
  },
  {
    name: 'Mirtul',
    numberOfDays: 30,
  },
  {
    name: 'Kythorn',
    numberOfDays: 30,
  },
  {
    name: 'Flamerule',
    numberOfDays: 30,
  },
  {
    name: 'Midsummer',
    numberOfDays: 1,
    dateFormat: (_day, month, year) => `${month}, ${year}`,
  },
  ...(isLeapYear(year)
    ? [
        {
          name: 'Shieldmeet',
          numberOfDays: 1,
          dateFormat: (_day, month, year) => `${month}, ${year}`,
        },
      ]
    : []),
  {
    name: 'Eleasis',
    numberOfDays: 30,
  },
  {
    name: 'Eleint',
    numberOfDays: 30,
  },
  {
    name: 'Highharvestide',
    numberOfDays: 1,
    dateFormat: (_day, month, year) => `${month}, ${year}`,
  },
  {
    name: 'Marpenoth',
    numberOfDays: 30,
  },
  {
    name: 'Uktar',
    numberOfDays: 30,
  },
  {
    name: 'Feast of the Moon',
    numberOfDays: 1,
    dateFormat: (_day, month, year) => `${month}, ${year}`,
  },
  {
    name: 'Nightal',
    numberOfDays: 30,
  },
];

const defaultDateFormat = (day, month, year) => `${month} ${day}, ${year}`;

export class Calendar {
  constructor(day, month, year) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.setMonthConfigs();
  }

  setMonthConfigs() {
    this.monthConfigs = buildMonthConfigs(this.year);
  }

  get currentMonthConfig() {
    return this.monthConfigs.find(({ name }) => name === this.month);
  }

  advanceDay() {
    const currentMonthConfig = this.currentMonthConfig;
    if (this.day < currentMonthConfig.numberOfDays) {
      this.day += 1;
      return;
    }
    if (this.day === currentMonthConfig.numberOfDays) {
      this.#advanceMonth();
      return;
    }
  }

  #advanceMonth() {
    const currentMonthIndex = this.monthConfigs.findIndex(
      ({ name }) => name === this.month,
    );
    const nextMonthIndex = (currentMonthIndex + 1) % this.monthConfigs.length;
    const nextMonthConfig = this.monthConfigs[nextMonthIndex];
    this.day = 1;
    this.month = nextMonthConfig.name;
    if (nextMonthIndex === 0) {
      this.#advanceYear();
    }
  }

  #advanceYear() {
    this.year += 1;
    this.setMonthConfigs();
  }

  toString() {
    const { dateFormat = defaultDateFormat } = this.currentMonthConfig;
    return dateFormat(this.day, this.month, this.year);
  }

  get today() {
    return { day: this.day, month: this.month, year: this.year };
  }
}
