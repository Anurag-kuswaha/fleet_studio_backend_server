
const express = require('express');
const app = express();
const axios = require('axios');
const { getCommitResponse, getCommitDiffData } = require('./helper');
const baseURL = 'https://api.github.com/repos';
// get commit details
app.get('/:owner/:repository/commits/:oid/', async (req, res) => {
    console.log('hitting the server');
    const { owner, repository, oid } = req.params;
    try {
        const response = await axios.get(`${baseURL}/${owner}/${repository}/commits/${oid}`);
        // console.log('response  is ', response);
        const commitData = response.data;
        const responseData = await getCommitResponse(commitData);
        res.json(responseData);
    } catch (error) {
        console.error('Error fetching data from GitHub', error);
        res.status(500).send('Internal Server Error');
    }
});

// dff commit details
app.get('/:owner/:repository/commits/:oid/diff', async (req, res) => {
    const { owner, repository, oid } = req.params;
    try {
        const response = await axios.get(`${baseURL}/${owner}/${repository}/commits/${oid}`);
        // console.log('response  is ', response);
        const commitData = response.data;
        //console.log('commit data is ', commitData);
        const transformedData = await getCommitDiffData(commitData);
        res.json({data:transformedData});
    } catch (error) {
        console.error('Error fetching data from GitHub', error);
        res.status(500).send('Internal Server Error');
    }

});

module.exports = app
