// set up environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const HASH_INT = Number(process.env.HASH_INT);

// import middlewares and encryptions
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import models
const User = require("../models/user");
const Item = require("../models/item");

// -------------------------------------- User Services -------------------------------------------------------------------

// add new user
const add_user = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({ message: "bad request - missing username" });
        }
        else if (!password) {
            return res.status(400).json({ message: "bad request - missing password" });
        }
        else {
            const collision = await User.findOne({ username: username });

            if (collision) {
                return res.status(409).json({ message: "username already taken" });
            }
            else {
                // hash the password
                const hashedPassword = await bcrypt.hash(password, HASH_INT);

                // try creating new user
                const creation_status = await User.create({ username, password: hashedPassword });

                if (creation_status) {
                    return res.status(201).json({ message: "user created successfully" });
                }
                else {
                    return res.status(400).json({ message: "user not created" });
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// user login
const login_user = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({ message: "bad request - missing username" });
        }
        else if (!password) {
            return res.status(400).json({ message: "bad request - missing password" });
        }
        else {
            // try finding user
            const user = await User.findOne({ username });

            // if username is not correct
            if (!user) {
                return res.status(401).json({ message: "invalid credentials" });
            }
            else {
                // match password
                const isMatch = await bcrypt.compare(password, user.password);

                // incorrect password
                if (!isMatch) {
                    return res.status(401).json({ message: "invalid credentials" });
                }
                else {
                    // create acess token for user
                    const access_token = jwt.sign(
                        {
                            userId: user._id,
                            username: username,
                        },
                        JWT_SECRET,
                        {
                            expiresIn: "30m"
                        }
                    );

                    // if token is created
                    if (!access_token) {
                        return res.status(400).json({ message: "could not sign you in" });
                    }
                    else {
                        // send token to client
                        return res.status(200).json({
                            token: access_token,
                            message: "login successful"
                        });
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// -------------------------------------- Item Services --------------------------------------------------------------------

// get all items
const get_items = async (req, res) => {
    try {
        // user - if token is valid
        const userId = req.user.userId;

        // get all items
        const items = await Item.find({ userId });

        // return list of items
        return res.status(200).json({
            user: userId,
            count: items.length,
            items
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// add item to list
const add_item = async (req, res) => {
    try {
        const { name, company, phone, description } = req.body;
        const userId = req.user.userId; // from auth middleware

        // missing fields
        if (!name || !company || !phone || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // create new item
        const newItem = await Item.create({
            name,
            company,
            phone,
            description,
            userId
        });

        // return creation status
        return res.status(201).json({
            message: "Item added successfully",
            item: newItem
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// update item
const update_item = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, description } = req.body;
        const userId = req.user.userId;

        // if no item id is provided
        if (!id) {
            return res.status(400).json({ message: "Item ID is required" });
        }

        // update only if item belongs to this user
        const updatedItem = await Item.findOneAndUpdate(
            { _id: id, userId },
            { name, phone, description },
            { new: true, runValidators: true }
        );

        // item not found or not owned by user
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found or unauthorized" });
        }

        return res.status(200).json({
            message: "Item updated successfully",
            item: updatedItem
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// delete item
const delete_item = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // if missing item id 
        if (!id) {
            return res.status(400).json({ message: "Item ID is required" });
        }

        // delete only if item belongs to this user
        const deletedItem = await Item.findOneAndDelete({
            _id: id,
            userId
        });

        // not found or not owned by user
        if (!deletedItem) {
            return res.status(404).json({
                message: "Item not found or unauthorized"
            });
        }

        // return deleted item
        return res.status(200).json({
            message: "Item deleted successfully",
            item: deletedItem
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// export the services
module.exports = {

    // user services
    add_user,
    login_user,

    // item services
    get_items,
    add_item,
    update_item,
    delete_item
};