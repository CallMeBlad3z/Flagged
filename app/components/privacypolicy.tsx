// app/components/PrivacyPolicy.tsx

import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Animated, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const PrivacyPolicy = ({ onClose }: { onClose?: () => void }) => {
  const { height } = useWindowDimensions();
  const slideAnim = useRef(new Animated.Value(height)).current; // Initial position is off-screen (bottom)

  // Local privacy policy content
  const privacyPolicy = `
    <html>
      <head>
        <style>
          @font-face {
            font-family: 'BonaNova-Bold';
            src: url('file:///android_asset/fonts/BonaNova-Bold.ttf'); /* For Android */
          }
          @font-face {
            font-family: 'SourceSans2-Regular';
            src: url('file:///android_asset/fonts/SourceSans2-Regular.ttf'); /* For Android */
          }
          body {
            font-size: 22px;
            margin: 24px;
            line-height: 1.6;
          }
          h1 {
            font-size: 48px;
            margin-bottom: 16px;
          }
          h1, h2, h2 {
            font-family: 'BonaNova-Bold';
          }
          p, li {
            font-family: 'SourceSans2-Regular';
          }
        </style>
      </head>
      <body>
        <h1>Privacy Policy</h1>
        <p>Last updated: January 04, 2025</p>
        <p>This is hobby project of a single developer.</p>
        <p>I am not interested in who you are or where have you been. It is none of my business. The app does not collect any data and does not track it’s users track in any way. The app has no ads and does not send data anywhere else either. All the data is handled locally in the app.</p>
        <h2>Privacy Policy - Flagged</h2>
        <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
        <h2>Information Collection and Use</h2>
        <p>The ‘Flagged’ app is built as a free app and is provided by a single developer personally.</p>
        <p>The app does not collect any personally identifiable information of any kind. The only way you can send me identifiable information, is by sending me a bug report from the app and inserting your email to the intended field in case of a needed reply. But even that is optional and the email addresses will be removed from our mailbox after the bug report has been received.</p>
        <h2>Links to Internet Sites</h2>
        <p>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
        <h2>Changes to This Privacy Policy</h2>
        <p>I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</p>
        <h2>Contact Us</h2>
        <p>If you have any questions or suggestions about my App or Privacy Policy, do not hesitate to contact me.</p>
        <p>email:
            <a href="mailto:info@flagged-app.com">
        </p>
      </body>
    </html>
  `;

  useEffect(() => {
    // Reset the animation value and trigger the slide-in animation
    slideAnim.setValue(height);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false, // Set to false to avoid issues with layout animations
    }).start();
  }, [slideAnim, height]);

  const htmlContent = privacyPolicy;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Privacy Policy</Text>
      </View>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
      />
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closebuttonText}>Close</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'BonaNova-Bold',
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
    fontFamily: 'SourceSans2-Bold',
  },
});

export default PrivacyPolicy;