import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.english.learning',
  appName: 'English Learning',
  webDir: 'dist',
  android: {
    compileSdkVersion: 36,
    buildToolsVersion: '35.0.0',
    minSdkVersion: 22,
    targetSdkVersion: 34
  }
};

export default config;
