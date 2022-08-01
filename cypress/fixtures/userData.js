import { faker } from '@faker-js/faker';

export const userData = {
  randomVacationDay: faker.datatype.number({
    min: 1,
    max: 20
  }),
  randomDatePickFirstHalf: faker.datatype.number({
    min: 0,
    max: 3
  }),
  randomDatePickSecondHalf: faker.datatype.number({
    min: 4,
    max: 6
  }),
  randomDate: `${faker.datatype.number({
    min: 1,
    max: 31
  })} ${faker.date.month().substring(0, 3)} ${faker.datatype.number({
    min: 1993,
    max: 2022
  })}`,
  randomText: faker.lorem.sentence()
};
