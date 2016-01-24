'use strict';

var express = require('express');
var controller = require('./file.controller');

var router = express.Router();

router.get('/:id', controller.read);
router.post('./uploads', controller.create);
router.delete('/api/file/delete/:id', controller.destroy);
router.delete('/api/file/destroyAll/:id', controller.destroyAll);
router.get('/api/file/:id', controller.read);

module.exports = router;

