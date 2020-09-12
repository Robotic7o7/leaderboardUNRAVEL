const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Participant = mongoose.model('Participant');

router.get('/', (req, res) => {
    res.render("participant/addOrEdit", {
        viewTitle: "Insert "
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var participant = new Participant();
    participant.fullName = req.body.fullName;
    participant.email = req.body.email;
    participant.mobile = req.body.mobile;
    participant.city = req.body.city;
    participant.save((err, doc) => {
        if (!err)
            res.redirect('participant/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("participant/addOrEdit", {
                    viewTitle: "Insert participant",
                    participant: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Participant.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('participant/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("participant/addOrEdit", {
                    viewTitle: 'Update participant',
                    participant: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
  Participant.find((err, docs) => {
        if (!err) {
            res.render("participant/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving participant list :' + err);
        }
    });
});


router.get('/dashboard', (req, res) => {
    Participant.find((err, docs) => {
        if (!err) {
            res.render("participant/dashboard", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving participant list :' + err);
        }
    });
});

//for validation de formulaire 
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Participant.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("participant/addOrEdit", {
                viewTitle: "Update Participant",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Participant.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/participant/list');
        }
        else { console.log('Error in participant delete :' + err); }
    });
});

module.exports = router;