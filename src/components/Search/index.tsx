import React from "react";
import debounce from "lodash.debounce";
import { useAppDispatch } from "../../utils/hookRedux";

import styles from "./Search.module.scss";
import { setSearchValue } from "../../redux/slice/filterSlice";
const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onClickClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img src="./assets/img/search_seo_icon.svg" className={styles.svg}></img>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeInput(event)}
        placeholder="Поиск пиццы..."
        className={styles.input}
      ></input>
      {value && (
        <img
          onClick={onClickClear}
          className={styles.clear}
          src="/assets/img/clean-search.svg"
        ></img>
      )}
    </div>
  );
};

export default Search;
