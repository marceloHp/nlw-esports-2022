import {styles} from "./styles";
import {Text, TouchableOpacity, View} from "react-native";
import {DuoInfo} from "../DuoInfo";
import {THEME} from "../../theme";
import {GameController} from "phosphor-react-native";

export interface DuoCardProps {
    hourEnd: string,
    hourStart: string,
    id: string,
    name: string,
    useVoiceChannel: boolean,
    weekDays: string[],
    yearsPlaying: number
}

interface Props {
    data: DuoCardProps,
    onConect: ()=>{}
}

export function DuoCard({data, onConect}: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo label="Nome" value={data.name}></DuoInfo>
            <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`}></DuoInfo>
            <DuoInfo label="Disponibilidade"
                     value={`${data.weekDays.length} dias \u2022 ${data.hourStart} \u2022 ${data.hourEnd}`}></DuoInfo>
            <DuoInfo label="Chamada de áudio?" value={data.useVoiceChannel ? "Sim" : "Não"}
                     colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}></DuoInfo>

            <TouchableOpacity
                style={styles.button}
                onPress={onConect}
            >
                <GameController
                    color={THEME.COLORS.TEXT}
                    size={20}
                ></GameController>

                <Text
                style={styles.buttonTitle}
                >
                    Conectar
                </Text>
            </TouchableOpacity>
        </View>
    )
}
