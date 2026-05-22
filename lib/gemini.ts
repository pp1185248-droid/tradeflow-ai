import { GoogleGenerativeAI } from '@google/generative-ai';

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function askGemini(prompt: string): Promise<string> {
  const model = genai.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ── HS Code Classification ────────────────────────────
export async function classifyHSCode(productDescription: string, country: string = 'IN'): Promise<{
  hsCode: string;
  description: string;
  dutyRate: string;
  reasoning: string;
}> {
  const prompt = `You are an expert customs tariff classifier. 
  
Product: "${productDescription}"
Origin Country: ${country}

Return ONLY valid JSON (no markdown):
{
  "hsCode": "6 digit HS code like 610910",
  "description": "Official tariff description",
  "dutyRate": "estimated duty % like 10%",
  "reasoning": "Why this HS code was selected (2-3 sentences)"
}`;

  const result = await askGemini(prompt);
  const match = result.match(/\{[\s\S]*\}/);
  return JSON.parse(match ? match[0] : result);
}

// ── Document Parser ───────────────────────────────────
export async function parseShipmentDocument(text: string): Promise<{
  shipper: string;
  consignee: string;
  items: Array<{ description: string; quantity: number; value: number; weight: number }>;
  totalValue: number;
  currency: string;
  originCountry: string;
  destinationCountry: string;
}> {
  const prompt = `Extract shipment details from this document text. Return ONLY valid JSON (no markdown):
  
Document:
${text.slice(0, 3000)}

Return:
{
  "shipper": "company name",
  "consignee": "receiver name",
  "items": [{"description":"item name","quantity":1,"value":100,"weight":1.5}],
  "totalValue": 1000,
  "currency": "USD",
  "originCountry": "IN",
  "destinationCountry": "US"
}`;

  const result = await askGemini(prompt);
  const match = result.match(/\{[\s\S]*\}/);
  return JSON.parse(match ? match[0] : result);
}

// ── Compliance Checker ────────────────────────────────
export async function checkCompliance(shipmentData: object, fromCountry: string, toCountry: string): Promise<{
  compliant: boolean;
  issues: string[];
  recommendations: string[];
  estimatedDuty: string;
  requiredDocuments: string[];
}> {
  const prompt = `You are an international trade compliance expert.
  
Shipment: ${JSON.stringify(shipmentData)}
From: ${fromCountry} → To: ${toCountry}

Check compliance and return ONLY valid JSON (no markdown):
{
  "compliant": true,
  "issues": ["list of compliance issues if any"],
  "recommendations": ["list of recommendations"],
  "estimatedDuty": "estimated total duty amount",
  "requiredDocuments": ["Bill of Lading","Commercial Invoice","Packing List","Certificate of Origin"]
}`;

  const result = await askGemini(prompt);
  const match = result.match(/\{[\s\S]*\}/);
  return JSON.parse(match ? match[0] : result);
}
