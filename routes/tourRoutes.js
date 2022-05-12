const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.GetAllTours);
router
  .route('/')
  .get(tourController.GetAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.GetTour)
  .patch(tourController.UpdateTour)
  .delete(tourController.deleteTour);

module.exports = router;
