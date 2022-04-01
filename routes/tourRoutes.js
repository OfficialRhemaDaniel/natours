const fs = require('fs');
const express = require('express');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//THE GET REQUEST
const GetAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};
//GETTING ONLY ONE TOUR
const GetTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'The ID no too pure',
    });
  }

  const tour = tours.find((i) => i.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
//POST REQUEST
const createTour = (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  const newTour = { ...req.body, id: newId };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//PATCH REQUEST
const UpdateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'The ID no too pure',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'TOUR UPDATED',
    },
  });
};

//DELETE REQUEST
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'The ID no too pure',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const router = express.Router();

router.route('/').get(GetAllTours).post(createTour);
router.route('/:id').get(GetTour).patch(UpdateTour).delete(deleteTour);

module.exports = router;
