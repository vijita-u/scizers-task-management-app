export interface DataType {
  id?: string;
  key?: string;
  title?: string;
  priority?: "High" | "Medium" | "Low";
  date?: string;
  status?: string;
}