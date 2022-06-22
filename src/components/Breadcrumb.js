import { NavLink } from "react-router-dom";

function Breadcrumb({ thumbs }) {
  return(<div className="breadcrumbs">
    <ul className="items">
      <li className="item">
        <NavLink to="/">Home</NavLink>
      </li>
      {thumbs.map((item, idx) => <li key={idx} className="item">{item}</li>)}
    </ul>
  </div>)
}

export default Breadcrumb;