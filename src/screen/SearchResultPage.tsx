import { useCallback, useEffect, useRef, useState } from "react"

type Props = {}
type RowProp = {data:{id:number,question_name:string,difficulty:string,acceptence_rate:string,companies:string,frequency:number,leetcode_link:string}}
function ResutTableRow({data}:RowProp){
    data.companies = data.companies.replace(/'/g, '"');
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.id}
            </th>
            <td className="px-6 py-4">
                <a href={data.leetcode_link} className="hover:text-blue-700" target="_blank">{data.question_name}</a>
            </td>
            <td className="px-6 py-4">
                {data.difficulty}
            </td>
            <td className="px-6 py-4">
                {data.acceptence_rate}
            </td>
            <td className="px-6 py-4">
                <div className="grid grid-cols-6 gap-y-2">
                {JSON.parse(data.companies).map((val:string)=>
                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-1 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    {val}
                </span>
                )}
                </div>
            </td>
            <td className="px-6 py-4">
                {Number(data.frequency).toFixed(2)}
            </td>
            <td className="px-6 py-4">
                
            </td>
        </tr>
    )
}




export default function SearchResultPage({}: Props) {
    const [data,setData] = useState<any[]>([])
    const [page,setPage] = useState<number>(1)
    const [loading,setLoading] = useState<boolean>(false)
    const observer = useRef<any>()
    const Baseurl = `https://leetcode-questions-companywise-backend.onrender.com?page=${page}`
    useEffect(()=>{
        setLoading(true)
        fetch(Baseurl).then(async v=>{
            const d = await v.json()
            
            setData([...data,...d])
            setLoading(false)
        })
    },[page])
    
    const lastElementRef = useCallback((node:any) => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading]);
  return (
    <div className="p-5">
        <div>
            <div className="pb-4 bg-white dark:bg-gray-900">
                <label  className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                
                            </th>
                            <th scope="col" className="p-4">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Difficulty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acceptance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Companies
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Frequency
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Resource
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((val,idx)=>
                                <ResutTableRow key={idx} data={val} />
                            )
                        }
                        <tr ref={lastElementRef} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                            <th colSpan={6}>Loading...</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}