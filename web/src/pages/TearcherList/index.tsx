import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';


const TearcherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [warning, setWarning] = useState('Pesquise um médico um médico');


  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();  

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });
    setTeachers(response.data)
    if (response.data.length > 0) {
      setWarning(null);
  } else {
    setWarning('Não há médicos com essas características')
    console.log('')
  }
  }


  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os Doctors disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>                    
        <Select 
            name="Specialization area"
            label="Área de especialização"
            value={subject}
            onChange={event => setSubject(event.target.value)}
            options={[
              { value: 'Urologia', label: 'Urologia'},
              { value: 'Psiquiatria', label: 'Psiquiatria'},
              { value: 'Oftalmologia', label: 'Oftalmologia'},
              { value: 'Pediatria', label: 'Pediatria'},
              { value: 'Anestesiologia', label: 'Anestesiologia'},
              { value: 'Ortopedia', label: 'Ortopedia'},
              { value: 'Ginecologia', label: 'Ginecologia'},
              { value: 'Dermatologia', label: 'Dermatologia'},
              { value: 'Cardiologia', label: 'Cardiologia'},
            ]}
          />

          <Select 
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={event => setWeek_day(event.target.value)}
            options={[
              { value: '0', label: 'Domingo'},
              { value: '1', label: 'Segunda-feira'},
              { value: '2', label: 'Terça-feira'},
              { value: '3', label: 'Quarta-feira'},
              { value: '4', label: 'Quinta-feira'},
              { value: '5', label: 'Sexta-feira'},
              { value: '6', label: 'Sabado'},
            ]}
          />
          
          <Input 
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={event => { setTime(event.target.value) }}
          />

          <button type="submit">
            Buscar 
          </button>
        </form>
      </PageHeader>
      <main>
          {warning && <h1>{warning}</h1>}
          {teachers && teachers.map((teacher: Teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher}/>
          })}
      </main>
    </div>
  );
}

export default TearcherList;