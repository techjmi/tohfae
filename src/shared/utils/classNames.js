//this is the class names utility function which will be used to handle the class names of the component
export function classNames(...args) {
  return args.filter(Boolean).join(" ");
}