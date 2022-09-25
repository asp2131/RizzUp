// @ts-nocheck
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Hoverable } from 'react-native-web-hooks';
import { Row, useSx } from 'dripsy';
import { AntDesign } from "@expo/vector-icons";
import MagicModal from '../../components/magicModal'
import Web3 from "web3";
import { ConnectExtension } from "@magic-ext/connect";
import { magic } from "../../../../apps/next/lib/magic"
import { UserContext } from "../../../../apps/next/lib/UserContext"
import faunadb, { query as q } from 'faunadb';
import Router from "next/router";
import { setCookie } from 'cookies-next';

const web3 = new Web3(magic.rpcProvider);

const createLogger = (...msg) => () => {
    console.log(...msg);
};

const client = new faunadb.Client({ secret: "fnAExLQW6XAASzu2nmTsQpv0D8Bu5Mf1P5byfoSH", domain: 'db.us.fauna.com' })

export default function App() {
    const ref = useRef(null);
    const [magicAccount, setAccount]: any = useState(null);
    const [width, setWindowWidth] = useState(Dimensions.get('window').width)
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        console.log(user)
        if (magicAccount === null) {
            return;
        }
        const existingUser = loginUser(magicAccount)
        if (existingUser) {
            return;
        }
        createUser(magicAccount);
    }, [magicAccount])

    const login = async () => {
        web3.eth
            .getAccounts()
            .then((accounts) => {
                setAccount(accounts?.[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const createUser = async (email) => {
        // password = BcryptReactNative.compareSync(password, bcrypt.genSaltSync(10)) //hashes the password 
        let data
        try {
            data = await client.query(
                q.Create(
                    q.Collection('User'),
                    {
                        data: {
                            email,
                        }
                    }
                )
            )
            if (data.name === 'BadRequest') return // if there's an error in the data creation
        } catch (error) {
            console.log(error)
            return;
        }
        const user = data.data
        user.id = data.ref.value.id // attaches the ref id as the user id in the client
        setUser(user);
        setCookie("account", JSON.stringify({ account: user }))
        return user
    }

    const loginUser = async (email) => {
        try {
            let userData = await client.query(
                q.Get(
                    q.Match(q.Index('unique_User_email'), email)
                )
            )
            userData.data.id = userData.ref.value.id
            setUser(userData.data)
            setCookie("account", JSON.stringify({ account: userData.data }))
            Router.push("/")
            return userData.data
        } catch (error) {
            return
        }
    }



    return (

        // <Modal style={{backgroundColor: '#5634CB'}} isVisible={true}>
        <View style={{ flex:  1, justifyContent: "center", alignItems: "center", paddingLeft: width > 1000 ? 150 : "none" }}>
            {
                user === undefined || user === null ?
                    <>
                        <Hoverable>
                            {isHovered => (
                                <Pressable onPress={login} accessible style={[styles.button, { backgroundColor: isHovered ? 'yellow' : 'transparent', width: width > 500 ? "50%" : "70%" }]}>
                                    <Row sx={{ alignItems: "baseline" }}>
                                        <AntDesign name="mail" size={24} color={isHovered ? 'black' : 'lightgreen'} />
                                        <View style={{ paddingRight: 10 }} />
                                        <Text style={[styles.text, { color: isHovered ? 'black' : 'white' }]}>Login with Email</Text>
                                    </Row>
                                </Pressable>
                            )}
                        </Hoverable>
                        <View style={styles.buttonContainer} />
                        <Hoverable>
                            {isHovered => (
                                <Pressable onPress={login} accessible style={[styles.button, { backgroundColor: isHovered ? 'yellow' : 'transparent', width: width > 500 ? "50%" : "70%" }]}>
                                    <Row sx={{ alignItems: "baseline" }}>
                                        <AntDesign name="google" size={24} color={isHovered ? 'black' : 'lightgreen'} />
                                        <View style={{ paddingRight: 10 }} />
                                        <Text style={[styles.text, { color: isHovered ? 'black' : 'white' }]}>Login with Google</Text>
                                    </Row>
                                </Pressable>
                            )}
                        </Hoverable>
                    </>
                    : null
            }
            <MagicModal user={user} login={login} account={magicAccount} setAccount={setAccount} />
        </View>

        // </Modal>

    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: "500",
        fontSize: 18
    },
    buttonContainer: {
        padding: 20
    },
    button: {
        padding: 20,
        backgroundColor: '#583edf',
        justifyContent: 'center',
        borderRadius: 50,
        width: "30%",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 2
    },
})