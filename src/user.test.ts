import { expect, test} from '@jest/globals';
const {DepartmentModel} = require('../src/models/Department')
const {mockData} = require('../src/mockUser')

test("check gender", () => {
  const user = new DepartmentModel(mockData)
  expect(user.getGender()).toStrictEqual({"female": 2, "male": 0});
});


test("check age range", () => {
  const user = new DepartmentModel(mockData)
  expect(user.getAgeRange()).toStrictEqual('27-31');
});

test("check address", () => {
  const user = new DepartmentModel(mockData)
  expect(user.getAddressUser()).toStrictEqual({"AvaTaylor": "24771", "IsabellaAnderson": "89352"});
});

test("check hair", () => {
  const user = new DepartmentModel(mockData)
  expect(user.getHairColor()).toStrictEqual({"Blonde": 1, "Red": 1});
});

