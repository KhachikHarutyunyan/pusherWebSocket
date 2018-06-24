const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/votes');

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '548762',
  key: '554f1f242382a58e46ca',
  secret: '666340e1dff989fefe11',
  cluster: 'ap2',
  encrypted: true
});

router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  };

  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });

    return res.json({ success: true, message: 'Thank you for voting' });
  });

  
});

module.exports = router;

