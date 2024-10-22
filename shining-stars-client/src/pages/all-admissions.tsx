import React, { useState, useMemo } from "react";
import { useTable, useDelete, BaseRecord } from "@refinedev/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Print from '@mui/icons-material/Print';
import Delete from '@mui/icons-material/Delete';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Admission extends BaseRecord {
  _id: string;
  name: string;
  admission_no: string;
  date_of_birth: string;
  age: number;
  gender: string;
  grade: string;
  residence: string;
  term: string;
  emis_no: string;
}

const Admissions = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable<Admission>();  

  const { mutate: deleteAdmission } = useDelete();  
  const { id } = useParams();

  const allAdmissions = data?.data ?? [];

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : [],
    );

    return {
      name: logicalFilters.find((item) => item.field === "name")?.value || "",
    };
  }, [filters]);

  const handleDeleteClick = (admission: Admission) => {
    setSelectedAdmission(admission);
    setOpen(true);
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setSelectedAdmission(null);
  };

  const handleDeleteAdmission = () => {
    if (selectedAdmission) {
      deleteAdmission({
        resource: "admissions",
        id: selectedAdmission._id as string,
      });
      setOpen(false);
    }
  };


  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TablePagination
          component="div"
          count={pageCount * 10}
          page={current - 1}
          onPageChange={(event, newPage) => setCurrent(newPage + 1)}
          rowsPerPage={10}
          onRowsPerPageChange={(event) => setPageSize(parseInt(event.target.value, 10))}
        />
        <TextField
          label="Search by Name"
          variant="outlined"
          value={currentFilterValues.name}
          onChange={(e) => {
            setFilters([
              {
                field: "name",
                operator: "contains",
                value: e.target.value,
              },
            ]);
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#3f51b5' }}>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Pupil's Name</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Admission No</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Date Of Birth</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Age</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Gender</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Class</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Term</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Residence</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Emis No(LIN)</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAdmissions.map((admission, index) => (
              <TableRow
                key={admission._id}
                hover
                style={{
                  backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#bbdefb',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#90caf9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#e3f2fd' : '#bbdefb'}
              >
                <TableCell align="center">{admission.name}</TableCell>
                <TableCell align="center">{admission.admission_no}</TableCell>
                <TableCell align="center">{admission.date_of_birth}</TableCell>
                <TableCell align="center">{admission.age}</TableCell>
                <TableCell align="center">{admission.gender}</TableCell>
                <TableCell align="center">{admission.grade}</TableCell>
                <TableCell align="center">{admission.term}</TableCell>
                <TableCell align="center">{admission.residence}</TableCell>
                <TableCell align="center">{admission.emis_no}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#4caf50', color: 'white' }}
                      startIcon={<Print />}
                      onClick={() => navigate(`/print?id=${admission._id}`)}
                    >
                      PRINT
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#f44336', color: 'white' }}
                      startIcon={<Delete />}
                      onClick={() => handleDeleteClick(admission)}
                    >
                      DELETE
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the admission for {selectedAdmission?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCancelDelete} 
            color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAdmission} 
            color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admissions;
