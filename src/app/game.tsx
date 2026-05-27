import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { countries } from '../data/countries';
// @ts-ignore
import _ from '../../underscore-esm-min';

import { GameHeader } from '../components/GameHeader';
import { FlagQuestion } from '../components/FlagQuestion';
import { OptionButton } from '../components/OptionButton';
import { FeedbackScreen } from '../components/FeedbackScreen';

interface Country {
  name: string;
  code: string;
}

type GameStatus = 'question' | 'hit' | 'miss' | 'end';

const GameScreen = () => {
  const [points, setPoints] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [status, setStatus] = useState<GameStatus>('question');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [chosenOption, setChosenOption] = useState<number>(-1);
  
  const router = useRouter();
  const { username } = useLocalSearchParams<{ username: string }>();

  const nextStep = () => {
    if (step > 10) setStatus('end');
    else setStatus('question');
    setChosenOption(-1);
  }

  const confirmTry = () => {
    if (selectedCountry && options[chosenOption] && selectedCountry.name === options[chosenOption].name) {
      setPoints((p) => p + 1)
      setStatus('hit')
    }
    else {
      setStatus('miss')
    }
    setStep((s) => s + 1);
  }

  useEffect(() => {
    if (status === 'question') {
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      setSelectedCountry(randomCountry);
    }
  }, [status]);

  useEffect(() => {
    if (selectedCountry) {
      let optionsArray = _.sample(countries, 3);
      optionsArray.push(selectedCountry);
      setOptions(_.shuffle(optionsArray));
    }
  }, [selectedCountry])

  if (status !== 'question') {
    return (
      <FeedbackScreen
        status={status}
        username={username}
        points={points}
        onContinue={nextStep}
        onRestart={() => {
          setPoints(0);
          setStep(1);
          setStatus('question');
        }}
        onQuit={() => router.replace('/')}
      />
    );
  }

  if (!selectedCountry) return (<Text>Carregando ...</Text>)

  return (
    <SafeAreaView style={styles.container}>
      <GameHeader 
        onClose={() => router.replace('/')}
        step={step}
        points={points}
      />
      
      <FlagQuestion 
        username={username || 'Jogador'}
        countryCode={selectedCountry.code}
      />

      <View style={styles.optionsContainer}>
        {options.map((option, idx) => (
          <OptionButton
            key={idx}
            label={option.name}
            isSelected={idx === chosenOption}
            onPress={() => setChosenOption(idx)}
          />
        ))}
      </View>

      <View style={styles.confirmContainer}>
        <Button
          title="Confirmar"
          color="green"
          disabled={chosenOption === -1}
          onPress={confirmTry}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
  optionsContainer: {
    flex: 4,
    justifyContent: 'space-evenly',
  },
  confirmContainer: {
    flex: 1,
    margin: 50,
  },
});

export default GameScreen;
