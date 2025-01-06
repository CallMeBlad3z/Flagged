// app/components/progressbar.tsx

import { View, Text, StyleSheet } from 'react-native'; 

interface ProgressBarProps {
  progress: number;
  label: string; 
}

const ProgressBar = ({ progress, label }: ProgressBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.percentage}>{`${(progress * 100).toFixed(1)}%`}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.filler, { flex: progress }]} />
        <View style={[styles.remaining, { flex: 1 - progress }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'BonaNova-Bold',
    fontSize: 20,
  },
  percentage: {
    fontFamily: 'SourceSans3-Bold',
    fontSize: 20,
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
  },
  filler: {
    backgroundColor: 'black',
  },
  remaining: {
    backgroundColor: 'transparent',
  },
});

export default ProgressBar;