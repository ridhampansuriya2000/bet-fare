import React from 'react';
import styles from './Table.module.css';

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
    {fieldName : 'min_active_use', title : 'Min. Active User',renderHeaderRow:(rowData)=><div>{rowData?.min_active_use}</div>},
    {fieldName : 'new_user', title : 'New Users', render:(rowData,data)=><div>{data}</div>},
];

const Table = ({
                   greenNote='',
                   column=dummyColumnData,
                   rows=dummyRowData,
                   emptyMessage='No record found',
                   fontSize=17,
                   textAlign='center',
                   cellStyle={},
                   selectedRowIndex='',
               }) => {

    let headerTR = column?.find((item)=> item?.renderHeaderRow);
    let subDataTR = column?.find((item)=> item?.renderSubDataRow);

    return (
        <div className={styles.tableContainer}>
            <table style={{fontSize : `${fontSize}px`, textAlign : textAlign}}>
                <thead style={{fontSize : `${fontSize +(fontSize*15/100)}px`}}>
                <tr>
                    {column?.map((item,index)=>(
                        <th
                            key={`th_${index}_${item?.title}`}
                            style={{...item.headerCellStyle}}
                        >{item?.renderColumn ? item?.renderColumn({column,columnIndex:index,rows,data:item?.title}) : item?.title}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {(rows || [])?.map((row,rowIndex) =>{
                    if(Array.isArray(row)){
                        return (
                            <>
                                {headerTR &&
                                <tr className={`${styles.headerTR} ${headerTR?.headerTRStyle}`} key={`${rowIndex}_headerTR`}>
                                    <td colSpan={0} >
                                        {headerTR
                                            ? headerTR?.renderHeaderRow?.(row?.[0])
                                            : ''}
                                    </td>
                                </tr>}
                                {row?.map((subRow,subRowIndex)=>{
                                    let count = 0;
                                    let isColSpan = false;
                                    return (
                                    <>
                                        <tr key={`${subRowIndex}_${rowIndex}`} className={styles.dataTR}>
                                            {column?.map((item,colIndex)=>{
                                                if(subRow?.colspan?.length && subRow.colspan[0] === item.fieldName) {
                                                    count = subRow.colspan[1] + 1;
                                                    isColSpan = true
                                                }else {
                                                    isColSpan = false;
                                                }
                                                count = count -1;
                                                if(isColSpan || count <= 0) return(
                                                    <td
                                                        key={`td_${colIndex}_${row[item.fieldName]}`}
                                                        style={{...item.bodyCellStyle,...cellStyle}}
                                                        colSpan={(subRow?.colspan && subRow.colspan[0] === item.fieldName) ?  subRow.colspan[1] : 0}
                                                    >{item.render ? item?.render(subRow,subRow[item.fieldName]) : subRow[item.fieldName]}</td>
                                                )
                                                if(count > 0) return null
                                            })}
                                        </tr>
                                    </>
                                )})}
                            </>
                        )
                    }else {
                        let count = 0;
                        let isColSpan = false;
                        return(
                        <>
                            {headerTR &&
                            <tr className={`${styles.headerTR} ${headerTR?.headerTRStyle}`} key={`headerTR_${rowIndex}`}>
                                <td colSpan={0} >
                                    {headerTR
                                        ? headerTR?.renderHeaderRow?.(row)
                                        : ''}
                                </td>
                            </tr>}
                            <tr key={`${rowIndex}_TR`} className={styles.dataTR}>
                                {column?.map((item,colIndex)=>{
                                    if(row?.colspan?.length && row.colspan[0] === item.fieldName) {
                                        count = row.colspan[1] + 1;
                                        isColSpan = true
                                    }else {
                                        isColSpan = false;
                                    }
                                    count = count -1;
                                    if(isColSpan || count <= 0) return(
                                        <td
                                            key={`td_${colIndex}_${row[item.fieldName]}`}
                                            style={{...item.bodyCellStyle,...cellStyle}}
                                            colSpan={(row?.colspan && row.colspan[0] === item.fieldName) ?  row.colspan[1] : 0}
                                        >{item.render ? item?.render(row,row[item.fieldName],rowIndex) : row[item.fieldName]}</td>
                                    )
                                    if(count > 0) return null
                                })}
                            </tr>
                            {selectedRowIndex === rowIndex && subDataTR &&
                            <tr className={`${styles.headerTR} ${headerTR?.headerTRStyle}`} key={`headerTR_${rowIndex}`}>
                                <td className={styles.dataTRtd} colSpan={column?.length}>
                                    {subDataTR.renderSubDataRow({rowData:row,rowIndex,metaData:row?.metaData})}
                                </td>
                            </tr>}
                        </>
                    )}
                })}
                </tbody>
                {greenNote && <tfoot>
                <tr>
                    <td colSpan="4">{greenNote}</td>
                </tr>
                </tfoot>}
            </table>
            {!rows?.length && <div className={styles.emptyBox}>
                <>{emptyMessage}</>
            </div>}
        </div>

    )
};

export default Table;