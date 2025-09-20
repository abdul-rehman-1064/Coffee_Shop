import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const SaveNewData = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const saveData = async()=>{
        const url = "http://192.168.1.9:3000/user"
        let result = await fetch(url,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({name ,age , email})
        })
        setName("");
        setAge("")
        setEmail("")
    }
  return (
    <View style={styles.main}>
      <Text>SaveNewData</Text>
      <TextInput  style={styles.input} placeholder='Enter Name' onChangeText={(text)=> setName(text)}/>
        <Text>{name}</Text>
      <TextInput  style={styles.input} placeholder='Enter Age' onChangeText={(text)=> setAge(text)}/>
      <TextInput  style={styles.input} placeholder='Enter Email' onChangeText={(text)=> setEmail (text)}/>
      <Button title='Save Data' onPress={saveData} />
    </View>
  )
}

export default SaveNewData

const styles = StyleSheet.create({
    main:{
        marginTop:12,
    }
    ,
    input:{
        margin:20,
        borderWidth:2,
        borderColor:"skyblue"

    }
})