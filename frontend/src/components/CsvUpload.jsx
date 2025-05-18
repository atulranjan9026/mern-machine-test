import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { 
  Button, Typography, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  Box, CircularProgress, Alert 
} from '@mui/material';
import api from '../api/axios';

const CsvUpload = () => {
  const { CSVReader } = useCSVReader();
  const [previewData, setPreviewData] = useState([]);
  const [distributionResult, setDistributionResult] = useState({
    message: '',
    totalItems: 0,
    distributedContacts: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUploadAccepted = (results) => {
    setError(null);
    setDistributionResult({
      message: '',
      totalItems: 0,
      distributedContacts: []
    });
    
    if (results.data.length === 0) {
      setError('CSV file is empty');
      return;
    }

    const headers = Object.keys(results.data[0]);
    const normalizedHeaders = headers.map(h => h.toLowerCase());
    
    if (!normalizedHeaders.includes('firstname') || !normalizedHeaders.includes('phone')) {
      setError('CSV must contain "firstName" and "phone" columns');
      return;
    }

    const formattedData = results.data
      .map(row => ({
        firstName: row.firstName || row.firstname || row.FirstName || '',
        phone: String(row.phone || row.Phone || ''),
        notes: row.notes || row.Notes || ''
      }))
      .filter(row => row.firstName && row.phone)
      .slice(0, 10);
    
    setPreviewData(formattedData);
  };

  const handleSubmit = async () => {
    if (previewData.length === 0) {
      setError('No valid data to upload');
      return;
    }

    setLoading(true);
    try {
      const csvContent = [
        ['firstName', 'phone', 'notes'],
        ...previewData.map(item => [
          `"${item.firstName.replace(/"/g, '""')}"`,
          item.phone,
          `"${item.notes.replace(/"/g, '""')}"`
        ])
      ].join('\n');

      const formData = new FormData();
      formData.append('file', new Blob([csvContent], { type: 'text/csv' }), 'contacts.csv');

      const res = await api.post('/lists/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Backend response:', res.data);

      setDistributionResult({
        message: res.data.message || 'Distribution completed successfully',
        totalItems: res.data.totalItems || previewData.length,
        distributedContacts: Array.isArray(res.data.distributedContacts) 
          ? res.data.distributedContacts 
          : Array.isArray(res.data.distributedLists)
            ? res.data.distributedLists
            : [] // Fallback to empty array
      });

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Upload CSV File</Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
        Please upload a CSV file with columns: firstName, phone, notes
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <CSVReader
          onUploadAccepted={handleUploadAccepted}
          accept=".csv,.xlsx,.xls"
          config={{
            header: true,
            skipEmptyLines: true
          }}
        >
          {({ getRootProps, acceptedFile }) => (
            <Box>
              <Button variant="contained" {...getRootProps()}>
                Browse files
              </Button>
              {acceptedFile && (
                <Typography sx={{ mt: 1 }}>
                  Selected: {acceptedFile.name} ({previewData.length} valid records)
                </Typography>
              )}
            </Box>
          )}
        </CSVReader>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
          <CircularProgress size={24} />
          <Typography>Processing and distributing contacts...</Typography>
        </Box>
      )}

      {previewData.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>Preview (First {previewData.length} rows)</Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previewData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={loading}
          >
            Process and Distribute
          </Button>
        </>
      )}

{distributionResult.distributedContacts.length > 0 && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" gutterBottom>
      {distributionResult.message || 'Distribution Results'}
    </Typography>
    <Typography sx={{ mb: 2 }}>
      Total items distributed: {distributionResult.totalItems}
    </Typography>

    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {distributionResult.distributedContacts.map((contact, i) => (
            <TableRow key={i}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
)}

    </Box>
  );
};

export default CsvUpload;