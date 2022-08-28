const { log } = require('console');
const express = require('express')
const router = express.Router();
require('../DB/connection')
const User = require('../model/userSchema')
const newVoter = require('../model/voterListSchema')
const Voter = require('../model/voteRecordSchema')


router.post('/search', async function(req, res) {
    try {
        console.log('in search');
        const user = req.body
        const epicExists = await User.findOne({ epic: user.epic })
        if (epicExists == null) {
            console.log(19);
            const voterExists = await newVoter.findOne({ epic: user.epic })
            if (voterExists == null)
                res.status(500).json({ msg: 'epic does not exists' })
            else {
                if (voterExists.authkey !== user.authkey) {
                    console.log(user.authkey);
                    console.log(voterExists.authkey);
                    res.status(401).json({ msg: 'invalid authkey' });
                } else {
                    const aadharExists = await User.findOne({ aadhar: user.aadhar })
                    if (aadharExists != null) {
                        res.status(404).json({ msg: 'aadhar registered' })
                    } else {
                        console.log(31);
                        res.json({ msg: 'success' })
                    }
                }
            }
        } else {
            res.status(400).json({ msg: 'epic registered' })
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/register', async function(req, res) {
    try {
        const user = req.body
        console.log("line 14 : " + user._id);
        const userExists = await User.findOne({ epic: user.epic })

        if (userExists == null) {
            let USerObj = new User(user)
            await USerObj.save()
            res.json({
                message: 'Added'
            })
        } else {
            console.log("id exists");
            console.log(userExists.aadhar);
            res.status(400).send("user exists")
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/verify', async function(req, res) {
    try {
        const user = req.body
        console.log('epic : ' + user.epic);
        const epicValid = await User.findOne({ epic: user.epic })
        if (epicValid == null) {
            res.status(400).json({ msg: 'not registerd' })
        } else {
            if (user.password !== epicValid.password) {
                res.status(404).json({ msg: 'wrong password' })
            } else {
                res.json({ msg: 'success' });
            }
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/fetchDetails', async function(req, res) {
    try {
        const user = req.body
        console.log(user.epic);
        const userDetails = await newVoter.findOne({ epic: user.epic })
        if (userDetails) {
            console.log("in if block of fetch");
            console.log('name : ' + userDetails.name);
            res.json({
                name: userDetails.name,
                epic: userDetails.epic,
                ac: userDetails.ac,
                pc: userDetails.pc
            })
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/addStatus', async function(req, res) {
    try {
        const Epic = req.body.epic;
        console.log('111 ' + Epic);
        const user = {
            epic: Epic,
            status: "Not Voted"
        }
        console.log('115 : ' + user.epic);

        let newEpic = new Voter(user)
        await newEpic.save()
        res.send('added')
    } catch (err) {
        console.log(err);
    }
})

router.post('/fetchVoteStatus', async function(req, res) {
    try {
        const Epic = req.body.epic
        const userStatus = await Voter.findOne({ epic: Epic })
        res.json({ status: userStatus.status })
    } catch (err) {
        console.log(err);
    }
})

router.post('/updateVoteStatus', async function(req, res) {
    try {
        console.log('update vote status');
        const Epic = req.body.epic
        await Voter.updateOne({ epic: Epic }, { $set: { status: "Voted" } })
        res.json({ msg: 'status updated' });
    } catch (err) {
        console.log(err);
    }
})

module.exports = router