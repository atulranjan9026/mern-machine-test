import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Typography, Box
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import api from '../api/axios';

const AgentManagement = () => {
  const [agents, setAgents] = useState([]);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      mobile: Yup.string().required('Mobile number is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await api.post('/agents', values);
        setAgents(prev => [...prev, res.data]);
        resetForm();
        setOpen(false);
      } catch (err) {
        alert(err.response?.data?.message || 'Error creating agent');
      }
    }
  });

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await api.get('/agents');
        setAgents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAgents();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Agent Management
      </Typography>

      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Agent
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Mobile</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent._id}>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.mobile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Agent Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Agent</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              label="Name"
              name="name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              label="Email"
              name="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Box sx={{ mt: 2, mb: formik.touched.mobile && formik.errors.mobile ? 0 : 2 }}>
              <PhoneInput
                international
                defaultCountry="IN"
                value={formik.values.mobile}
                onChange={(value) => formik.setFieldValue('mobile', value)}
                onBlur={() => formik.setFieldTouched('mobile', true)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '16px',
                  border: formik.touched.mobile && formik.errors.mobile ? '1px solid #d32f2f' : '1px solid rgba(0,0,0,0.23)',
                  borderRadius: '4px',
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
                }}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                  {formik.errors.mobile}
                </Typography>
              )}
            </Box>

            <TextField
              margin="normal"
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={formik.handleSubmit}>Add Agent</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentManagement;
