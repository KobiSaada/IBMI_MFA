import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: 'rgb(250, 100, 0)',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 0,
    alignSelf: "center",
    height: 50,
    width: 270,
    top:600,
    marginBottom:40,
  
  },
  appButtonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default styles;
