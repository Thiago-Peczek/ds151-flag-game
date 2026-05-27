import { View, Text, StyleSheet, TextInput, Button, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { buscarPlacarNormal, buscarPlacarTemporizado } from '../services/jsonServer';

type placarType = {
    id: string;
    name: string;
    score: string;
}

const placar = () => {
    const router = useRouter();
    const [tipoPlacar, setTipoPlacar] = useState<number>(1);
    const [placar, setPlacar] = useState<placarType[]>([]);
    const [placarOrdenado, setPlacarOrdenado] = useState<placarType[]>([]);

    const getPlacar = async () => {
        if(tipoPlacar == 1){
            const busca = await buscarPlacarNormal();
            console.log(busca);
            setPlacar(busca);
            placar.sort((a, b) => Number(a.score) - Number(b.score));
        } else {

            const busca = await buscarPlacarTemporizado();
            console.log(busca)
            setPlacar(busca);
            placar.sort((a, b) => Number(a.score) - Number(b.score));
        }
    } 

    useEffect(()=>{
        getPlacar();
    }, [tipoPlacar]);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                   <Button title="Voltar" color="rgb(12, 120, 252)" onPress={() => {
                        router.push({
                        pathname: '/',
                        });
                    }}/>
                    <Text>
                        Placar
                    </Text>
                </View>
                <View>
                    <Button title="Normal" color="rgb(12, 120, 252)" onPress={() => {
                        setTipoPlacar(1);
                    }}/>
                    <Button title="Temporizado" color="rgb(12, 120, 252)" onPress={() => {
                        setTipoPlacar(2);
                    }}/>
                </View>
            </View>
            <View>
                <FlatList
                data={placar}
                keyExtractor={(item)=>item.id}
                renderItem={({item}) => 
                    <View style={styles.itemPlacar}>
                        <Text>{item.name}</Text>
                        <Text>{item.score}</Text>
                    </View>}
                    />
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 50,
    color: '#000',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    padding: 8,
  },
  headerTitle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  placar: {
    borderWidth: 2,
    margin: 20,
    borderColor: '#008',
    borderRadius: 20,
    color: "black",
    padding: 20,
    fontSize: 20,
    fontFamily: 'monospace'
  },
  itemPlacar: {
    padding: 12,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  }
});


export default placar;