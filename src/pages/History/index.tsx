import { useContext } from "react"
import { HistoryContainer, HistoryList, Status } from "./styles"
import { CycleContext } from "../../contexts/CycleContext"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

export const History = () => {
    const { cycles } = useContext(CycleContext)

    return(
       <HistoryContainer>
            <h1>Meu histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle) => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>/{cycle.minutesAmount}</td>
                                    <td>
                                        {formatDistanceToNow(new Date(cycle.startDate), {
                                            addSuffix: true,
                                            locale:ptBR
                                        })}
                                    </td>
                                    <td>
                                        {cycle.finishedDate && (
                                            <Status statusColor="green">Concluded</Status>
                                        )}

                                        {cycle.interruptedDate && (
                                            <Status statusColor="red">Interrupted</Status>
                                        )}

                                    </td>
                                </tr>
                            )
                        })}
      
                    </tbody>
                </table>
            </HistoryList>
       </HistoryContainer>
    )
}