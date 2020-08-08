import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
// redirecinar para outro canto após uma ação

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import waningIcon from '../../assets/images/icons/warning.svg'

import api from '../../services/api';

import './styles.css';

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhasapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [ scheduleItems, setScheduleItems ] = useState([
    { week_day: 0, from: '', to: '' }
  ]);
  
  
  function addScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
    console.log('teste')
  } 

  function setScheduleItemsValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {...scheduleItem, [field]: value};
      }

      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,      
    })
      .then(response => {
        console.log(response.data)
        history.push('/successPage');
      })
      .catch(err => alert('Erro no cadastro!'));

    console.log({
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      scheduleItems,
    }) 
  }
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrivel que você que cuidar da nossa saúde."
        description="O primeiro passo, é preencher esse
        formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input 
              name="name" 
              label="Nome completo" 
              value={name}
              onChange={event => setName(event.target.value)}
            />

            <Input 
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={event => setAvatar(event.target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={event => setWhasapp(event.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={event => setBio(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a consulta</legend>
            
            <Select 
              name="subject"
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
            <Input 
              name="cost"
              label="Custo da sua hora por consulta"
              value={cost}
              onChange={event => setCost(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addScheduleItem}>
                + Novo horário
              </button>
              </legend>
              
          {scheduleItems.map((scheduleItem, index) => {
            return (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={event => setScheduleItemsValue(index, 'week_day', event.target.value)}
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
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={event => setScheduleItemsValue(index, 'from', event.target.value)}
                />

                <Input 
                  name="to"
                  label="até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={event => setScheduleItemsValue(index, 'to', event.target.value)}
                />
              </div>
            )
          })}
          </fieldset>

          <footer>
            <p>
              <img src={waningIcon} alt="Aviso importante"/>
              Importante! <br />
              Prencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>  
      </main>
    </div>

  );
}

export default TeacherForm;