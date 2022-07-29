import { faker } from '@faker-js/faker';


export const userData = {
    randomDateDay: faker.datatype.number({
        'min': 1,
        'max': 31
    }),
    randomDateMonth: faker.date.month().substring(0, 3),
    randomDateYear: faker.datatype.number({
        'min': 1993,
        'max': 2022
    }),
    randomVacationDay: faker.datatype.number({
        "min": 1,
        "max": 20
    }),
    randomDatePickFirstHalf: faker.datatype.number({
        "min": 0,
        "max": 3
    }),
    randomDatePickSecondHalf: faker.datatype.number({
        "min": 4,
        "max": 6
    }),
    randomText: faker.lorem.sentence()
};