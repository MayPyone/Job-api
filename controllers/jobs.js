const {StatusCodes} = require('http-status-codes')
const { User, validate } = require("../models/User");
const Job = require( '../models/Job')
const NotFoundError = require('../errors/not-found')
const getAllJobs = async(req,res)=>{
 const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
 res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
  const {
    user: {userId},
    params:{id:jobId},
    body: {company, position},
  }=req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId
  }
  )

  try {
    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundError(`No job with id: ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    res.status(401).json({error:error.message});
  }
}

const updateJob = async (req,res) => {
  const {
    user: {userId},
    params: {id:jobId} 
  }=req

  try{
    const job = await Job.findOneAndUpdate({_id: jobId,createdBy: userId},req.body,{new: true, runValidators: true})
    if(!job){
      throw new NotFoundError(`No job with id: ${jobId}`);
    }
    
    res.status(StatusCodes.OK).json({job})
  }catch(error){
    res.status(StatusCodes.OK).json({message: error.message})
  }
}

const createJob= async (req,res) => {
  try{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({message: 'created a job successfully',job})
  }catch(error){
    if (error.errors) {
      // Extract error messages from validation errors
      const firstErrorMessage = Object.values(error.errors)[0].message;
      return res.status(400).json({ error: firstErrorMessage });
    }
  }
 
}

const deleteJob = async (req,res) => {
  res.status(StatusCodes.CREATED).json(res)
}

module.exports = {
    getAllJobs,
    getJob,
    updateJob,
    createJob,
    deleteJob
}

