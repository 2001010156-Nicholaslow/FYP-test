import Axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react"
import { useTable } from 'react-table'

import './Application.css'

function ReviewApplication(){

    const { oppId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/opportunity/' + oppId + '/application').then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

                setIsError(false);
                setItems(response.data)
            }, (error) =>{
                setIsLoaded(true);
                setIsError(true);
            }
        )
    }, []);

    if(oppId == null)
    {
        throw new Error("No opportunity ID provided");
    }

    const columns = useMemo(() => 
    [
        {
            Header: 'Full Name',
            accessor: 'full_name'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Contact Number',
            accessor: 'contact_number'
        },
    ], [])
    const data = useMemo(() => items)

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    if(!isLoaded)
    {
        return(<div>loading</div>);
    }
    else
    {
        if(!isError)
        {
            console.log(items)
            return(
                <div>
                    <table {...getTableProps()}>
                        <thead>
                            {
                                headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}> 
                                        {
                                            headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps()}>
                                                    {column.render('Header')}
                                                </th>
                                            ))
                                        } 
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {
                                rows.map(row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>  
                                            {row.cells.map((cell) => {
                                                return(
                                                    <td {...cell.getCellProps()}>
                                                        {cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default ReviewApplication;