import React from 'react';

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Calendar } from './styles';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
 const { signOut, user } = useAuth();

 return (
  <Container>
   <Header>
    <HeaderContent>
     <img src={logoImg} alt="GoBarber" />
     <Profile>
      <img src={user.avatar_url} alt={user.name} />
      <div>
       <span>Bem-vindo.</span>
       <strong>{user.name}</strong>
      </div>
     </Profile>

     <button type="button" onClick={signOut}>
      <FiPower />
     </button>
    </HeaderContent>
   </Header>
   <Content>
    <Schedule>
     <h1>Horários agendados</h1>
     <p>
      <span>Hoje</span>
      <span>Dia 06</span>
      <span>Segunda-feira</span>
     </p>

     <NextAppointment>
      <strong>Atendimento a seguir</strong>
      <div>
       <img
        src="https://avatars1.githubusercontent.com/u/20804322?s=460&u=c46a6c83796cd6fb124fbe39dddfadfff5d08388&v=4"
        alt="Aran Leite"
       />

       <strong>Aran Leite</strong>
       <span>
        <FiClock />
        08:00
       </span>
      </div>
     </NextAppointment>
    </Schedule>
    <Calendar />
   </Content>
  </Container>
 );
};

export default Dashboard;
