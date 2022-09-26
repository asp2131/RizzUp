// import { HomeScreen } from 'app/features/home/screen'
// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react';
import {Platform} from 'react-native';
import { useSx } from 'dripsy';
import axios from 'axios';
import faunadb, { query as q } from 'faunadb';
import { UserContext } from '../lib/UserContext';
import Post from '../components/post';

const client = new faunadb.Client({ secret: "fnAExLQW6XAASzu2nmTsQpv0D8Bu5Mf1P5byfoSH", domain: 'db.us.fauna.com' })


const Home = () => {
    const sx = useSx()
    const [text, setText] = useState("")
    const [isClick, setClick] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
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

    return (
      <div style={{paddingTop: 120}} className='flex flex-col gap-10 videos h-full'>
        {data.length 
          ? data?.map((post, i) => (
            <Post post={post} isShowingOnHome key={`${i}`} />
          )) 
          : null}
      </div>
    );
  };

  export default Home;
