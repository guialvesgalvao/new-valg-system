'use client'

import { BillCard } from "@/components/custom/bill-card";
import { BillsRepo } from "@/shared/repositories/bills-repo";


export default async function Main () {

        async function teste() {
            const response = await fetch('http://localhost:3000/api/bills')
            console.log(response)
        } 


    return ( 
        <div className="">
            <button onClick={teste}>Clique me</button>
            <BillCard 
            id={1}
            amount={39}
            /> 
        </div>
    )
}