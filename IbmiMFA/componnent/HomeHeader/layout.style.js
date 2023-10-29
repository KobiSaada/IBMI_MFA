import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
    },
    backgroundImage: {
      position: 'absolute',
      width: 360,
      height:817,
      top:-90,
      zIndex: -1, 
      
    },
    smallImage: {
      
      width: 100,
      height: 100,
      alignSelf: 'center',
      top:122,
      
      right: 2,
    },
    text: {
        color: 'black', // Set the text color to black
        fontSize: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute', // Use position to control text placement
        top:170,
      },
  
    footerImage: {
      position: 'absolute',
      width:'100%',
      height:80,
      
     
      top: 0,
    
    },
  });
  export default styles;