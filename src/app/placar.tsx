import { View, Text, StyleSheet, TextInput, Button, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { buscarPlacarNormal, buscarPlacarTemporizado } from '../services/jsonServer';

const data = {
    name: "Nome",
    score: "8"
}

const placar = () => {
    const router = useRouter();
    const [tipoPlacar, setTipoPlacar] = useState<number>(1);
    const [placar, setPlacar] = useState<string[]>([]);

    useEffect(()=>{
        if(tipoPlacar == 1){
            const busca = buscarPlacarNormal();
            console.log(busca);
        } else {
            const busca = buscarPlacarTemporizado();
            console.log(busca);
        }

    }, [tipoPlacar]);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Pressable style={styles.HeaderButtons} onPress={() => {
                        router.push({
                        pathname: '/',
                        });
                    }}>
                        <Text>Voltar</Text>
                        </Pressable>
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
                //keyExtractor={item=>item.id}
                renderItem={({item}) => 
                    <View>
                        <Text>item.name</Text>
                        <Text>item.score</Text>
                    </View>}
                    />
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
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
  HeaderButtons: {
    fontSize: 24,
    backgroundColor: "#008",
    fontFamily: 'monospace',
    color: "#fff",
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
});


export default placar;