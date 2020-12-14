import React, {useState, useEffect} from 'react'
import{
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Switch,
  FlatList,
  Alert,
  ActivityIndicator
}from 'react-native'
import Header from '../component/Header';
import Color from '../Constant/Color';
import {borderRadius} from '../Constant/Constant';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Job from '../component/Job.cell';
import get_job_list from '../fetchCollection/get_job_list';
const Home = ({navigation}) => {
  const [fetchMore, setFetchMore] = useState(false)
  const [onEnd, setOnEnd] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [dataJobs, setDataJobs] = useState([])
  const [search, setSearch] = useState("")
  const [isFilter, setFilter] = useState(false)
  const [isFullTime, setFullTime] = useState(false)
  const [location, setLocation] = useState("")
  useEffect(()=>{
    get_job_list({
      page:currentPage,
    }).then(({data})=>{
      setDataJobs(data)
    }).catch((e)=>{

    })
  },[get_job_list,setDataJobs])
  useEffect(()=>{
    let timer = setTimeout(()=>{
      if(fetchMore){
        get_job_list({
          page: fetchMore ? (currentPage + 1) : currentPage,
        }).then(({data})=>{
          if(data.length > 0){
            setDataJobs([...dataJobs, ...data])
            setCurrentPage(state=>state+1)
            setFetchMore(false)
          } else {
            setOnEnd(true)
            setFetchMore(false)
          }
        }).catch((e)=>{
          fetchMore(false)
        })
      }
    },1000)
    return ()=> clearTimeout(timer)
  },[get_job_list, setDataJobs, fetchMore, search, isFullTime, location])

  return(
    <Header title={"Job List"}>
      <>
        <View style={{flex: 0, backgroundColor: Color.color_one_500, flexDirection: 'row',
                    height: 50, paddingVertical: 6, paddingHorizontal: 12}}>
          <TextInput style={{backgroundColor: Color.color_0, borderRadius: borderRadius, flex: 1}}
                     placeholder={"Cari sebuah pekerjaan"}
                     onChangeText={(value)=>setSearch(value)}/>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginLeft: 12}}
                            onPress={()=>setFilter(!isFilter)}>
            <MaterialCommunity name={isFilter ? "chevron-up" : 'chevron-down'}
                               size={32}
                               color={Color.color_0}/>
          </TouchableOpacity>
        </View>
        {
          isFilter &&
          <View style={{flex: 0, backgroundColor: Color.color_one_500, paddingVertical: 6, paddingHorizontal: 12}}>
            <View style={{borderRadius: borderRadius, backgroundColor: Color.color_0, padding: 6}}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                <Text style={{flex: 1}}>
                  Full time
                </Text>
                <View style={{flex: 3, alignItems: 'flex-end'}}>
                  <Switch onValueChange={()=>setFullTime(e=>!e)}
                          value={isFullTime}/>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                <Text style={{flex: 1}}>
                  Location
                </Text>
                <View style={{flex: 3}}>
                  <TextInput onChangeText={(e)=>setLocation(e)}
                             value={location}
                             style={{borderWidth: 1, borderRadius: borderRadius, padding: 4}}/>
                </View>
              </View>
              <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: Color.color_one_500,
                paddingVertical: 12,borderRadius: borderRadius}}>
                <Text style={{color: Color.color_0, fontWeight: 'bold'}}>
                  Apply Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        <FlatList data={dataJobs}
                  style={{marginTop: 12}}
                  renderItem={(value)=>{
                    const {item} = value || {}
                    const {id, company_logo, title, company, location} = item || {}
                    return(
                      <Job key={id}
                           imageLink={company_logo}
                           title={title}
                           company={company}
                           location={location}
                           onPress={()=>navigation.push("Detail",id)}/>
                    )
                  }}
                  onEndReached={()=>{
                    if(!fetchMore && !onEnd){
                      setFetchMore(true)
                    }
                  }}
                  onEndReachedThreshold={0.25}
                  ListFooterComponent={()=>{
                    return(
                      fetchMore ?
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 12}}>
                          <ActivityIndicator size={"large"} color={"black"}/>
                        </View> : <></>
                    )
                  }}/>
      </>
    </Header>
  )
}
export default Home
// afk sebentar
