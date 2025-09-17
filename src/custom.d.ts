declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "react-area-linkage";
declare module "area-data";
declare module "bootstrap/dist/css/bootstrap.min.css";

declare module "*.md?raw" {
  const content: string;
  export default content;
}
