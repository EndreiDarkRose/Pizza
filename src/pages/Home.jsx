import React from "react";

import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortPopup } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import ContentLoaderPizza from "../components/PizzaBlock/ContentLoader";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from "../redux/slice/filterSlice";
import { fetchPizzas } from "../redux/slice/pizzaSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const items = useSelector((state) => state.pizza.items);

  const onClickCategories = (id) => {
    dispatch(setCategoryId(id));
  };
  const onClickSelected = (obj) => {
    dispatch(setSortType(obj));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const [isLoading, setIsLoading] = React.useState(true);

  const [searchValue, setSearchValue] = React.useState("");

  const search = searchValue ? `&search=${searchValue}` : "";

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam = sortPopup.find(
        (obj) => obj.sortProperty === params.sortType
      );
      dispatch(setFilters({ ...params, sortParam }));
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
    dispatch(fetchPizzas({ currentPage, sortType, categoryId, search }))
      .then(setIsLoading(false))
      .then(setIsLoading(true));
  };

  const contentLoader = [...Array(4)].map((_, index) => (
    <ContentLoaderPizza key={index} />
  ));

  const pizzas = items.map((item, index) => (
    <PizzaBlock {...item} key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategories={(id) => onClickCategories(id)}
          />
          <Sort
            sortType={sortType}
            onClickSelected={(obj) => onClickSelected(obj)}
          />
        </div>
        <div className="content-header">
          <h2 className="content__title">Все пиццы</h2>
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <div className="content__items">
          {isLoading ? contentLoader : pizzas}
        </div>
        <Pagination onChangePage={(number) => onChangePage(number)} />
      </div>
    </>
  );
};

export default Home;
