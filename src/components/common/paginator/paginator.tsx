import React, { useState } from "react";
import s from "./paginator.module.css";
import { Formik, Form, Field } from "formik";

type props = {
  totalUsersCount: number;
  pageSize: number;
  selectedPage: number;
  setCurrentPage: (pageNumber: number) => void;
};

const Paginator: React.FC<props> = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pagesArr: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesArr.push(i);
  }
  let portionSize: number = 10;
  let portionsCount: number = Math.ceil(pagesCount / portionSize);
  let [currentPortion, setCurrentPortion] = useState(1);
  let leftPageOfPortion: number =
    currentPortion * portionSize - (portionSize - 1);
  let rightPageOfPortion: number = currentPortion * portionSize;

  return (
    <div className={s.pages}>
      <UsersSearchForm />

      {currentPortion > 1 && (
        <button onClick={() => setCurrentPortion(currentPortion - 1)}>
          prev
        </button>
      )}

      {pagesArr
        .filter((p) => p >= leftPageOfPortion && p <= rightPageOfPortion)
        .map((p) => {
          return (
            <span
              onClick={() => props.setCurrentPage(p)}
              className={props.selectedPage === p ? s.selectedPage : ""}
              key={p}
            >
              {p}
            </span>
          );
        })}

      {currentPortion < portionsCount && (
        <button onClick={() => setCurrentPortion(currentPortion + 1)}>
          next
        </button>
      )}
    </div>
  );
};

const usersSearchFormValidate = (values: usersSearchFormObjType) => {
  const errors = {};
  return errors;
};

const UsersSearchForm = () => {
  const submit = (
    values: usersSearchFormObjType,
    { setSubmitting }: { setSubmitting: (isSubmiting: boolean) => void }
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));

      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{ term: "" }}
      validate={usersSearchFormValidate}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />

          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </Form>
      )}
    </Formik>
  );
};

type usersSearchFormObjType = {
  term: String;
};

export default Paginator;
