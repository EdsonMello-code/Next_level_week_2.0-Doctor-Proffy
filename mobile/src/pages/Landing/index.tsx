import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import styles from './styles';

import LandingImg from '../../assets/images/landing.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png';

function Landing() {
  const { navigate } = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    })
  })


  function handeleNavigationToToGiveClassesPage() {
    navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  return (
    <View style={styles.container}>
      <Image source={LandingImg} style={styles.banner}/>
      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que você é?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton 
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          {/* <Image source={studyIcon}/> */}
          <Feather name="plus" size={30} color="#FFF" />
          <Text style={styles.buttonText}>Paciente</Text>
        </RectButton>

        <RectButton 
            onPress={handeleNavigationToToGiveClassesPage}
            style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClassesIcon}/>
          <Text style={styles.buttonText}>Médico</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing;