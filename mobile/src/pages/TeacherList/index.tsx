import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

function TeacherList() {
  const [warning, setWarning] = useState<String>();
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  const [subject, setSubject] = useState(''); 
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorite() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        });

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorite();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });
    setIsFiltersVisible(false)
    setTeachers(response.data);
    if (response.data.length > 0) {
      setWarning(null);
  } else {
    setWarning('Não há médicos com essas características')
  }
  console.log(warning)
  }

  useEffect(() => {
    setWarning('Pesquise por médico');
  }, [])


  return (
        <View style={styles.container}>
          <PageHeader 
            title="Doctors disponíveis"
            headerRight={(
              <BorderlessButton onPress={handleToggleFiltersVisible}>
                <Feather name="filter" size={20} color="#FFF" />
              </BorderlessButton>
            )}
          >
            { isFiltersVisible &&  (
              <View style={styles.searchForm}>
                <Text style={styles.label}>Área</Text>
                <TextInput 
                  style={styles.input}
                  value={subject}
                  onChangeText={text => setSubject(text)}
                  placeholder="Área de especialização?"
                  placeholderTextColor="#c1bccc"
                />
              
              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput 
                    style={styles.input}
                    value={week_day}
                    onChangeText={text => setWeekDay(text)}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#c1bccc"
                  />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput 
                    style={styles.input}
                    value={time}
                    onChangeText={text => setTime(text)}
                    placeholder="Qual Horario?"
                    placeholderTextColor="#c1bccc"
                  />
                </View>
              </View>
              <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Filters</Text>
              </RectButton>
              </View>
            )}

          </PageHeader>

          <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 16,
            }}
          >
          {teachers.map((teacher: Teacher) => {
            return (
              <TeacherItem
                key={teacher.id}
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}
              />)
            })}
            {warning && <Text style={styles.warning}>{warning}</Text>}
          </ScrollView>
        </View>
  );
}

export default TeacherList;