import React from 'react';
import styles from './BetTable.module.css';

const dummyRowData= [
   /* {
        percentage : "15",
        deposits : '200k to 2000k',
        min_active_use : '5',
        new_user : '3',
    },
    {
        percentage : "15",
        deposits : '200k to 2000k',
        min_active_use : '5',
        new_user : '3',
    },
    {
        percentage : "15",
        deposits : '200k to 2000k',
        min_active_use : '5',
        new_user : '3',
    },
    {
        percentage : "15",
        deposits : '200k to 2000k',
        min_active_use : '5',
        new_user : '3',
    }*/
];

const dummyColumnData = [
    {fieldName : 'percentage', title : '%', cellStyle:{}},
    {fieldName : 'deposits', title : 'Deposits'},
    {fieldName : 'min_active_use', title : 'Min. Active User'},
    {fieldName : 'new_user', title : 'New Users', render:(rowData,data)=><div>{data}</div>},
];

const BetTable = ({greenNote='',column=dummyColumnData,rows=dummyRowData}) => {
    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                <tr>
                    {column?.map((item,index)=>(
                        <th
                            key={`th_${index}_${item?.title}`}
                            style={{...item.headerCellStyle}}
                        >{item?.title}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {(rows || [])?.map((row,colIndex) =>{
                    let count = 0;
                    let isColSpan = false;
                    return(
                        <tr key={`${colIndex}`}>
                            {column?.map((item,rowIndex)=>{
                                if(row?.colspan?.length && row.colspan[0] === item.fieldName) {
                                    count = row.colspan[1] + 1;
                                    isColSpan = true
                                }else {
                                    isColSpan = false;
                                }
                                count = count -1;
                                if(isColSpan || count <= 0) return(
                                    <td
                                        key={`td_${rowIndex}_${row[item.fieldName]}`}
                                        style={{...item.bodyCellStyle}}
                                        colSpan={(row?.colspan && row.colspan[0] === item.fieldName) ?  row.colspan[1] : 0}
                                    >{item.render ? item?.render(row,row[item.fieldName]) : row[item.fieldName]}</td>
                                )
                                if(count > 0) return null
                            })}
                        </tr>
                    )
                })}
                </tbody>
                {greenNote && <tfoot>
                <tr>
                    <td colSpan="4">{greenNote}</td>
                </tr>
                </tfoot>}
            </table>
        </div>

    )
};

export default BetTable;