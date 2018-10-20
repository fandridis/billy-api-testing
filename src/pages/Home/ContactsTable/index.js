import React from 'react';
import ReactTable from "react-table";

const columns = [{
  Header: 'Name',
  accessor: 'name'
}, {
  Header: 'Type',
  accessor: 'type'
}, {
  Header: 'Phone',
  accessor: 'phone'
}, {
  Header: 'Country',
  accessor: 'countryId'
}];

const  ContactsTable = (props) => {

  return (
    <ReactTable
      data={props.contacts}
      columns={columns}
      sortable={true}
      filterable={true}
      defaultPageSize={10}
      getTrProps={(state, rowInfo) => {
        if (rowInfo && rowInfo.row) {
          return {
            onClick: (e) => {
              props.selectRow(rowInfo.index)
            },
            style: {
              background: rowInfo.index === props.selectedRowIndex ? '#539CDF' : 'white',
              color: rowInfo.index === props.selectedRowIndex ? 'white' : 'black'
            }
          }
        }else{
          return {}
        }
      }}
    />
  );
};

export default ContactsTable;