import mongoose, { Document, Model } from 'mongoose';

export interface IBlockedDate extends Document {
  date: Date;
  reason: string;
  createdAt: Date;
}

export interface IBlockedDateModel extends Model<IBlockedDate> {
  isDateBlocked(date: Date): Promise<boolean>;
}

const BlockedDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please provide a date to block'],
    unique: true
  },
  reason: {
    type: String,
    default: 'Unavailable'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for better query performance
BlockedDateSchema.index({ date: 1 }, { unique: true });

// Helper method to check if a date is blocked
BlockedDateSchema.statics.isDateBlocked = async function(date: Date): Promise<boolean> {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  
  const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));
  
  const blockedDate = await this.findOne({
    date: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  });
  
  return !!blockedDate;
};

const BlockedDate = (mongoose.models.BlockedDate || mongoose.model<IBlockedDate, IBlockedDateModel>('BlockedDate', BlockedDateSchema)) as IBlockedDateModel;

export default BlockedDate;
