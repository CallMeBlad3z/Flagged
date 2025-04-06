// app/reportbugs.tsx

import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

interface BugReport {
  fromEmail: string;
  subject: string;
  bugReport: string;
}

const height = Dimensions.get('window').height;

const ReportBugs = () => {
  const [formData, setFormData] = useState<BugReport>({
    fromEmail: '',
    subject: '',
    bugReport: '',
  });

  const sendEmail = async (): Promise<void> => {
    if (formData.fromEmail.trim() === '' || formData.subject.trim() === '' || formData.bugReport.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      //console.log('Sending email with the following details:', { fromEmail, subject, bugReport });
      const response = await fetch('https://flagged-app.com/api/email/report-bug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      //console.log('Response text:', responseText);

      // Check if the response is JSON
      if (response.headers.get('content-type')?.includes('application/json')) {
        const responseData = JSON.parse(responseText);
        //console.log('Email sent successfully:', responseData);
        Alert.alert('Success', 'Bug report sent successfully.');
      } else {
        //console.log('Non-JSON response:', responseText);
        Alert.alert('Success', 'Bug report sent successfully.');
      }
    } catch (error) {
      //console.error('Error sending email:', error);
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
            value={formData.fromEmail}
            onChangeText={(text) => setFormData({ ...formData, fromEmail: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={formData.subject}
            onChangeText={(text) => setFormData({ ...formData, subject: text })}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Describe the bug"
            value={formData.bugReport}
            onChangeText={(text) => setFormData({ ...formData, bugReport: text })}
            multiline
          />
        </View>
        <View>
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
  contentContainer: {
    flex: 1,
  },
  pageDescription: {
    fontSize: 14,
    marginBottom: 20,
    color: '#6A6A6A',
  },
  input: {
    height: 44,
    borderWidth: 1.5,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderColor: '#818181',
  },
  textArea: {
    height: height * 0.5,
    borderColor: '#818181',
    borderWidth: 1.5,
    marginBottom: 10,
    paddingTop: 12,
    paddingHorizontal: 12,
    textAlignVertical: 'top',
    borderRadius: 10,
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