'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.post('/:id', controller.create);
router.put('/api/document/:id', controller.update);
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);

module.exports = router;
