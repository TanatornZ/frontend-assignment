import { User } from "../Types/User";

export class DepartmentModel {
  users: User[];
  department: string;

  constructor(users: User[] , department: string) {
    this.users = users;
    this.department = department
  }

  getGender() {
    let male = 0;
    let female = 0;

    this.users.forEach((user) => {
      if (user.gender === "male") {
        male++;
      } else if (user.gender === "female") {
        female++;
      }
    });

    return  { male, female }
  }

  getHairColor() {
    const hair: { [key: string]: number } = {};
    this.users.forEach((user) => {
      if (hair.hasOwnProperty(user.hair.color)) {
        hair[user.hair.color]++;
      } else {
        hair[user.hair.color] = 1;
      }
    });
    return hair;
  }

  getAgeRange() {
    let allAge = this.users.map((item) => item.age);
    const minAge = Math.min(...allAge);
    const maxAge = Math.max(...allAge);
    return `${minAge}-${maxAge}`
  }

  getAddressUser() {
    const addressUser: { [key: string]: string } = {};
    this.users.forEach((user) => {
      let userName = `${user.firstName}${user.lastName}`;
      addressUser[userName] = user.address.postalCode;
    });
    return addressUser;
  }

  getSamaryUser() {
    const gender = this.getGender()
    const ageRange = this.getAgeRange()
    const hair = this.getHairColor()
    const addressUser = this.getAddressUser()

    return { [this.department] : {...gender, ageRange , hair , addressUser}}
  }
}
