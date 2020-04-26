import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => {
 return (
  <Container>
   <Toast hasDescription>
    <FiAlertCircle size={20} />
    <div>
     <strong>Aconteceu um erro</strong>
     <p>Não foi possível fazer login na aplicação</p>
    </div>

    <button type="button">
     <FiXCircle size={18}></FiXCircle>
    </button>
   </Toast>
   <Toast type="success">
    <FiAlertCircle size={20} />
    <div>
     <strong>Aconteceu um erro</strong>
    </div>

    <button type="button">
     <FiXCircle size={18}></FiXCircle>
    </button>
   </Toast>
   <Toast type="error" hasDescription>
    <FiAlertCircle size={20} />
    <div>
     <strong>Aconteceu um erro</strong>
     <p>Não foi possível fazer login na aplicação</p>
    </div>

    <button type="button">
     <FiXCircle size={18}></FiXCircle>
    </button>
   </Toast>
  </Container>
 );
};

export default ToastContainer;
