import express, { Request, Response } from 'express';
import { Session, ISession } from '../models/Session';
import Helper from '../utils/Helper';
import { keys } from 'ts-transformer-keys';
export default class SessionController {
  public route = '/';
  public router = express.Router();
  private modelKeys = keys<ISession>();

  constructor() {
    this.router.get(this.route, this.getDocs);
    this.router.post(this.route, this.postDocs);
    this.router.delete(this.route.concat(':id?'), this.deleteDoc);
    this.router.put(this.route.concat(':id?'), this.editDoc);
  }

  private editDoc = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (typeof +id !== 'number')
        return res
          .status(422)
          .json({ status: 'fail', msg: "id wasn't defined" });

      const [updated] = await Session.update(req.body, {
        where: { id },
      });
      if (updated) {
        const updatedEntry = await Session.findOne({ where: { id } });
        return res
          .status(200)
          .json({ status: 'success', data: [{ updatedEntry }] });
      }
      throw new Error('Incorrect data');
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: 'error', msg: e.message });
    }
  };

  private deleteDoc = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (typeof +id !== 'number')
        return res
          .status(422)
          .json({ status: 'fail', msg: "id wasn't defined" });

      const deleted = await Session.destroy({
        where: { id },
      });
      if (deleted) {
        return res
          .status(200)
          .json({ status: 'success', msg: 'successfuly deleted' });
      }
      throw new Error('There is no entry with such id');
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: 'error', msg: e.message });
    }
  };

  private getDocs = async (req: Request, res: Response) => {
    try {
      const sessions = await Session.findAll({ attributes: this.modelKeys });
      res.status(200).json({ status: 'success', data: sessions });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: 'error', msg: 'Server error' });
    }
  };

  private postDocs = async (req: Request, res: Response) => {
    const props = req.body as ISession;
    const emptyFields = Helper.validateProps(props, this.modelKeys);
    if (emptyFields.length) {
      return res
        .status(422)
        .json({ status: 'fail', msg: 'incorrect data', fields: emptyFields });
    }
    try {
      const { movie_id, cinema_id, date, price } = props;
      const status = await req.con
        ?.query(
          'CALL add_session(:movie_id,:cinema_id,:date,:price,@status);' +
            'SELECT @status;',
          {
            replacements: {
              movie_id,
              cinema_id,
              date,
              price,
            },
            type: 'SELECT',
          }
        )
        .then((res: any) => {
          const level1 = res[1];
          return level1[0]['@status'];
        });
      if (!status)
        return res
          .status(201)
          .json({ status: 'success', data: [{ ...props }] });
      else
        return res
          .status(422)
          .json({ status: 'fail', msg: 'incorrect id on movie or cinema' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: 'error', msg: 'Server error' });
    }
  };
}
