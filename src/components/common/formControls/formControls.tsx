import React from "react";
import s from "./formControls.module.css";

type ComponentParamsType = {
  input: {};
  meta: {
    touched: boolean;
    error: string;
  };
  props: { placeholde: string };
};
type ComponentType = (params: ComponentParamsType) => React.ReactNode;

const Component = (
  Component: string | typeof React.Component
): ComponentType => ({ input, meta, ...props }) => {
  console.log(input);
  console.log(meta);
  console.log(props);
  let error = meta.touched && meta.error;
  return (
    <div className={s.form}>
      <div className={error ? s.inputBlock : s.hasError}>
        <Component {...input} {...props} />
      </div>
      <span className={s.error}>{error && meta.error}</span>
    </div>
  );
};

export const Textarea = Component("textarea");
export const Input = Component("input");

// export const Textarea = ({ input, meta, ...props }) => {
//   let error = meta.touched && meta.error;
//   return (
//     <div className={s.form}>
//       <div className={error ? s.inputBlock : s.hasError}>
//         <textarea {...input} {...props} />
//       </div>
//       <span className={s.error}>{error && meta.error}</span>
//     </div>
//   );
// };
// export const Input = ({ input, meta, ...props }) => {
//   let error = meta.touched && meta.error;
//   return (
//     <div className={s.form}>
//       <div className={error ? s.inputBlock : s.hasError}>
//         <input {...input} {...props} />
//       </div>
//       <span className={s.error}>{error && meta.error}</span>
//     </div>
//   );
// };
