import User from '../model/users/user.model'; 
import Customer from '../model/users/customer.model'; 
import { Request, Response } from 'express'; 
import jwt from 'jsonwebtoken'; 
const customerController = {
    registerCustomer: async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, email, password, bankingDetails } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already registered' });
            }      
            const newUser = new User({
                firstName,
                lastName,
                email,
                password,
            });

          
            const savedUser = await newUser.save();

            const newCustomer = new Customer({
                user: savedUser._id, 
                bankingDetails, 
                transactions: [],
            });

         
            const savedCustomer = await newCustomer.save();

            
            const customer = await Customer.findById(savedCustomer._id).populate('user');

       
            const token = jwt.sign({ userId: savedUser._id }, 'your-secret-key', { expiresIn: '1h' });
            res.status(201).json({ message: 'Customer registered successfully', customer: customer, token });
           

        } catch (error: any) { 
            console.error('Error registering customer:', error);
            res.status(500).json({ message: 'Registration failed', error: error.message });
        }
    },

    logoutCustomer: (req: Request, res: Response) => {
        res.status(200).json({ message: 'Logged out' });
    },
};

export default customerController;
