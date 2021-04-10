import React from "react";
import s from "./formControls.module.css";

const Component = (Component) => ({ input, meta, ...props }) => {
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
