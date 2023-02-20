import { BeAnObject, IObjectWithTypegooseFunction } from '@typegoose/typegoose/lib/types';
import { Document, Types, LeanDocument } from 'mongoose';
  
export type IModel<T> = Document<Types.ObjectId, BeAnObject, T> &
  T &
  IObjectWithTypegooseFunction & {
    _id: Types.ObjectId;
  };

export type IData<T> = LeanDocument<T> & {
  _id: Types.ObjectId;
};
