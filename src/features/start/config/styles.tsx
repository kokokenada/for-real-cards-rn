import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width: null,
    height: null,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FF3366',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  forgotPasswordText: {
    color: 'powderblue',
    backgroundColor: 'transparent',
    textAlign: 'right',
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#D8D8D8'
  },
  startGamesIcon: {
    height: 50,
    width: 50,
  },
  startIconWrap: {
    paddingHorizontal: 7,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3366',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    justifyContent: 'center',
  },
  signupLinkText: {
    color: 'powderblue',
    marginLeft: 5,
  },
  welcomeTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    color: 'red'
  },
});