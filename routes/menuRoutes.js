const express = require("express");
const router = express.Router();
const MenuItems = require("./../models/menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItems(data);
    const response = await newMenu.save();
    console.log("data added");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItems.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  const tasteType = req.params.tasteType;
  try {
    if (tasteType == "sour" || tasteType == "spicy" || tasteType == "sweet") {
      const response = await MenuItems.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updateMenuData = req.body;
    const response = await MenuItems.findByIdAndUpdate(menuId, updateMenuData, {
      new: true, //return the update document
      runValidators: true, //run mongoose validation
    });
    if (!response) {
      return res.status(404).json({ error: "menu not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "interval server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const response = await MenuItems.findByIdAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "interval server error" });
  }
});

module.exports = router;
