import React from 'react';
import { useHistory } from 'react-router-dom';
 
import SuccessIcon from '../../assets/images/icons/success-check-icon.svg'

import './styles.css';

const SuccessPage: React.FC = () => {
  const history = useHistory();

  function handleGoHome() {
    history.push('/');
  }
  return (
    <div id="container">
        <img src={SuccessIcon} alt="Sucesso"/>
        <h1>Consultoria cadastrada</h1>

        <span>Obrigado pela preferência.</span>

        <button onClick={handleGoHome}>Voltar para home</button>
    </div>  
  )
}

export default SuccessPage;