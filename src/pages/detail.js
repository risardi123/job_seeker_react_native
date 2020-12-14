import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  ScrollView,
  Alert,
  Linking, ActivityIndicator,
} from 'react-native';
import Header from '../component/Header';
import Job from '../component/Job.cell';
import Html from 'react-native-render-html'
import {borderRadius, borderWidth} from '../Constant/Constant';
import get_job_detail from '../fetchCollection/get_job_detail';
const LocalText = (props) => {
  const {title, description, htmlContent} = props
  return(
    <View style={{marginVertical: 16}}>
      <Text style={{marginBottom: 6, color: 'gray', fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
      {
        !htmlContent ?
          <Text style={{fontWeight: 'bold'}}>{description}</Text>
          :
          <Html source={{html: `${description}`}}/>
      }
    </View>
  )
}
const Detail = ({navigation, route}) => {
  const {params} = route
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  useEffect(()=>{
    if(params){
      get_job_detail(params).then((value)=>{
        setLoading(false)
        if(value.data){
          setData(value.data)
        }
      }).catch((e)=>{
        setLoading(false)
        Alert.alert("Failed",JSON.stringify(e, null, 2))
      })
    } else {
      setLoading(false)
    }
  },[get_job_detail])
  const {type, company_logo, company, location, company_url, title, description} = data || {}
  return(
    <Header title={"Job Detail"}
            onPressLeft={()=>navigation.goBack()}>
      {
        !loading ?
          <ScrollView style={{marginTop: 12}}>
            <Text style={{marginHorizontal: 12, marginBottom: 12, fontWeight: 'bold'}}>
              Company
            </Text>
            <Job title={company}
                 company={location}
                 type2={company_url}
                 onPressLink={()=>Linking.openURL(company_url)}
                 imageLink={company_logo}/>
            <View style={{marginBottom: 12, marginHorizontal: 12, padding: 6,
              borderWidth: borderWidth, borderRadius: borderRadius}}>
              <LocalText title={"Title"}
                         description={title}/>
              <LocalText title={"Full Time"}
                         description={type === "Full Time" ? "Yes" : "No"}/>
              <LocalText title={"Descriptions"}
                         htmlContent
                         description={description} />
            </View>
          </ScrollView>
          :
          <ActivityIndicator size={"large"} color={"black"}/>
      }
    </Header>
  )
}
export default Detail
