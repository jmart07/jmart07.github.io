const express = require('express');
const router = express.Router();

const Tasks = require('../models/Tasks.js');

//Index
router.get('/', (req, res) => {
    console.log('tasks accessed');
    Tasks.find((err, tasks) => {
        if(err) {
            console.log(err);
        } else {
            res.render('tasks/index.ejs', {
                tasks: tasks
            });
        }
    });
});
//New
router.get('/new', (req, res) => {
    console.log('new accessed');
    res.render('tasks/new.ejs');
})
//Show
router.get('/:id', (req, res) => {
    console.log(`show accessed. ID: ${req.params.id}`);
    Tasks.findById(req.params.id, (err, task) => {
        err ? console.log(err) : res.render(
            'tasks/show.ejs', {
                task: task
            }
        );
    });
});
//Create
router.post('/', (req, res) => {
    Tasks.create(req.body, (err, createdTask) => {
        if(err) {
            console.log(err);
        } else {
            console.log(`Created: ${createdTask}`);
            res.redirect('/tasks');
        }
    })
});
//Edit
router.get('/edit/:id', (req, res) => {
    console.log(`edit accessed. ID: ${req.params.id}`);
    Tasks.findById(req.params.id, (err, task) => {
        err ? console.log(err) : res.render(
            'tasks/edit.ejs', {
                task: task
            }
        );
    });
});
router.put('/:id', (req, res) => {
    console.log(`edit submitted`);
    Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedTask) => {
        if(err) {
            console.log(err)
        } else {
            console.log(`Edited to: ${updatedTask}`);
            res.redirect('/tasks');
        }
    });
});
//Delete
router.delete('/:id', (req, res) => {
    console.log(`delete accessed. ID: ${req.params.id}`)
    Tasks.findByIdAndRemove(req.params.id, (err, foundTask) => {
        if(err) {
            console.log(err)
        } else {
            console.log(`deleting: ${foundTask}`);
            res.redirect('/tasks');
        }
    })
});

module.exports = router;