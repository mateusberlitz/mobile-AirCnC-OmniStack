import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import api from '../services/api';

import Spot from './Spot';

export default function SpotList(props){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: {
                    tech: props.tech
                }
            });

            setSpots(response.data);
            console.log(response.data);
        }

        loadSpots();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que utilizam <Text style={styles.bold}>{props.tech}</Text> </Text>

            <FlatList 
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={ ({ item }) => (
                    <Spot item={item} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20
    }
});