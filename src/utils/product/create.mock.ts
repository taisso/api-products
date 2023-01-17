import { faker } from "@faker-js/faker";

export const createProductMock = () => {
  return { name: faker.commerce.productName(), price: +faker.commerce.price() };
};

export const createProductWithIdMock = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: +faker.commerce.price(),
  };
};
