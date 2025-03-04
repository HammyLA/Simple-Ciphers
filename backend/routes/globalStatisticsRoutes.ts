import express from 'express'

const router = express.Router()

/**
 * TODO -- Create routes for getting and setting global statistics data, DO NOT make a route for each statistic, take a parameter of which statistic is being updated from the frontend
 * If the parameter matches the field in the database it should be incremented or updated or whatever it should be.
 * Likely most of them are going to be sets for individual statistics (to increment them) or gets for all statistics.
 */

export default router