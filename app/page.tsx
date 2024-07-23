import EmployeePage from "./components/EmployeePage";
import EmployeeModels from "./components/employees/EmployeeModels";

export default function Home() {
  return (
    <div className="container mx-auto">
      {/* <EmployeePage /> */}
      <EmployeeModels></EmployeeModels>
    </div>
  );
}
