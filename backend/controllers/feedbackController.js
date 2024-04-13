const asyncHandler = require("express-async-handler");
const {PrismaClient} = require('@prisma/client')
const {feedback, incidentpost} = new PrismaClient()

//? Create Feedback Post
  const setFeedback = asyncHandler(async (req, res, next) => {
    try {
      const {incidentId } = req.body
    const incidentPstExists = await incidentpost.findUnique({
      where:{
          id: Number(incidentId)
      }
  })

  if(!incidentPstExists){
      return res.status(400).json({
          msg: 'No such feedback found'
      })
    }

    const newFeedback = await feedback.create({
        data: req.body        
    })

    res.redirect(`/incidentdetails/${incidentId}`)
      
    } catch (error) {
      next(error)
    }  

  });

//!-------------------------Feedback--------
//? Create Feedback Post

const postFeedback = asyncHandler(async (req, res, next) => {
  
  const {response, rating, incidentId} = req.body
  try {
    const newFeedback = await feedback.create({
      data: {incidentId: parseInt(incidentId), rating: parseInt(rating),response} 
  
    })
  
    res.redirect(`/incidentdetails/`+ incidentId)
    
  } catch (error) {
    next(error)
    
  }


})

  //? Delete Feedback Post
  const deleteFedback = asyncHandler(async (req, res, next) => {
      try {

    const {id} = req.params 

    const existsFeedback = await feedback.findUnique({
      where:{
          id: Number(id)
      }
  })

  if(!existsFeedback){
    return res.status(400).json({
        msg: 'No such feedback found'
    })
  }

       const deletedFeedback = await feedback.delete({
         where: {
           id: Number(id)
         }
       })
        res.json(deletedFeedback)
      } catch (error) {
        next(error)
        
      }
});


module.exports = {postFeedback,
    setFeedback,
    deleteFedback};