import React from "react";
import { Text } from "react-native";
import globalStyles from "../global_styles";

type FontProp = {
    content: string;
}

export function Heading({content} : FontProp) {
    return (
        <Text style={globalStyles.fonts.heading}>
            {content}
        </Text>
    )
}

export function Subheading({content} : FontProp) {
    return (
        <Text style={globalStyles.fonts.subheading}>
            {content}
        </Text>
    )
}

export function Body({content} : FontProp) {
    return (
        <Text style={globalStyles.fonts.body}>
            {content}
        </Text>
    )
}

export function Button1({content} : FontProp) {
    return (
        <Text style={globalStyles.fonts.button1}>
            {content}
        </Text>
    )
}

export function Button2({content} : FontProp) {
    return (
        <Text style={globalStyles.fonts.button2}>
            {content}
        </Text>
    )
}