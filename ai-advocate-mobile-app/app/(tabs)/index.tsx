import { Text, View } from "react-native"
import Bill from "../../assets/components/Bill/Bill"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Text>AI advocate</Text>  {/* TODO: Style and position app title. */}
      <Bill
        title="HUMAN TRAFFICKING: VICTIM RIGHTS"
        id="CA SB376"
        status="Engrossed"
        description="This bill gives trafficking survivors the right to have a support person and an advocate with them during interviews with police or lawyers."
        topics={["trafficking", "advocates", "rights"]}
        numReactions={143}
      />
    </View>
  )
}
