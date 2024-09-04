const {StatusCodes} = require('http-status-codes')
const { User, validate } = require("../models/User");
const Job = require( '../models/Job')
const NotFoundError = require('../errors/not-found')
const asyncWrapper = require('../middleware/async');

const getAllJobs = asyncWrapper(async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
});

const getJob = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
});

const updateJob =asyncWrapper(async (req,res) => {
  const {
    user: {userId},
    params: {id:jobId} 
  }=req
    const job = await Job.findOneAndUpdate({_id: jobId,createdBy: userId},req.body,{new: true, runValidators: true})
    if(!job){
      throw new NotFoundError(`No job with id: ${jobId}`);
    }
    
    res.status(StatusCodes.OK).json({job})
}
)
const createJob=asyncWrapper(async (req,res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({message: 'created a job successfully',job}) 
})

const deleteJob =asyncWrapper(async (req,res) => {
  const {
    user: {userId},
    params: {id:jobId}
  } = req;

  const deletedJob = await Job.deleteOne({_id:jobId, createdBy: userId})
  if(!deletedJob){
    res.status.send({mesg:'no delete'})
  }
  console.log(deletedJob)
  res.status(StatusCodes.OK).json({message: "deleted the job successfully"})
})

module.exports = {
    getAllJobs,
    getJob,
    updateJob,
    createJob,
    deleteJob
}

