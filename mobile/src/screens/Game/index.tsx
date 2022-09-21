import {styles} from "./styles";
import {SafeAreaView} from "react-native-safe-area-context";
import {Background} from "../../components/Background";
import {useNavigation, useRoute} from "@react-navigation/native";
import {GameParams} from "../../@types/navigation";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {THEME} from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png"
import {Header} from "../../components/Header";
import {DuoCard} from "../../components/DuoCard";
import {useEffect, useState} from "react";

export function Game() {
    const route = useRoute();
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    const game = route.params as GameParams;

    const [duos, setDuos] = useState([]);
    useEffect(() => {
        fetch(`http://192.168.15.3:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => {
                return setDuos(data);
            })

    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Image source={logoImg} style={styles.logo}></Image>

                    <View style={styles.right}></View>
                </View>
                <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode="cover"/>
                <Header title={game.title} subTitle="Conecte-se e comece a jogar"></Header>

                <FlatList horizontal
                          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                          showsHorizontalScrollIndicator
                          ListEmptyComponent={()=> (
                              <Text style={styles.emptyListText}>
                                  Não há anúncios publicados para esse jogo!
                              </Text>
                          )}
                          style={styles.containerList}
                          data={duos}
                          keyExtractor={item => item.id} renderItem={({item}) => ( <DuoCard onConect={()=>{}} data={item}></DuoCard>)}>
                </FlatList>
            </SafeAreaView>
        </Background>
    )
}
