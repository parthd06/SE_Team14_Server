const router = require('express').Router();
const Movie =require('../models/movieModals');
const authMiddleware= require('../middlwares/authMiddleware')

//Add a new movie
router.post('/add-movie',authMiddleware,async(req,res)=>{
    try{
        const newMovie =new Movie(req.body);
        await newMovie.save();
        res.send({
            success:true,
            message:"Movie added successfully"
        })
    }catch(error){
        res.send({
            success:false,
            message:error.message
        })
    }
})

router.get('/get-all-movies',async(req,res)=>{
    try{
        const movies=await Movie.find().sort({createdAt:-1});
        res.send({
            success:true,
            message:"Movies fetched sucessfully",
            data:movies
        });

    }catch(error){
        res.send({
            success:false,
            message:error.message,
        });
    }
});

router.post('/update-movie', authMiddleware, async (req, res) => {

    try{
        await Movie.findByIdAndUpdate(req.body.movieId,req.body);
        res.send({
            success:true,
            message:"Movie updated successfuly",
        });
    }catch(error){
        res.send({
            success:false,
            message:error.message,
        });
    }
});

// routes/movies.js or similar

// delete a movie
router.post("/delete-movie", authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId); // Corrected line
        res.send({
            success: true,
            message: "Movie deleted successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports= router;