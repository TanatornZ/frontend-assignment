import { IUserSummary } from "../types/User";

export const DepartmentList = (department: { department: IUserSummary }) => {
    return (
      <div className="p-4 bg-blue-100 rounded-xl">
        <pre className="">{JSON.stringify(department.department, null, 2)}</pre>
      </div>
    );
  };
  
