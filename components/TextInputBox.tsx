import { setText } from '@/src/Redux/store/speechSlice';
import { RootState } from '@/src/Redux/store/store';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export default function TextInputBox() {
  const dispatch = useDispatch();
  const text = useSelector((state: RootState) => state.speech.text);

  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 600 }}
    >
      <Text style={styles.title}>Text to Speech Converter</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type something to speak..."
          placeholderTextColor="gray"
          multiline
          value={text}
          onChangeText={(value) => dispatch(setText(value))}
          maxLength={500}
        />
      </View>
      <Text style={styles.charCount}>{text.length} / 500</Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: 'rgba(104, 101, 101, 0.2)',
    borderRadius: 20,
    padding: 18,
    minHeight: 200,
  },
  input: {
    color: 'black',
    fontSize: 18,
    textAlignVertical: 'top',
  },
  charCount: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'right',
    marginTop: 12,
    fontSize: 14,
  },
});