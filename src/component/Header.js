import Button from "./Button";
import { useLocation } from "react-router-dom";
const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()
    return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (<Button
        color={showAdd ? "cadetblue" : "#133743"}
        text={showAdd ? "Add" : "Close"}
        onClick={onAdd}
      />)}
    </header>
  );
};
Header.defaultProps = {
  title: "Task Tracker",
};
export default Header;
