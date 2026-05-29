require('dotenv').config(); // Loads your DATABASE_URL from a .env file
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg'); // 1. Import the Postgres adapter
const jwt = require('jsonwebtoken');



// Initialize Express
const app = express();

// ==========================================
// PRISMA INITIALIZATION (v7+ Syntax)
// ==========================================
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("ERROR: DATABASE_URL is not set in your .env file!");
    process.exit(1);
}

// 2. Initialize the adapter and pass it to PrismaClient
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


// ==========================================
// MIDDLEWARE
// ==========================================
app.use(cors()); 
app.use(express.json()); 

// ==========================================
// ROUTES: ADMIN AUTHENTICATION
// ==========================================
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Check if credentials match the .env file
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        // Generate a token that expires in 2 hours
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        res.status(200).json({ success: true, token: token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});


// ==========================================
// ROUTES: GENERAL INQUIRIES
// ==========================================

// POST Route: Catches data sent FROM the Contact Page
app.post('/api/general-inquiry', async (req, res) => {
    try {
        const newInquiry = await prisma.generalInquiry.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone || null, 
                subject: req.body.subject,
                message: req.body.message,
            }
        });
        
        console.log("New message saved to database:", newInquiry.name);
        res.status(201).json({ 
            success: true, 
            message: "Inquiry saved successfully!", 
            data: newInquiry 
        });
        
    } catch (error) {
        console.error("Error saving inquiry:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
});

// GET Route: Sends data TO the Admin Dashboard
app.get('/api/general-inquiry', async (req, res) => {
    try {
        const inquiries = await prisma.generalInquiry.findMany({
            orderBy: {
                createdAt: 'desc' 
            }
        });
        
        res.status(200).json(inquiries);
        
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
});

// ==========================================
// ROUTES: RESERVATIONS
// ==========================================


// POST Route: Save a new Reservation (and Guest)
app.post('/api/reservations', async (req, res) => {

    console.log("RAW DATA FROM REACT:", req.body);
    try {
        // 1. Safely extract data, checking multiple possible variable names from React
        const name = req.body.name || req.body.fullName;
        const email = req.body.email;
        const checkIn = req.body.checkin;
        const checkOut = req.body.checkout;
        const adults = req.body.adults || req.body.adultsCount || 1;
        const children = req.body.children || req.body.childrenCount || 0;
        const roomType = req.body.roomType || req.body.preferredAccommodation;
        const specialRequests = req.body.specialRequests;

        // 2. Find the guest by email, or create them if they don't exist
        const guest = await prisma.guest.upsert({
            where: { email: email },
            update: { fullName: name }, 
            create: { 
                fullName: name, 
                email: email, 
                guestType: 'new' 
            }
        });

        // 3. Create the reservation using the safely extracted data
        const newReservation = await prisma.reservation.create({
            data: {
                guestId: guest.id,
                checkInDate: new Date(checkIn),
                checkOutDate: new Date(checkOut),
                adultsCount: parseInt(adults),
                childrenCount: parseInt(children),
                roomType: roomType,
                specialRequests: specialRequests || null
            }
        });

        console.log("New reservation saved for:", guest.fullName);
        res.status(201).json({ success: true, message: "Reservation saved!", data: newReservation });

    } catch (error) {
        console.error("Error saving reservation:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// GET Route: Fetch Reservations for Dashboard
app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await prisma.reservation.findMany({
            include: { guest: true }, // This fetches the Guest's Name and Email alongside the reservation
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ==========================================
// ROUTES: DELETE OPERATIONS
// ==========================================

// Delete a General Inquiry
app.delete('/api/general-inquiry/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.generalInquiry.delete({ where: { id: id } });
        res.status(200).json({ success: true, message: "Inquiry deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting inquiry" });
    }
});

// Delete a Reservation
app.delete('/api/reservations/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.reservation.delete({ where: { id: id } });
        res.status(200).json({ success: true, message: "Reservation deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting reservation" });
    }
});


// ==========================================
// SERVER INITIALIZATION
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down...');
    await prisma.$disconnect();
    process.exit(0);
});