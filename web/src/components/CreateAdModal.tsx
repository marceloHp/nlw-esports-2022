import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import {Check, GameController} from "phosphor-react";
import {Input} from "./form/Input";

export function CreateAdModal() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 flex"/>
            <Dialog.Content
                className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
                <form className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label id="game" htmlFor="game">Qual o game?</label>
                        <select id="game" placeholder=""
                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                        >
                            <option disabled selected>
                                Selecione o game que deseja jogar
                            </option>
                        </select>

                        <div className="flex flex-col gap-2">
                            <label className="text-white fo" id="name" htmlFor="name">Seu nome(ou
                                nickname)</label>
                            <Input placeholder="Como te chamam no game ?"/>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label id="yearsPlaying" htmlFor="name">Joga a quantos anos?</label>
                                <Input id="yearPlaying" type="number" placeholder="Tudo bem ser zero"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label id="discord" htmlFor="discord">Qual seu discord?</label>
                                <Input id="discord" type="text" placeholder="Usuário#00000"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label id="weekDays" htmlFor="weekDays">Quando costuma jogar</label>
                                <div className="grid grid-cols-4 gap-2">
                                    <button className="w-8 h-8 rounded bg-zinc-900 gap">a</button>
                                    <button className="w-8 h-8 rounded bg-zinc-900 gap">a</button>
                                    <button className="w-8 h-8 rounded bg-zinc-900 gap">a</button>
                                    <button className="w-8 h-8 rounded bg-zinc-900 gap">a</button>
                                    <button className="w-8 h-8 rounded bg-zinc-900 gap">a</button>
                                    <button className="w-8 h-8 rounded bg-zinc-900 gap">a</button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="hourStart">Qual horário do dia</label>
                                <div className="grid grid-cols-2 gap-1">
                                    <Input id="hourStart" type="time" placeholder="De"/>
                                    <Input id="hourEnd" type="time" placeholder="Até"/>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400"></Check>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </div>
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