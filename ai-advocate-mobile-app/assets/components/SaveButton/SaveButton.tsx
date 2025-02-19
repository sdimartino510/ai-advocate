import {View, StyleSheet} from "react-native"
import {MaterialIcons} from "@expo/vector-icons"
import globalStyles from "@/assets/global_styles"

export default function SaveButton (
    {isSaved, setIsSaved}
    :
    {isSaved: boolean, setIsSaved: React.Dispatch<React.SetStateAction<boolean>>}
) {
    return(
        <View>
            <MaterialIcons
                name="bookmark-outline"
                size={24}
                color={globalStyles.colors.grey}
                onPress={() => setIsSaved(!isSaved)}
            />
            {isSaved &&
                <MaterialIcons
                    name="bookmark"
                    size={18}
                    style={styles.shadedBookmark}
                    color={globalStyles.colors.yellow}
                    onPress={() => setIsSaved(!isSaved)}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    shadedBookmark: {
        position: "absolute",
        zIndex: 1,
        top: 2.5,
        left: 3,
    },
})