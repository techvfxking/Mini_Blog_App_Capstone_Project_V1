import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Users from '../models/userModel.js'

const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            const isPasswordCorrect = await bcrypt.compare(
                password,
                existingUser.password
            )
            if (isPasswordCorrect) {
                const token = jwt.sign(
                    { email: existingUser.email, id: existingUser._id },
                    'Test',
                    { expiresIn: '1h' }
                )
                res.status(200).json({ result: existingUser, token })
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        } else {
            res.status(404).json({ message: 'User not found in database' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body
    try {
        const existingUser = await Users.findOne({ email })
        if (!existingUser) {
            if (password === confirmPassword) {
                const hashedPassword = await bcrypt.hash(password, 12)
                const result = await Users.create({
                    email,
                    password: hashedPassword,
                    name: `${firstName} ${lastName}`,
                })
                const token = jwt.sign(
                    { email: result.email, id: result._id },
                    'Test',
                    { expiresIn: '1h' }
                )
                res.status(200).json({ result, token })
            } else {
                res.status(404).json({ message: "Password don't match." })
            }
        } else {
            res.status(404).json({ message: 'User already exists in database' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export { signin, signup }
