const {StatusCodes} = require('http-status-codes')
const getAllJobs = async(req,res)=>{
  res.status(StatusCodes.CREATED).json(res)
}

const getJob = async (req, res) => {
  res.status(StatusCodes.CREATED).json(res)
}

const updateJob = async (req,res) => {
  res.status(StatusCodes.CREATED).json(res)
}

const createJob= async (req,res) => {
  res.status(StatusCodes.CREATED).json(res)
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

