import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface FlagQuestionProps {
  username: string;
  countryCode: string;
}

export const FlagQuestion = ({ username, countryCode }: FlagQuestionProps) => {
  return (
    <View style={styles.flagContainer}>
      <Text style={styles.question}>{username},</Text>
      <Text style={styles.question}>selecione a qual país a bandeira abaixo pertence?</Text>
      <Image
        style={styles.flag}
        source={{
          uri: `https://flagsapi.com/${countryCode}/shiny/64.png`
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flagContainer: {
    flex: 4,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  flag: {
    width: 180,
    height: 180,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
});
