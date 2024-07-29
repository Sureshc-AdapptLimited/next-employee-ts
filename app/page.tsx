import Link from 'next/link';
import EmployeePage from "./components/EmployeePage";
import EmployeeModels from "./components/employees/EmployeeModels";

export default function Home() {
  return (
    <div className="container mx-auto">
     <Link href="/employees" className="text-blue-500 hover:text-blue-700">
        Go to Employee Page
      </Link>
      {/* <EmployeePage /> */}
      {/* <EmployeeModels></EmployeeModels> */}
    </div>
  );
}
