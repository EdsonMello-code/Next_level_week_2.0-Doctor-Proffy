import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Plus } from 'react-feather';

import logoImg from '../../assets/images/logo.svg';
import LandingImg from '../../assets/images/landingDark.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

import api from '../../services/api';

function Landing (){

  const [totalConnections, setTotalConnections] = useState(0); 

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data
      setTotalConnections(total);
    })
  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <h1 id="logo_text">Doctor</h1>
          <h2>A Plataforma para sua saúde.</h2>
        </div>
                  
        <img 
            src={LandingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />
        <div className="buttons-container">
        <Link to='/study' className="study">
          <Plus size={24} style={{ marginRight: '2.4rem' }} />
          Paciente
        </Link>

        <Link to='/give-classes' className="give-classes">
          <img src={giveClassesIcon} alt="Dar aula"/>
          Médico
        </Link>
      </div>

      <span className="total-connections">
        Total de {totalConnections} conexões já realizadas
        <img src={purpleHeartIcon} alt="Coração roxo"/>
      </span>
    </div>
  </div>
  )
}

export default Landing;