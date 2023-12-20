const express = require('express');
const Field = require('../modal/fieldsModal');
const { default: mongoose } = require('mongoose');
//const { signupUser, loginUser } = require('../controller/fieldsContrller')

const router = express.Router()
router.get("/", async (req, res) => {
    try {
        const fields = await Field.find().sort({ createdAt: -1 })
        res.status(200).json(fields)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json("no such field")
        }
        const field = await Field.findById(id)
        if (!field) {
            return res.status(404).json("no such field")
        }
        res.status(200).json(field)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.post("/", async (req, res) => {
    try {
        const newField = await Field.create(req.body);
        res.status(201).json(newField);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.get("/", async (req, res) => {
    try {
      const pitchType = req.query.pitchType;
      console.log('Pitch Type:', pitchType);
  
      const filter = {};
  
      if (pitchType) {
        filter.pitchType = new RegExp(pitchType, "i");
      }
  
      console.log('Filter:', filter);
  
      const data = await Field.find(filter);
      res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: "An error fetching Field" });
    }
  });
  router.put('/:id/update-image', async (req, res) => {
    const { id } = req.params;
    const { imageUrl } = req.body;
  
    try {
      // Find the field by ID
      const field = await Field.findByIdAndUpdate(id, { imageUrl }, { new: true });
  
      if (!field) {
        return res.status(404).json({ message: 'Field not found' });
      }
  
      return res.status(200).json({ message: 'Image URL updated successfully', field });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router
