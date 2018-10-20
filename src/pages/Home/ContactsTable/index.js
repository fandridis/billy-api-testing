import React from 'react';
import ReactTable from "react-table";

const columns = [{
  Header: 'Name',
  accessor: 'name' // String-based value accessors!
}, {
  Header: 'Type',
  accessor: 'type'
  // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
  Header: 'Phone',
  accessor: 'phone'
  // id: 'friendName', // Required because our accessor is not a string
  // Header: 'Friend Name',
  // accessor: d => d.friend.name // Custom value accessors!
}, {
  Header: 'Country',
  accessor: 'countryId'
  // Header: props => <span>Friend Age</span>, // Custom header components!
  // accessor: 'friend.age'
}];

const  ContactsTable = (props) => {

  console.log('props @ ContactsTable: ', props);

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