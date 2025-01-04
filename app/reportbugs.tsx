import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface BugReport {
  fromEmail: string;
  subject: string;
  bugReport: string;
}

const ReportBugs = () => {
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [bugReport, setBugReport] = useState('');

  const sendEmail = async () => {
    if (fromEmail.trim() === '' || subject.trim() === '' || bugReport.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await fetch('http://192.168.0.88:3000/email/report-bug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromEmail, subject, bugReport }),
      });
      Alert.alert('Success', 'Bug report sent successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to send bug report.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={fromEmail}
        onChangeText={setFromEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Describe the bug"
        value={bugReport}
        onChangeText={setBugReport}
        multiline
      />
      <Button title="Send Bug Report" onPress={sendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
});

export default ReportBugs;