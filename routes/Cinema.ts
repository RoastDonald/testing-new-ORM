import express, { Request, Response } from 'express';
import { Cinema, ICinema } from '../models/Cinema';
import Helper from '../utils/Helper';
import { keys } from 'ts-transformer-keys';

export default class CinemaController {
  public route = '/';
  public router = express.Router();
  private modelKeys = keys<ICinema>();

  constructor() {
    this.router.get(this.route, this.getDocs);
    this.router.post(this.route, this.postDocs);
  }

  private getDocs = async (req: Request, res: Response) => {
    try {
      const cinemas = await Cinema.findAll({
        attributes: this.modelKeys,
      });
      res.status(200).json({ status: 'success', data: cinemas });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: 'error', msg: 'Server error' });
    }
  };

  private postDocs = async (req: Request, res: Response) => {
    const props = req.body as ICinema;
    const emptyFields = Helper.validateProps(props, this.modelKeys);
    if (emptyFields.length) {
      return res
        .status(422)
        .json({ status: 'fail', msg: 'incorrect data', fields: emptyFields });
    }
    try {
      await Cinema.create({ ...props });
      return res.status(201).json({ status: 'success', data: [{ ...props }] });
    } catch (e) {
      if (e.original.code === 'ER_DUP_ENTRY') {
        res.status(422).json({ status: 'fail', msg: 'address is occupied' });
      } else {
        res.status(500).json({ status: 'error', msg: 'Server error' });
      }
    }
  };
}
