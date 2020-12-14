import React from 'react'
import PropTypes from 'prop-type'
import {borderRadius, borderWidth, DeviceWidth} from '../Constant/Constant';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const Job = (props) => {
  const {imageLink, title, company, location, key, onPress, type2, onPressLink} = props
  return(
    <View id={key}
          style={{marginBottom: 12, marginHorizontal: 12, padding: 6, flexDirection: 'row',
            borderWidth: borderWidth, borderRadius: borderRadius}}>
      <View style={{width: DeviceWidth * 0.2}}>
        <Image source={{uri: imageLink || null}}
               resizeMode="contain"
               style={{flex: 1}}/>
      </View>
      <View style={{flex: 1, marginLeft: 6}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {title}
        </Text>
        <Text numberOfLines={3} style={{color: 'gray'}}>
          {company}
        </Text>
        {
          !type2 ?
            <>
              <Text style={{color: 'gray'}}>
                {location}
              </Text>
            </>
            :
            <Text style={{color: "blue" , textDecorationLine: 'underline'}}
                  onPress={onPressLink}>
              {type2}
            </Text>
        }
      </View>
      {
        !type2 &&
        <TouchableOpacity style={{justifyContent: 'center'}}
                          onPress={onPress}>
          <MaterialCommunity name={"chevron-right"}
                             size={32}/>
        </TouchableOpacity>
      }
    </View>
  )
}
Job.propTypes = {
  imageLink: PropTypes.string,
  title: PropTypes.string,
  company: PropTypes.string,
  location: PropTypes.string,
  onPress: PropTypes.func,
  type2: PropTypes.string,
  onPressLink: PropTypes.func
}
export default Job
