import React from 'react';

import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';

import './styles.css'

interface IProps {
  title: string,
  description?: string;

}
const PageHeader:React.FC<IProps> = ({
  title,
  children,
  description
}) => {
  return (
    <header className="page-header">
        <div className="top-bar-container">
          <Link to='/'>
            <img src={backIcon} alt="voltar"/>
          </Link>
          <h1 id="logo_text_header">Doctor</h1>
        </div>

        <div className="header-content">
          <strong>{title}</strong>
          { description && <p>{description}</p> }
          {children}
        </div>
    </header>
  );
}

export default PageHeader;