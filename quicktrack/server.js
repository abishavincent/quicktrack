const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/clockify', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const entrySchema = new mongoose.Schema({
    date: String,
    startTime: String,
    endTime: String,
    description: String
});

const Entry = mongoose.model('Entry', entrySchema);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/addEntry', async (req, res) => {
    try {
        const { date, startTime, endTime, description } = req.body;
        const newEntry = new Entry({ date, startTime, endTime, description });
        await newEntry.save();

        res.json({ message: 'Entry added successfully', entry: newEntry });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/entries', async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
