import React, { useState } from "react";
import s from "./paginator.module.css";
import { Formik, Form, Field } from "formik";
import { filterType } from "../../../redux/users-reducer";

type paginatorPropsType = {
  totalUsersCount: number;
  pageSize: number;
  selectedPage: number;
  setCurrentPage: (pageNumber: number) => void;
  onFilterChanged: (filter: filterType) => void;
};

const Paginator: React.FC<paginatorPropsType> = (props) => {
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
      <UsersSearchForm onFilterChanged={props.onFilterChanged} />

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

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

const UsersSearchForm: React.FC<usersSearchFormType> = (props) => {
  const submit = (
    values: filterType,
    { setSubmitting }: { setSubmitting: (isSubmiting: boolean) => void }
  ) => {
    props.onFilterChanged(values);
    setSubmitting(false);
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

type usersSearchFormType = {
  // term: String;
  onFilterChanged: (filter: filterType) => void;
};

export default Paginator;
