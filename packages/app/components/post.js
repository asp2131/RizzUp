import React, {useContext, useEffect} from "react";
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import {Row, Text} from 'dripsy';
import moment from 'moment'
import { ArrowDown, ArrowUp, MessageSquare, Trash } from './icons/index'
import { UserContext } from "../../../apps/next/lib/UserContext";
import LikeButton from "./likeButton";
import { Avatar } from "@material-ui/core";

const Post = ({post}) => {

    const { colors } = useTheme()
    const avatarUrl =
    "https://static01.nyt.com/images/2019/01/03/obituaries/03DRAGON1-print/03DRAGON1-thumbStandard.jpg";

    // const  [user] = useContext(UserContext)

    const deletePost = () => {
        console.log("deletePost")
    }

    const isUpVoted = () => {
        console.log("isUpVoted")
    }

    const isDownVoted = () => {
        console.log("isDownVoted")
    }

    const upVote = async () => {
       console.log("upVote")
    }

    const downVote = async () => {
        console.log("downvote")

    }

    const unVote = async () => {
        console.log("unVote")

    }

    return (
        <View
            style={[
                styles.container,
            ]}
        >
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.regularFont, { color: "white" }]}>{"category"} </Text>
                    <Text
                        className={"Gaegu"}
                        style={[styles.italicFont, { color: "white" }]}
                        onPress={() => console.log("author")}
                    >
                        {"Date"}
                    </Text>
                </View>
                <View style={styles.headerRight}>
                        <TouchableOpacity  activeOpacity={0.5} onPress={deletePost}>
                            <Trash color={"red"} width={20} height={20} />
                        </TouchableOpacity>
                </View>
            </View>
            <Avatar
                alt="Authenticated User"
                src={avatarUrl}
              />
            <Text
                id="Gaegu"
                style={[styles.title, { color: "white", }]}
                onPress={() => console.log("navigate to page details")}
            >
                {post.owner}
            </Text>
            <Text
                className={"Gaegu"}
                numberOfLines={ 10}
                style={[
                    styles.regularFont,
                    { color: "white" }]}
                    
                onPress={() =>
                    console.log("Postdetail")
                }
            >
                {post.content}
            </Text>
            <View style={styles.bottomContainer}>
            <Text style={[styles.commentText, { color: "#5634CB" }]}>{"commssssssssssssssssssssdddddddents"}</Text>
                <Text style={[styles.italicFont, { color: "#5634CB" }]}>93 views</Text>
                
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => console.log("postDetail")}
                >
                    <MessageSquare
                        color={"white"}
                        style={styles.commentIcon}
                        width={20}
                        height={20}
                        strokeWidth={3}
                    />
                </TouchableOpacity>
                <View style={{paddingLeft: 10}} />
                <View style={{marginBottom: 5}}>
                    <LikeButton />
                    </View>
            </View>
        </View>
    )
}

export default Post;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 7,
        marginBottom: 7,
        elevation: 1,
        borderWidth: 1,
        borderColor: "white"
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
        fontSize: 13,
        borderColor: "white"
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerRight: {},
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'baseline',
        marginTop: 12,
        fontFamily: "Gaegu"
    },
    centerAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 17,
        fontFamily: 'Gaegu'
    },
    score: {
        marginHorizontal: 5,
        fontFamily: 'Gaegu'
    },
    commentIcon: {
        marginBottom: -3
    },
    commentText: {
        marginLeft: 3,
        fontFamily: 'Gaegu'
    },
    regularFont: {
        fontFamily: 'Gaegu',
        fontSize: 17
    },
    italicFont: {
        fontFamily: 'Gaegu'
    },
    dateText: {
        fontFamily: 'Gaegu',
        fontSize: 12
    },
    link: {
        color: '#0064bd',
        fontWeight: 'bold'
    }
})