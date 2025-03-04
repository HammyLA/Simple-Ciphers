import express from 'express'

const router = express.Router

/**
 * -- TODO --
 * Create gets and sets for user data, like global data use a parameter to get specific pieces of data as needed. 
 * This file will likely handle GET for all data and POST or UPDATE for individual fields in the data (probably to increment lol)
 * The user needs to be authorized as a user to access this portion of information, the frontend likely wont even let the user past to the page that will use this but just in case we should try to prevent reads if the user is not authorized. It's probably good practice i bet
 */

export default router