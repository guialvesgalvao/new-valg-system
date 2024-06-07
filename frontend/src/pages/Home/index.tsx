import { Tile } from "../../components/Tile/Tile";
import { createBill, getBills, updateBill } from "../../shared/repositories/biils";

export default function Home () {
    
    return (
        <div>
            <h1>Home</h1>
            <div>
                <Tile
                backgroundColor="#fff" 
                hoverColor={"red"} 
                title={"Tile"} 
                borderColor={"blue"}
                fontColor="yellow"
                counter={3}               
                />
            </div>
            <div>
            <h1>Recurring BIll</h1>
            <button onClick={async () => await getBills({tableName: 'recurring_bills'})}>Testar</button>
            <button onClick={async () => await getBills({tableName: 'recurring_bills', id: 3})}>Pegar 1</button>
            <button onClick={async () => await createBill({ tableName: 'recurring_bills', bill: {
                    name: 'New Bill',
                    average_value: 150.0,
                    day_due_date: 15,
                    relational_code: 12345
                }})}>Criar</button>
            <button onClick={async () => await updateBill({ tableName: 'recurring_bills', id: 3, bill: {
                    name: 'Bla bla',
                }})}>Editar</button>

            </div>

            <div>
            <h1>BIll</h1>
            <button onClick={async () => await getBills({tableName: 'bills'})}>Testar</button>
            <button onClick={async () => await getBills({tableName: 'bills', id: 1})}>Pegar 1</button>
            <button onClick={async () => await createBill({ tableName: 'bills', bill: {
                    name: 'New Bill',
                    value: 150.0,
                    due_date: 15,
                    relational_code: 12345,
                    status: 'paga',
                    priority: 1,
                   modified: new Date().toISOString                
                }})}>Criar</button>
            <button onClick={async () => await updateBill({ tableName: 'bills', id: 1, bill: {
                    name: 'Bla bla',
                }})}>Editar</button>

            </div>
        </div>
    )
}