import { HandPalm, Play } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod"

import {
    HomeContainer,
    StartCountDownButton,
    StopCountDownButton
} from "./styles"

import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm"
import { CountDown } from "./components/CountDown"
import { CycleContext } from "../../contexts/CycleContext"


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser no minimo 5 minutos')
        .max(60, 'O ciclo precisa ser no máximo 60 minutos')
})
/*
interface newCyleFormData {
    task: string,
    minutesAmount: number
}
*/
// essa linha a baixo cria a interface a cima
type newCyleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home = () => {
    const { activeCycle, createNewCycle, interruptCycle } = useContext(CycleContext)
    const newCycleForm = useForm<newCyleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })
    const {handleSubmit, watch, reset } = newCycleForm

    const task = watch('task')
    const isSubmitDisabled =!task

    const handleCreatenewCycle =(data: newCyleFormData) => {
        createNewCycle(data)
        reset()
    }
/*
    prop Drilling -> Quando a gente tem MUITAS propiedades para comunicação 
    entre componentes( ruim para manutenção)

    solução: Context API -> permite compartilharmos informações entre VARIOS
    componentes ao mesmo tempo
*/
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreatenewCycle)} action="">
                <FormProvider {...newCycleForm}>                    
                  <NewCycleForm />
                </FormProvider>
                <CountDown  />
                {activeCycle ? (
                    <StopCountDownButton onClick={interruptCycle} type="button">
                        Interromper
                        <HandPalm size={24}/>
                    </StopCountDownButton>
                ):(
                    <StartCountDownButton  disabled={isSubmitDisabled} type="submit">
                        <Play size={24}/>Começar
                    </StartCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}
