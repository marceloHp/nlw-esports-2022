import React from "react";
import {View, Text, ViewProps} from "react-native";
import {styles} from "./styles";

interface Props extends ViewProps {
    title: string,
    subTitle: string
}

export function Header({title, subTitle, ...rest}: Props) {
    return (
        <View style={styles.container} {...rest}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subTitle}</Text>
        </View>
    );
}
