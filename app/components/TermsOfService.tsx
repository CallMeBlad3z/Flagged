// app/components/TermsOfService.tsx

import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, useWindowDimensions, Animated, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

const TermsOfService = ({ onAccept, onRefuse, showButtons = true, onClose }: { onAccept?: () => void, onRefuse?: () => void, showButtons?: boolean, onClose?: () => void }) => {
  const [terms, setTerms] = useState('');
  const [loading, setLoading] = useState(true);
  const { height } = useWindowDimensions();
  const slideAnim = useRef(new Animated.Value(height)).current; // Initial position is off-screen (bottom)

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch('http://flagged-app.com');
        const termsText = await response.text();
        setTerms(termsText); // Set the fetched terms of service
      } catch (error) {
        console.error('Failed to fetch terms of service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms(); // Fetch the terms of service when the component mounts

    // Reset the animation value and trigger the slide-in animation
    slideAnim.setValue(height);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false, // Set to false to avoid issues with layout animations
    }).start();
  }, [slideAnim, height]);

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem('termsAccepted', 'true');
      if (onAccept) onAccept();
    } catch (error) {
      console.error('Failed to save acceptance status:', error);
    }
  };

  const handleRefuse = () => {
    if (onRefuse) {
      onRefuse();
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-size: 32px;
            margin: 24px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        ${terms}
      </body>
    </html>
  `;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
      />
      {showButtons ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.refuseButton]} onPress={handleRefuse}>
            <Text style={styles.refusebuttonText}>Refuse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
            <Text style={styles.acceptbuttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closebuttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refuseButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#000',
  },
  acceptButton: {
    backgroundColor: '#000',
  },
  refusebuttonText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'SourceSans3-Bold',
  },
  acceptbuttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'SourceSans3-Bold',
  },
  closeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closebuttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'SourceSans3-Bold',
  },
});

export default TermsOfService;