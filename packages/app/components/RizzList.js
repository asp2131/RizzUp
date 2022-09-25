import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Platform } from 'react-native';
import { UserContext } from "../../../apps/next/lib/UserContext";
import { ActivityIndicator } from 'react-native-web-hooks'
import faunadb, { query as q } from 'faunadb';
import PostList from './postList';

const client = new faunadb.Client({ secret: "fnAExLQW6XAASzu2nmTsQpv0D8Bu5Mf1P5byfoSH", domain: 'db.us.fauna.com' })

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    content: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    content: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    content: 'Third Item',
  },
];

const Item = ({ content }) => (
  <View style={styles.item}>
    <Text style={{color: "white", fontSize: 24}}>{content}</Text>
  </View>
);

const App = () => {
  const [data, setData] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    getUserRizz()
  }, [])

  const getUserRizz = async () => {
    fetchPosts(user.id);
  }

  const fetchPosts = async (id) => {
    let posts = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('posts_owner_by_user'), id)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    setData(posts.data)
  }

  const renderItem = ({ item }) => (
    <Item content={item.data.content} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {data ? <PostList list={data} /> : <ActivityIndicator size={"large"} color={"#fff"} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  content: {
    fontSize: 32,
  },
});

export default App;