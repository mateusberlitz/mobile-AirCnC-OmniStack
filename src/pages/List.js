import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, Text, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.102:3333', {
                query: { user_id }  
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} na data ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            if(storagedTechs){
                const techsArray = storagedTechs.split(',').map(tech => tech.trim());

                setTechs(techsArray);
            }else{
                AsyncStorage.removeItem('user');
                navigation.navigate('Login');
            }
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 50
    }
});