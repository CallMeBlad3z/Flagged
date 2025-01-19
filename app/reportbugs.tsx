// app/reportbugs.tsx

import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';

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
      await fetch('https://flagged-app.com/email/report-bug', {
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
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
        <Text style={styles.pageDescription}>
          We are always looking to fix bugs that negatively impact the user experience and we value your bug reports to help us squash those pesky little nuisances.
        </Text>
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
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={sendEmail}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  pageDescription: {
    fontSize: 14,
    marginBottom: 20,
    color: '#6A6A6A',
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1.5,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderColor: '#818181',
  },
  textArea: {
    height: 400,
    borderColor: '#818181',
    borderWidth: 1.5,
    marginBottom: 12,
    paddingTop: 12,
    paddingHorizontal: 12,
    textAlignVertical: 'top',
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000', // Change this to your desired color
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReportBugs;