import { prop } from "@typegoose/typegoose";

export class LoginHistorySchema {
  @prop({ type: String, required: true })
  public ipAddress: string;

  @prop({ type: String, required: true })
  public deviceName: string;

  @prop({ type: String, required: true })
  public os: string;

  @prop({ type: Date, required: true})
  public logged_in_at: Date

  @prop({ type: Date, required: false, default: null })
  public logged_out_at: Date

  @prop({ type: Boolean, required: true, default: true })
  public logged_in: boolean
}
