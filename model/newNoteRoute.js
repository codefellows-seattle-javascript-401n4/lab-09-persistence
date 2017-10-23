'use strict';

const router = require('../lib/router.js');
const noteHandlers = require('./noteHandlers.js');

router.post('/api/notes', noteHandlers.post);
router.get('api/notes', noteHandlers.get);
router.delete('api/notes', noteHandlers.delete);
