// frontend/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Alert, Grid, Card, CardContent
} from '@mui/material';
import api from '../api/axios';

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalDistributions: 0,
    recentContacts: 0
  });
  console.log("stats:", stats);
  console.log("agents:", agents);
  console.log("distributions:", distributions);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch agents
        const agentsRes = await api.get('/agents');
        setAgents(agentsRes.data.slice(0, 5)); // Show only 5 most recent
       
        // Fetch recent distributions
        const distRes = await api.get('/lists');
        setDistributions(distRes.data.slice(0, 5)); // Show only 5 most recent
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Typography sx={{ mb: 3 }}>
        Welcome to the administration panel. Here's your quick overview.
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      {/* <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Agents
              </Typography>
              <Typography variant="h4">
                {stats.totalAgents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Distributions
              </Typography>
              <Typography variant="h4">
                {stats.totalDistributions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Recent Contacts
              </Typography>
              <Typography variant="h4">
                {stats.recentContacts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}

      {/* Recent Agents */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Recent Agents
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agents.map(agent => (
              <TableRow key={agent._id}>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.mobile}</TableCell>
              </TableRow>
            ))}
            {agents.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No agents found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Recent Distributions */}
      <Typography variant="h6" gutterBottom>
        Recent Distributions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Contacts</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {distributions.map((dist, i) => (
              <TableRow key={i}>
                <TableCell>{dist.firstName}</TableCell>
                <TableCell>
                  {new Date(dist.uploadDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{dist.phone}</TableCell>
                <TableCell>{dist.status || 'Completed'}</TableCell>
              </TableRow>
            ))}
            {distributions.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No distributions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;