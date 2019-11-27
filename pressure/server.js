const express = require('express');
const mongoose = require('./db/connection.js');
const methodOverride = require('method-override');

const port = 3000;

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const Tasks = require('./models/Tasks.js');

const tasksController = require('./controllers/tasks.js');


//index route, will only show tasks past due or due today
app.get('/', (req, res) => {
    console.log('index accessed');
    Tasks.find((err, tasks) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index.ejs', {
                tasks: tasks
            });
        }
    });
});

app.use('/tasks', tasksController);

mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

//listening...
app.listen(port, () => {
	console.log(`shhh... listenning... port ${port}`);
});