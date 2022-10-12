import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import {Check, GameController} from "phosphor-react";
import {Input} from "./form/Input";
import {FormEvent, useEffect, useState} from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";

interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
        ads: number
    }
}

export function CreateAdModal() {

    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] =useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] =useState(false)
    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(e: FormEvent){
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData);

        if(!data.name){
            return;
        }
        console.log(data)
        try {
           await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                discord: data.discord,
                game: data.game,
                hourEnd: data.hourEnd,
                hourStart: data.hourStart,
                weekDays: weekDays.map(Number),
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                useVoiceChannel: useVoiceChannel
            });
           alert("anúncio criado com sucesso")
        }catch (err){
            alert("Erro ao criar anúncio");
            console.error(err)
        }


    }
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 flex"/>
            <Dialog.Content
                className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
                <form onSubmit={handleCreateAd}  className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label id="game" htmlFor="game">Qual o game?</label>
                        <select id="game"
                                name="game"
                                placeholder=""
                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                                defaultValue=""
                        >
                            <option disabled>
                                Selecione o game que deseja jogar
                            </option>
                            {games.map(game => {
                                return (
                                    <option key={game.id} value={game.id}>{game.title}</option>
                                )
                            })}
                        </select>

                        <div className="flex flex-col gap-2">
                            <label className="text-white fo"  id="name" htmlFor="name">Seu nome(ou
                                nickname)</label>
                            <Input name="name" placeholder="Como te chamam no game ?"/>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label id="yearsPlaying" htmlFor="name">Joga a quantos anos?</label>
                                <Input id="yearPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser zero"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label id="discord"  htmlFor="discord">Qual seu discord?</label>
                                <Input id="discord" name="discord" type="text" placeholder="Usuário#00000"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label id="weekDays" htmlFor="weekDays">Quando costuma jogar</label>
                                    <ToggleGroup.Root
                                        className="grid grid-cols-4 gap-2"
                                        type="multiple"
                                        value={weekDays}
                                        onValueChange={setWeekDays}
                                    >
                                        <ToggleGroup.Item value="0" className={`"w-8 h-8 rounded gap ${weekDays.includes('0') ? 'bg-violet-500': 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                                        <ToggleGroup.Item value="1" className={`"w-8 h-8 rounded gap ${weekDays.includes('1') ? 'bg-violet-500': 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                                        <ToggleGroup.Item value="2" className={`"w-8 h-8 rounded gap ${weekDays.includes('2') ? 'bg-violet-500': 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                                        <ToggleGroup.Item value="3" className={`"w-8 h-8 rounded gap ${weekDays.includes('3') ? 'bg-violet-500': 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                                        <ToggleGroup.Item value="4" className={`"w-8 h-8 rounded gap ${weekDays.includes('4') ? 'bg-violet-500': 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                                        <ToggleGroup.Item value="5" className={`"w-8 h-8 rounded gap ${weekDays.includes('5') ? 'bg-violet-500': 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                                        <ToggleGroup.Item value="6" className={`"w-8 h-8 rounded gap ${weekDays.includes('6') ? 'bg-violet-500': 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                                    </ToggleGroup.Root>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="hourStart">Qual horário do dia</label>
                                <div className="grid grid-cols-2 gap-1">
                                    <Input id="hourStart" name="hourStart" type="time" placeholder="De"/>
                                    <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até"/>

                                </div>
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked)=> {
                            if(checked===true){
                                setUseVoiceChannel(true)
                            }
                        }} className="w-6 h-6 p-1 rounded bg-zinc-900">
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400"></Check>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>
                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close type="button"
                                      className="bg-zinc-500 px-5 h-12 rounded-md font-semibold">Cancelar</Dialog.Close>
                        <button
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            type="submit">
                            <GameController className="w-6 h-6"/>
                            Enontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}