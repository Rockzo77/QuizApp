var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var quizes=require('./Schemas/quizschema')
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/',urlencodedParser,(req,res)=>
{
    mongoose.connect("mongodb://localhost:27017/Quiz",{ useNewUrlParser: true });
    var quiz=req.param('quiz');
    quizes.findOne({quizName: quiz})
    .populate({
        path: 'questionID',
        select: " question option1 option2 option3 option4 answer"
    })
    .exec((err,Quiz)=>{
        if(err)
        res.send(err);
        else{
            res.render('quiz',{data: Quiz.questionID});
        }
    });
    // console.log("in route "+quiz);
    // res.send("I am here "+ quiz);
});

module.exports=router;