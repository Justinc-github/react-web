declare module "*.css" {
  const content: string;
  export default content;
}
declare module "bootstrap/dist/css/bootstrap.min.css";

declare module "*.md?raw" {
  const content: string;
  export default content;
}
