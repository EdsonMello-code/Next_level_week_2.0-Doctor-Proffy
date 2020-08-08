import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#011627',
    
  },

  toBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40,
  },

  logoText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 25
  }
});

export default styles;