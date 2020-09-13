const { ObjectID } = require('mongodb');

module.exports = {
  getCollection: (req, res, next) => {
    req.notes = req.app.database.collection('notes');

    next();
  },

  findNote: async (req, res, next, id) => {
    const note = await req.notes.findOne({ _id: ObjectID(req.params.id) });

    if (!note) return res.redirect('/');

    req.note = note;

    next();
  },

  showIndex: async (req, res) => {
    const notes = await req.notes.find().toArray();

    res.render('notes/views/index', { notes });
  },

  showCreate: (req, res) => {
    res.render('notes/views/create');
  },

  createNote: async (req, res) => {
    const note = req.body;

    await req.notes.insertOne(note);

    res.redirect('/');
  },

  showView: async (req, res) => {
    res.render('notes/views/view', { note: req.note });
  },

  showUpdate: (req, res) => {
    res.render('notes/views/update', { note: req.note });
  },

  updateNote: async (req, res) => {
    await req.notes.updateOne({ _id: ObjectID(req.params.id) }, { $set: req.body });

    res.redirect(`/notes/${req.params.id}`);
  },

  showDelete: (req, res) => {
    res.render('notes/views/delete', { note: req.note });
  },

  deleteNote: async (req, res) => {
    await req.notes.deleteOne({ _id: ObjectID(req.params.id) });

    res.redirect('/notes');
  },
};
