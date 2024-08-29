import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password, avatar } = req.body;

    try {
        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                avatar
            }
        });

        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user!" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // CHECK IF THE USER EXISTS
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if(!user) return res.status(401).json({ message: "Invalid Credentials" });

        // CHECK IF THE PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials" });

        // GENERATE COOKIE TOKEN AND SEND TO THE USER
        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({ id: user.id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: age });

        const { password: userPassword, ...userInfo } = user;

        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: age, sameSite: "Strict" }).status(200).json(userInfo);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login!" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout successfull!" });
};