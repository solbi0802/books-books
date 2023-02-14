import { AxiosResponse } from "axios";
import { bookRequestType, bookResponseType } from "../types";
import instance from "./core";

export const getAllList = (keyword: string, page: number) => {
  return instance
    .get(`/book?query=${keyword}&page=${page}`)
    .then((result: AxiosResponse<bookResponseType>) => {
      return result.data;
    });
};

export const getDetailList = (
  target: bookRequestType["target"],
  keyword: string,
  page: number
) => {
  return instance
    .get(`book?target=${target}&query=${keyword}&page=${page}`)
    .then((result) => {
      return result.data;
    });
};
