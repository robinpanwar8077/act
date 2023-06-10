import { Link } from 'react-router-dom'
import React from "react";

export default function Header(props) {
  return (
    <header className="common-header">
      <div className="col">
        <Link to={props.path}>
          {props.back}
        </Link>
        <a href={props.link}>
        {props.icon}
        </a>
      </div>
      <div className="col expand">
        <h2>{props.heading}</h2>
      </div>
      <div className="col right">
        {props.Icontwo}
      </div>
      
    </header>
  );
}