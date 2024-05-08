const Express = require('express')
const cors = require('cors')
const app = Express()
const multer = require('multer');

const storage = multer.memoryStorage();

const t_logins = require('./models/t_logins')
const t_Employees = require('./models/t_Employee')
const port = process.env.PORT || 5000;

const upload = multer({ dest: 'uploads/' });
app.use(cors())
app.use(Express.json());
// app.use(Express.urlencoded({ extended: true }));

const mongoose = require('mongoose')
require('dotenv').config();


mongoose.connect(process.env.DB_URI)
    .then(() => console.log("DB CONNECTED"))
    .catch(err => console.log(err))

app.get('/getUsers', async (req, res) => {
    try {
        const result = await t_logins.find({});
        res.json(result);
        console.log("Get Fetch API Called ")

    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/getEmployees', async (req, res) => {
    try {
        const result = await t_Employees.find({});
        res.json(result);
        console.log("Get Fetch API Called Employees")

    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/deleteEmployee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await t_Employees.findByIdAndDelete(id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/verifyLogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await t_logins.find({ username });
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Incorrect username or password' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect username or password' });
        }
        // If username and password are valid, send success response
        res.json({ success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/getEmployeeById/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const toBeEditedUser = await t_Employees.findById(id)
        res.json(toBeEditedUser);
        console.log("Get employee by ID API Called Employees")
    }catch{
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.put('/editEmployee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { name, email, mobileNumber, designation, gender, course , createDate} = req.body;
        const updatedEmployee = await t_Employees.findByIdAndUpdate(id, {
            name,
            email,
            mobileNumber,
            designation,
            gender,
            course,
            createDate
        }, { new: true });
        console.log((updatedEmployee));
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/addEmployees', async (req, res) => {
    try {
        console.log((req.body));
        const newEmployee = new t_Employees({
            name: req.body.name,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            designation: req.body.designation,
            gender: req.body.gender,
            course: req.body.course,
            // imageData: {
            //     data: req.file.buffer,
            //     contentType: req.file.mimetype
            // },
            createDate: req.body.createDate
        });

        await newEmployee.save();

        return res.status(201).json({ message: 'Employee data saved successfully' });
    } catch (error) {
        console.error('Error saving employee data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/createUsers', async (req, res) => {
    try {
        const user = req.body
        const newUser = new t_logins(user)
        await newUser.save();
        res.json(newUser)
        console.log("New userCreated")
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/', async (req, res) => {
    res.send("HEllo")
})


app.listen(port, (err) => {
    console.log('server started on port: ' + port);
});