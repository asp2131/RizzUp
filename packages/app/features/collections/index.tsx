// @ts-nocheck
import { Text, useSx, View, H1, P, Row, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti';
import { MotiPressable } from 'moti/interactions';
import { MotiView, MotiText } from 'moti'
import { useEffect, useState, useMemo } from 'react'
import { Dimensions, Platform, FlatList } from 'react-native'
import axios from 'axios';
import RizzList from '../../components/RizzList'
import LikeButton from "../../components/likeButton";

export default function HomeScreen() {
  const sx = useSx()
  const [text, setText] = useState("")
  const [isClick, setClick] = useState(false);
  const [width, setWindowWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {


    
  }, [])


  return (
    <View
      sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', p: 16, backgroundColor: "#5634CB", paddingLeft: width > 1000 ? 150 : "none" }}
    >
     <RizzList />
    </View>
  )
}
