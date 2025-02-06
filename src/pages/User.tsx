import { useEffect, useState } from "react";
import { IUserResponse } from "../Types/User";
import { UsersModel } from "../models/User";
import { DepartmentModel } from "../models/Department";

function UserPage() {
  const [userModel, setUserModel] = useState<UsersModel>(null!);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data: IUserResponse) => {
        setUserModel(new UsersModel(data.users));
      });
  }, []);

  if (userModel) {
    let users = userModel.getUserByDepartment("Engineering");
    console.log("dapartment ", userModel && userModel.getAllDepartment());
    console.log("users :>> ", users);

    const Engineering = new DepartmentModel(users, "Engineering");
  }

  return (
    <div className="bg-indigo-50 w-screen h-screen overflow-x-hidden min-w-xs relative">
      <div className="max-w-5xl mx-auto p-4 md:p-6 md:px-10">
        <h1 className="text-2xl font-bold  text-indigo-900 text-center">
          User
        </h1>
        <div className="w-full h-full">
          {!userModel ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 loader"></div>
          ) : (
            <div className="p-4 bg-blue-100 rounded-xl">
              <pre className="">
                {JSON.stringify(
                  {
                    Engineering: {
                      male: 2,
                      female: 2,
                      ageRange: "26-40",
                      hair: {
                        Brown: 1,
                        White: 1,
                        Red: 1,
                        Gray: 1,
                      },
                      addressUser: {
                        EmilyJohnson: "29112",
                        AlexanderJones: "86684",
                        NoahHernandez: "73696",
                        MadisonCollins: "62091",
                      },
                    },
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
