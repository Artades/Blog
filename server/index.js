import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import multer from 'multer';
import { UserController, PostController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

mongoose.connect(
        'mongodb+srv://admin:qqqqqq@cluster0.bupgxbd.mongodb.net/blog?retryWrites=true&w=majority'
    ).then(() => console.log('DB is OK'))
    .catch((err) => console.log(`You have an error --- ${err}`))


const PORT = 4444;
const app = express();

const storage = multer.diskStorage({
    destination: ( _, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send(`<h1> Hello, Artyom <h1/>`)
});
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload',checkAuth , upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});

app.get('/tags', PostController.getLastTags)
app.get('/posts', PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);



app.listen(PORT, (err) => {
    if (err) {
        return console.error(err)
    }
    console.log('Server is OK')
})