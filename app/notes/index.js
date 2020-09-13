const { Router } = require('express');

const {
  getCollection,
  findNote,
  showIndex,
  showCreate,
  createNote,
  showView,
  showUpdate,
  updateNote,
  showDelete,
  deleteNote,
} = require('./controller');

const router = Router();

router.use(getCollection);

router.param('id', findNote);

router.get('/', showIndex);

router.route('/create').get(showCreate).post(createNote);

router.get('/:id', showView);

router.route('/:id/update').get(showUpdate).post(updateNote);

router.route('/:id/delete').get(showDelete).post(deleteNote);

module.exports = router;
