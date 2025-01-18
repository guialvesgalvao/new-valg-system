import { BillsRepo } from "@/shared/repositories/bills-repo"

export default function Auth () {

    const x = new BillsRepo().getBills();

    return ( 
        <div className="">
            Olá, Mundo! Seja bem vindo a página de autenticação. 
        </div>
    )
}