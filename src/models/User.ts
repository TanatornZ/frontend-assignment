import { User } from "../Types/User";

export class UsersModel {
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  getAllDepartment() {
    let department = new Set(this.users.map((item) => item.company.department));
    return department;
  }

  getUserByDepartment(department: string) {
    let userInDepartment = this.users.filter(
      (user) => user.company.department === department
    );
    return userInDepartment;
  }
}
