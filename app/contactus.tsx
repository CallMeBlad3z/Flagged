// app/contactus.tsx

import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

interface contactUs {
  fromEmail: string;
  subject: string;
  contactUs: string;
}

const height = Dimensions.get('window').height;

const ContactUs = () => {
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [contactUs, setcontactUs] = useState('');

  const sendEmail = async () => {
  if (fromEmail.trim() === '' || subject.trim() === '' || contactUs.trim() === '') {
    Alert.alert('Error', 'Please fill in all fields.');
    return;
  }

  try {
    console.log('Sending email with the following details:', { fromEmail, subject, contactUs });
    const response = await fetch('https://flagged-app.com/api/email/contact-us', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromEmail, subject, contactUs }),
    });

    const responseText = await response.text();
    console.log('Response text:', responseText);

    // Check if the response is JSON
    if (response.headers.get('content-type')?.includes('application/json')) {
      const responseData = JSON.parse(responseText);
      console.log('Email sent successfully:', responseData);
      Alert.alert('Success', 'Message sent successfully.');
    } else {
      console.log('Non-JSON response:', responseText);
      Alert.alert('Success', 'Message sent successfully.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    Alert.alert('Error', 'Failed to send message.');
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
          If you have any questions or suggestions regarding the app, please feel free to reach out to us using the form below.
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
            placeholder="Your message here"
            value={contactUs}
            onChangeText={setcontactUs}
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
    height: height * 0.5,
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

export default ContactUs;