import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  // Check if the file is uploaded
  if (!req.file) {
    return res
      .status(400)
      .json({ success: "false", message: "No file uploaded." });
  }

  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ sucess: "true", message: " Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: "false", message: "Error found" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: "error" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`upload/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "food item removed" });
  } catch (error) {
    console.log("error while deleting");
    res.json({ success: false, message: "error" });
  }
};

export { addFood, listFood, removeFood };
