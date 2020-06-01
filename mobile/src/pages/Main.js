import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'

import Logo from '../assets/logo.png'
import dislike from '../assets/dislike.png'
import like from '../assets/like.png'

export default function Main( {navigation} ) {

    const id = navigation.getParam('user')
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: id,
                }
            })
            setUsers(response.data)
        }
        loadUsers();
    }, [id] )

    async function handleLike(){

        const [user, ...rest] = users

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id },
        })
        setUsers(rest);
    }

    async function handleDisLike(){

        const [user, ...rest] = users

        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id },
        })
        setUsers(rest);
    }

    async function handleLogout(){
        await AsyncStorage.clear()

        navigation.navigate('login')
    }

    return (
        
        <SafeAreaView style={styles.container} >

            <TouchableOpacity onPress={handleLogout}>
                <Image source={Logo} style={styles.Logo} />
            </TouchableOpacity> 
            
            <View style={styles.cardsContainer}>
                { users.length === 0 ? <Text style={styles.empty}> Ninguem te quer =( </Text> 
                    : (
                        users.map( (user, index) =>(
                            <View key={user._id} style={[styles.card, {zIndex: users.length - index }]}>
                                <Image style={styles.Avatar} source={{uri: user.avatar}} />
                                <View style={styles.footer}>
                                    <Text style={styles.name}> {user.name} </Text>
                                    <Text style={styles.bio} numberOfLines={4}> {user.bio} </Text>
                                </View>
                            </View>
                        )) 
                    )
                }
            </View>
            {users.length === 0 ? <View></View> :(
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleDisLike} style={styles.button}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLike} style={styles.button}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    Logo: {
        marginTop: 30,
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    Avatar: {
        flex: 1,
        height: 300
    },
    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 2,
        lineHeight: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },
    button: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        textShadowOffset: {
            width: 0,
            height: 2,
        },
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    }
})