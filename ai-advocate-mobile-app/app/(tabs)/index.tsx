import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={()=> router.push('/details')}>
        <Text> Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4682B4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});
