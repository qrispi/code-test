declare module "*.svg" {
    const content: any;
    export default content;
  }
  
  interface Todo {
    id: string;
    label: string;
    checked: boolean;
    created_at?: number,
    completed_at?: number,
  }
  