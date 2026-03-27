import express from 'express';
import studentRoutes from './routes/StudentRoute'
const app=express();

app.use(express.json());

app.use('/api',studentRoutes);





app.listen(8000,()=>{
    console.log('Server is running on port 8000');
});
