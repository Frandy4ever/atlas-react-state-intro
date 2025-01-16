import SchoolCatalog from "./components/SchoolCatalog";
import Header from "./components/Header";
import ClassSchedule from "./components/ClassSchedule";
import { EnrolledCoursesProvider } from "./customs/EnrolledCoursesContext";

export default function App() {
  return (
    <EnrolledCoursesProvider>
      <div>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </EnrolledCoursesProvider>
  );
}
