import mongoose, { Schema, Document } from 'mongoose';

export interface IShipment extends Document {
  userId: mongoose.Types.ObjectId;
  originCountry: string;
  destinationCountry: string;
  shipper: string;
  consignee: string;
  items: Array<{
    description: string;
    quantity: number;
    value: number;
    weight: number;
    hsCode?: string;
    dutyRate?: string;
  }>;
  totalValue: number;
  currency: string;
  status: 'processing' | 'classified' | 'compliant' | 'docs_ready' | 'shipped';
  complianceResult?: object;
  generatedDocs?: string[];
  estimatedDuty?: string;
  requiredDocuments?: string[];
}

const ShipmentSchema = new Schema<IShipment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  originCountry: { type: String, required: true },
  destinationCountry: { type: String, required: true },
  shipper: String,
  consignee: String,
  items: [{
    description: String,
    quantity: Number,
    value: Number,
    weight: Number,
    hsCode: String,
    dutyRate: String,
  }],
  totalValue: Number,
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['processing', 'classified', 'compliant', 'docs_ready', 'shipped'], default: 'processing' },
  complianceResult: Schema.Types.Mixed,
  generatedDocs: [String],
  estimatedDuty: String,
  requiredDocuments: [String],
}, { timestamps: true });

export default mongoose.models.Shipment || mongoose.model<IShipment>('Shipment', ShipmentSchema);
