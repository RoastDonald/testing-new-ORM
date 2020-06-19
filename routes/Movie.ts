import express, { Request, Response } from 'express';
import { Movie, IMovie } from '../models/Movie';
import Helper from '../utils/Helper';
import { keys } from 'ts-transformer-keys';
import moment from 'moment';

export default class MovieController {
  public route = '/';
  public router = express.Router();
  private modelKeys = keys<IMovie>();

  constructor() {
    this.router.get(this.route, this.getDocs);
    this.router.post(this.route, this.postDocs);
  }

  private getDocs = async (req: Request, res: Response) => {
    try {
      const movies = await Movie.findAll({
        attributes: this.modelKeys,
      });
      res.status(200).json({ status: 'success', data: movies });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: 'error', msg: 'Server error' });
    }
  };

  private postDocs = async (req: Request, res: Response) => {
    const props = req.body as IMovie;
    const emptyFields = Helper.validateProps(props, this.modelKeys);
    if (emptyFields.length) {
      return res
        .status(422)
        .json({ status: 'fail', msg: 'incorrect data', fields: emptyFields });
    }

    const isDateValid = moment(
      props.release_date.toString(),
      'YYYY-MM-DD',
      true
    ).isValid();
    if (!isDateValid)
      return res
        .status(422)
        .json({ status: 'fail', msg: 'Incorrect date format' });

    try {
      await Movie.create({ ...props });
      return res.status(201).json({ status: 'success', data: [{ ...props }] });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: 'error', msg: 'Server error' });
    }
  };
}
