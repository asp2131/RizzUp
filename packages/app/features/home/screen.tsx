// @ts-nocheck
import { Text, useSx, View, H1, P, Row, Box } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti';
import { MotiPressable } from 'moti/interactions';
import { MotiView, MotiText } from 'moti'
import { useEffect, useState, useMemo, useContext } from 'react'
import { Dimensions, Platform } from 'react-native'
import axios from 'axios';
import RizzList from '../../components/RizzList'
import { FloatingAction } from "react-native-floating-action";
import LikeButton from "../../components/likeButton";
import faunadb, { query as q } from 'faunadb';
import { UserContext } from '../../../../apps/next/lib/UserContext';
import Posts from '../../components/postList'
const client = new faunadb.Client({ secret: "fnAExLQW6XAASzu2nmTsQpv0D8Bu5Mf1P5byfoSH", domain: 'db.us.fauna.com' })

export function HomeScreen() {
  const sx = useSx()
  const [text, setText] = useState("")
  const [isClick, setClick] = useState(false);
  const [data, setData] = useState([]);
  const [width, setWindowWidth] = useState(Dimensions.get('window').width)
  const [user] = useContext(UserContext);
  

  useEffect(() => {
    console.log(user)
    fetchPosts();
    
    const randomPosted = Math.floor(Math.random() * data.length);
    if (data.length) {
      setText(data[randomPosted].data.content)
    }
    let url = "https://getpickuplines.herokuapp.com/lines/random"
    Platform.OS === "web" ? url = "https://corsmirror.onrender.com/v1/cors?url=" + url : null;
    axios.get(url)
      .then((response) => {
        setText(response.data.line)
      })
  }, [])

  const fetchPosts = async () => {
    let posts = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("Post"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    setData(posts.data)
  }

  const randomRizz = () => {
    const random = Math.floor(Math.random() * 10);
    const randomPosted = Math.floor(Math.random() * data.length);
    let url;
    random > 5 ?
      url = "https://getpickuplines.herokuapp.com/lines/random" :
      url = "https://complimentr.com/api";
    Platform.OS === "web" ? url = "https://corsmirror.onrender.com/v1/cors?url=" + url : null;
    axios.get(url).then((response) => {
      if (response.data.compliment) {
        setText(data[randomPosted].data.content)
        return;
      }
      setText(response.data.line)
    })

  }

  return (
    <View
      sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', p: 16, backgroundColor: "#5634CB", paddingLeft: width > 1000 ? 150 : "none" }}
    >
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: 4,
          // when false, animation goes 0 -> 1, then starts over back at 0
          repeatReverse: false,
        }}
      >
        {/* <H1 sx={{ fontWeight: '800', color: "white" }}>RizzUp</H1> */}
      </MotiView>
      <View sx={{ maxWidth: 600 }}>
        {/* <P sx={{ textAlign: 'center', color: "white" }}>
          {text}
        </P> */}
        {/* <View sx={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'blue' }}> */}
        <MotiPressable
          style={{padding: 20}}
          animate={useMemo(
            () => ({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
              }
            },
            []
          )}
          // onPress={randomRizz} 
          containerStyle={{ justifyContent: 'center', alignItems: "center" }} >
          <Text
            selectable={false}
            sx={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}
          >
            Random Rizz
          </Text>
        </MotiPressable>
        {/* </View> */}
      </View>
      <View sx={{
        height: 32, position: 'absolute',
        bottom: 0,
        left: 0,
      }} />
      {Platform.OS !== "web" ? <FloatingAction
        overlayColor={"transparent"}
        onPressMain={() => {
          console.log(`selected button`);
        }}
      /> : null}
      <Box>
        <Posts list={data} />
      </Box>
    </View>
  )
}
