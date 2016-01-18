'use strict';

var express = require('express');
var controller = require('./document.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.post('/api/document/create', controller.create);
router.put('/api/document/:id', controller.update);
router.get('/:id', controller.show);
router.delete('/api/document/delete/:id', controller.destroy);
router.delete('/api/document/remove/:id', controller.remove);

module.exports = router;
