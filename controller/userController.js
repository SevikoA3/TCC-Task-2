import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            const error = new Error("Username and password are required");
            error.statusCode = 400;
            throw error;
        }

        // check if user exists
        const user = await User.findOne({
            where: {
                username
            }
        });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }
        
        
        // Generate JWT token
        const userPlain = user.toJSON();
        
        const { password: _, refresh_token: __, ...safeUserData } = userPlain;

        const accessToken = jwt.sign(
            safeUserData,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            safeUserData,
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        await User.update(
            { refresh_token: refreshToken },
            { where: { id: user.id } }
        );

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
        });

        return res.status(200).json({
            message: "Login successful",
            accessToken,
            user: safeUserData
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error"
        });
    }
}

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            const error = new Error("Username and password are required");
            error.statusCode = 400;
            throw error;
        }

        // check if user already exists
        const existingUser = await User.findOne({
            where: {
                username
            }
        });

        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            refresh_token: null // will update after generating token
        });

        const { password: _, refresh_token: __, ...safeUserData } = newUser.toJSON();

        const accessToken = jwt.sign(
            safeUserData,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            safeUserData,
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        // update user with refresh token
        await newUser.update({ refresh_token: refreshToken });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
        });

        return res.status(201).json({
            message: "User created successfully",
            accessToken,
            user: safeUserData
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error"
        });
    }
}

export {
    login,
    register
}