import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'

const GetData = () => {
    const [showData , setData] =useState();
    const getApiData =  async ()=>{
        const url = "http://192.168.1.9:3000/user";
        let data = await fetch(url);
        let result = await data.json()
        setData(result)
    }


    const deleteData  = async(id)=>{
      const url = "http://192.168.1.9:3000/user";
        let data = await fetch(`${url}/${id}`,{
          method:"Delete"
        });
        getApiData();
    }

    const updateData2= async(item)=>{
      const id = item.id
       const url = "http://192.168.1.9:3000/user";
      //  const Searchurl = "http://192.168.1.9:3000/user?q=${text}";
        let data = await fetch(`${url}/${id}`,{
          method:"put",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({name,age,email})
        });
        getApiData()
    }

    useEffect(()=>{
        getApiData();
    },[])
  return (
    <View style={styles.main}>
      <Text>Data Api </Text>
      <Text>{showData?.length}</Text>
      {
        showData?.length > 0? 
        showData.map((item,index)=> <View  style={styles.div} key={index}>
            <Text>{item.name} {" |"}</Text>
            <Text>{item.age}</Text>
            <Button  title='Update Data' onPress={()=>updateData(item)}/>
            <Button  title='Delete' onPress={()=>deleteData(item.id)}/>
        </View>)
        : <View> </View> 
      }
      
    </View>
  )
}

export default GetData

const styles = StyleSheet.create({
  div:{
    padding:12,
    backgroundColor:'white',
    borderColor:"green",
    borderWidth:1,
    marginBottom:10,
   flexDirection:"row",
   gap:12
  },
  main:{
    flex:1
  }
})