  
  
  
  
  
  
const LockScreen = () => {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  
    // Check if hardware supports biometrics
    useEffect(() => {
      (async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(compatible);
      })();
    }, []);
  
    const fallBackToDefaultAuth = () => {
      // Implement your fallback authentication method here
      Alert.alert('Fallback Authentication', 'Fallback method goes here');
    };
  
    const handleBiometricAuth = async () => {
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) {
        Alert.alert(
          'Biometric record not found',
          'Please verify your identity with your password',
          [{ text: 'OK', onPress: fallBackToDefaultAuth }]
        );
      } else {
        const biometricAuth = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Login with Biometrics',
          disableDeviceFallback: true,
        });
  
        if (biometricAuth.success) {
          // Unlock the screen or navigate to the main content
          Alert.alert('Authentication successful', 'You are now unlocked!');
          // Implement your screen unlock logic here
        } else {
          Alert.alert('Authentication failed', 'Biometric authentication failed.');
        }
      }
    };
  
    return (
      <View>
        <Text>
          {isBiometricSupported
            ? 'Your device is compatible with Biometrics'
            : 'Face or Fingerprint scanner is available on this device'}
        </Text>
        <Button
          title="Unlock with Biometrics"
          onPress={handleBiometricAuth}
          disabled={!isBiometricSupported}
        />
      </View>
    );
  };
  