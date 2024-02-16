import React from "react";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortPopup } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import ContentLoaderPizza from "../components/PizzaBlock/ContentLoader";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

import { useAppDispatch, useAppSelector } from "../utils/hookRedux";
import { FetchPizzasArg, fetchPizzas } from "../redux/slice/pizzaSlice";
import { useNavigate } from "react-router-dom";
import { SortProp } from "../redux/slice/filterSlice";
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from "../redux/slice/filterSlice";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [_, setIsLoading] = React.useState(true);
  const { searchValue } = useAppSelector((state) => state.filter);
  const { items, status } = useAppSelector((state) => state.pizza);

  const search = searchValue ? `&search=${searchValue}` : "";
  const { categoryId, sortType, currentPage } = useAppSelector(
    (state) => state.filter
  );

  const onClickCategories = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onClickSelected = React.useCallback((obj: SortProp) => {
    dispatch(setSortType(obj));
  }, []);
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FetchPizzasArg;
      console.log(params);

      const sortType = sortPopup.find(
        (obj) => obj.sortProperty === (params.sortType as unknown as string)
      );
      if (sortType) {
        dispatch(
          setFilters({
            currentPage: params.currentPage,
            sortType: params.sortType,
            categoryId: params.categoryId,
            searchValue: params.search,
          })
        );
      }
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [sortType, categoryId, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortType: sortType.sortProperty,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortType, categoryId, currentPage]);

  const getPizzas = () => {
    dispatch(fetchPizzas({ currentPage, sortType, categoryId, search }));
    setIsLoading(false);
  };

  const contentLoader = [...Array(4)].map((_, index) => (
    <ContentLoaderPizza key={index} />
  ));

  const pizzas = items.map((item: any) => (
    <PizzaBlock {...item} key={item.id} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onClickCategories={onClickCategories}
          />
          <Sort sortType={sortType} onClickSelected={onClickSelected} />
        </div>
        <div className="content-header">
          <h2 className="content__title">Все пиццы</h2>
          <Search />
        </div>
        {status === `error` ? (
          <div className="content__error-info">
            <h1>Произошла ошибка</h1> <p>Не удалось получить пиццы</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? contentLoader : pizzas}
          </div>
        )}
        <Pagination onChangePage={(page: number) => onChangePage(page)} />
      </div>
    </>
  );
};

export default Home;
