import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import React, {useEffect, useState} from 'react';
import DeletePopUp from './DeletePopUp';
import UpdatePopUp from './UpdatePopUp';
import AddPopUp from './AddPopUp';

import './table.css';

const CrudTable = ({columns,model,data,setData,president,loading}) => {

    const [showUpdate,setShowUpdate] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [cols,setCols] = useState(columns)

    // testing shit
    var [selectedRow,setSelectedRow] = useState([]);

    const handleClose = () =>{
        setShowUpdate(false);
        setShowDelete(false);
        setShowAdd(false);
    }

    const handleEdit = (e) =>{
        selectedRow = data.filter((element) => element[0]==e.currentTarget.id)
        setSelectedRow(selectedRow[0])
        setShowUpdate(true);
    }

    const handleDelete = (e) =>{
        selectedRow = data.filter((element) => element[0]==e.currentTarget.id)
        setSelectedRow(selectedRow[0])
        setShowDelete(true);
    }

    const handleAdd = () =>{
        setShowAdd(true);
    }
    

    return(
        <div>
            
            <div>
                <UpdatePopUp president = {president} show={showUpdate} cols = {cols} selectedRow={selectedRow} setData = {setData} data= {data}  handleClose={handleClose} model={model}/>
                <DeletePopUp president = {president} data= {data} setData = {setData}  model = {model} show={showDelete} selectedRow={selectedRow} handleClose={handleClose} />
                <AddPopUp president = {president} data= {data} setData = {setData} show = {showAdd} cols = {cols} handleClose ={handleClose} model = { model }/>
            </div>  

            <table className="styled-table">
                <thead>
                <tr id = "crud-table-title" key={model} >
                    { cols.map(prop => {
                        return ( <th key={prop[1]} > {prop[1]} </th> )
                    })}
                    <th key={`${Math.floor((Math.random() * 1000))}-min`} >Action</th>
                </tr>
                </thead>

                <tbody>
                    {   
                        data.map(prop => {
                            return ( 
                                <tr key={prop[0]} className="active-row" >
                                    {prop.map( prop => {
                                        return (<td key={`${Math.floor((Math.random() * 1000))}-min`}>{prop}</td>)
                                        }) 
                                    }
                                <td key={prop[0]} > 
                                <button id ={prop[0]} className = "crud-button" onClick={(e) => {handleEdit(e)}} ><EditIcon sx={{ color : 'yellow'}} /></button>
                                <button id ={prop[0]} className="crud-button" onClick={(e) => {handleDelete(e)}}><DeleteIcon  sx = {{ color : 'red'}}/></button>
                                </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <button className="crud-button active-row" onClick={(e) => {handleAdd()}}>ADD </button>

        </div>
    )
}

export default CrudTable;