import { ReactNode, createContext, useEffect, useReducer, useState } from "react"
import { Cycle, cycleReducer } from "../reducers/cycles/reducer";
import { markCurrentCycleAsFinishedAction, addNewCycleAction, intrruptCurrentCycleAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface CycleContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined,
    activeCycleID: string | null,
    amountSecondsPassed: number,
    markCurrentCycleAsFineshed: () => void,
    setSecondsPassed: (seconds: number) => void,
    createNewCycle: (data : CreateCycleData) => void
    interruptCycle: () => void
}

export const CycleContext = createContext({} as CycleContextType)

interface CycleContextProviderProps {
    children: ReactNode
}
export const CycleContextProvider = ({ children }: CycleContextProviderProps) => {
    const [cyclesState, dispatch] = useReducer(cycleReducer, {
        cycles: [],
        activeCycleID: null
    }, (initialState) => {
        const storageStateJSON = localStorage.getItem('@timer:cycle-state-1.0.0')

        if(storageStateJSON){
            return JSON.parse(storageStateJSON)
        }
        return initialState
    })

    const { cycles, activeCycleID } = cyclesState

    const activeCycle = cycles.find( (cycle: any) =>cycle.id === activeCycleID )
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(()=> {
        if(activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@timer:cycle-state-1.0.0', stateJSON)
    },[cyclesState])

    const setSecondsPassed = (seconds: number) => {
        setAmountSecondsPassed(seconds)
    }

    const markCurrentCycleAsFineshed = () => {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    const createNewCycle = (data: CreateCycleData) => {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
    }    

    const interruptCycle = () => {
        dispatch(intrruptCurrentCycleAction())
    }
        
    return (
        <CycleContext.Provider
         value={{
            cycles,
            activeCycle,
            activeCycleID,
            amountSecondsPassed,
            markCurrentCycleAsFineshed,
            setSecondsPassed,
            createNewCycle,
            interruptCycle,
        }}>
           {children}
        </CycleContext.Provider>
    )
}