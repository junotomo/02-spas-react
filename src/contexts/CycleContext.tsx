import { ReactNode, createContext, useState } from "react"

interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
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

interface CycleContextProviderChildren {
    children: ReactNode
}
export const CycleContextProvider = ({ children }: CycleContextProviderChildren) => {
    const [cycles, setCycles ] = useState<Cycle[]>([])
    const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) =>cycle.id === activeCycleID )

    const setSecondsPassed = (seconds: number) => {
        setAmountSecondsPassed(seconds)
    }

    const markCurrentCycleAsFineshed = () => {
        setCycles(state => 
            state.map( cycle => {
                if(cycle.id === activeCycleID){
                    return {...cycle,finishedDate: new Date()}
                } else{
                    return cycle
                 }
            }),
        )
    }

    const createNewCycle = (data: CreateCycleData) => {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleID(id)
    }    


    const interruptCycle = () => {
        setCycles(state => state.map( cycle => {
            if(cycle.id === activeCycleID){
                return {...cycle,interruptedDate: new Date()}
            } else{
                return cycle
            }
        }))
        setActiveCycleID(null)
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