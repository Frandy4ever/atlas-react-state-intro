import logo from "../assets/logo.png";
import ClassSchedule from "./ClassSchedule";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
    </div>
  );
}
