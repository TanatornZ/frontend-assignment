import { useEffect, useState } from "react";
import { IUserResponse, IUserSummary } from "../types/User";
import { UsersModel } from "../models/User";
import { DepartmentModel } from "../models/Department";
import { DepartmentList } from "../components/DepartmentItem";

function UserPage() {
  const [userModel, setUserModel] = useState<UsersModel>(null!);
  const [summaryUser, setSummaryUser] = useState<IUserSummary[]>(null!);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data: IUserResponse) => {
        setUserModel(new UsersModel(data.users));
      });
  }, []);

  useEffect(() => {
    if (userModel) {
      const allDepartment = userModel.getAllDepartment();

      allDepartment.forEach((item) => {
        let user = userModel.getUserByDepartment(item);

        let eachDepartment = new DepartmentModel(user, item);

        setSummaryUser((prev) => [
          ...(prev || []),
          eachDepartment.getSummaryUser(),
        ]);
      });
    }
  }, [userModel]);

  return (
    <div className="bg-indigo-50  max-w-screen  min-h-screen overflow-auto min-w-xs relative">
      <div className="max-w-5xl mx-auto p-4 md:p-6 md:px-10">
        <h1 className="text-2xl font-bold  text-indigo-900 text-center">
          User
        </h1>
        <div className="w-full h-full">
          {!userModel ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 loader"></div>
          ) : (
            <div className="space-y-2 mt-4 max-w-xl mx-auto">
              {summaryUser &&
                summaryUser.length > 0 &&
                summaryUser.map((user, index) => (
                  <DepartmentList department={user} key={`json ${index}`} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
