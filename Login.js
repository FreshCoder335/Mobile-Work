import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";


const sendText = async (phoneNumber) => {
  
  //https://dev.stedi.me/twofactorlogin/208-220-2244
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/text'
    }
  });
  const loginResponseText = await loginResponse.text();//converts promise to string using await
  console.log('Login Response', loginResponseText);
};

const getToken = async({phoneNumber, verificationCode, setUserLoggedIn, setUserName}) => {
  console.log("PhoneNumber", phoneNumber);
  console.log("VerificationCode", verificationCode);
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin', {
    method: 'POST',
    body:JSON.stringify({oneTimePassword:verificationCode, phoneNumber}),
    headers: {
      'content-Type': 'application/json'
    },
  });
  const responseCode = tokenResponse.status;
  console.log("Phone Number", phoneNumber);
  console.log("Verification Code", verificationCode);
  console.log("Response Status Code", responseCode);
  if(responseCode==200){
    setUserLoggedIn(true);
  }
  const token = await tokenResponse.text();
  console.log(token)
  const emailResponse = await fetch("https://dev.stedi.me/validate/"+token)
  const textEmail = await emailResponse.text()
  setUserName(textEmail)
  console.log("User Email", textEmail)

}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const [count, setCount] = useState(0);
  
  

  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder='Enter Phone Number'
      />
      <TextInput
        style={styles.input}
        onChangeText={setVerificationCode}
        value={verificationCode}
        placeholder="Enter Verification Code"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text style = {styles.text}>Send Text</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{
          getToken({phoneNumber, verificationCode, setUserLoggedIn:props.setUserLoggedIn, setUserName:props.setUserName});
        }}
      >
        <Text style = {styles.text}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
    marginTop:100
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default Login;