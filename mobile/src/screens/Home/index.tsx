import React, {useState} from "react";
import {Image, FlatList} from "react-native";
import {styles} from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png"
import {Header} from "../../components/Header";
import {GameCard, GameCardProps} from "../../components/GameCard";
import {useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Background} from "../../components/Background";
import {useNavigation} from "@react-navigation/native";

export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([]);

    useEffect(() => {
        fetch('http://192.168.15.3:3333/games').then(response => response.json())
            .then(data => {
                return setGames(data)
            })

    }, [])

    const navigation = useNavigation();

    function handleOpenGame({id, title,bannerUrl}: GameCardProps) {
        navigation.navigate("game", {id, title,bannerUrl})
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    defaultSource={logoImg}
                    style={styles.logo}
                />

                <Header title={'Encontre seu duo'} subTitle={"Seleciona o jogo que deseja jogar"}></Header>
                <FlatList
                    data={games} keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <GameCard
                            data={item}
                            onPress={()=>{handleOpenGame(item)}}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentList}
                />
            </SafeAreaView>
        </Background>
    );
}
