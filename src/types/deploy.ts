export type IDeploy = {
  id: string;
  ref: string;
  created_at: Date;
  updated_at: Date;
  status: string;
  steps: any;
}