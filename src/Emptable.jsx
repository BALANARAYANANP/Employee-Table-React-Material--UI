import React from 'react';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  TableSortLabel,
  Chip,
} from '@mui/material';

const employees = [
  { name: 'Peacock Janet', location: 'Argentina', status: 'Active', trustworthiness: 'Perfect', rating: 2, softwareProficiency: 52 },
  { name: 'Anton Kathryn', location: 'Sweden', status: 'Inactive', trustworthiness: 'Sufficient', rating: 1, softwareProficiency: 43 },
  { name: 'Janet Margaret', location: 'Canada', status: 'Active', trustworthiness: 'Perfect', rating: 2, softwareProficiency: 46 },
  { name: 'Smith', location: 'Australia', status: 'Active', trustworthiness: 'Sufficient', rating: 2, softwareProficiency: 50 },
  { name: 'Willamson', location: 'Newzealand', status: 'Inactive', trustworthiness: 'Perfect', rating: 1, softwareProficiency: 43 },
  { name: 'Brathwate', location: 'West Indies', status: 'Active', trustworthiness: 'Sufficient', rating: 2, softwareProficiency: 86},
  { name: 'Butler', location: 'England', status: 'InActive', trustworthiness: 'Perfect', rating: 1, softwareProficiency: 20},
  // ...add the rest of the data here
];

const columns = [
  { id: 'name', label: 'Employee Name' },
  { id: 'location', label: 'Location' },
  { id: 'status', label: 'Status' },
  { id: 'trustworthiness', label: 'Trustworthiness' },
  { id: 'rating', label: 'Rating' },
  { id: 'softwareProficiency', label: 'Software Proficiency' },
];

const statusColors = {
  Active: 'success',
  Inactive: 'error',
};

const trustworthinessIcons = {
  Perfect: '🌟',
  Sufficient: '👍',
  Insufficient: '❗',
};

const ratingStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

export function Emp() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sortDirection={orderBy === column.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {employees
            .slice()
            .sort((a, b) => {
              if (orderBy === 'rating') {
                return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
              }
              if (a[orderBy] < b[orderBy]) {
                return order === 'asc' ? -1 : 1;
              }
              if (a[orderBy] > b[orderBy]) {
                return order === 'asc' ? 1 : -1;
              }
              return 0;
            })
            .map((employee) => (
              <TableRow key={employee.name}>
                <TableCell>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{employee.name.charAt(0)}</Avatar>
                  <Typography>{employee.name}</Typography>
                </TableCell>
                <TableCell>{employee.location}</TableCell>
                <TableCell>
                  <Chip label={employee.status} color={statusColors[employee.status]} />
                </TableCell>
                <TableCell>
                  {trustworthinessIcons[employee.trustworthiness]} {employee.trustworthiness}
                </TableCell>
                <TableCell>{ratingStars(employee.rating)}</TableCell>
                <TableCell>{employee.softwareProficiency}%</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

