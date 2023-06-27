import style from './App.module.css';
import { useState } from 'react';
import { DefaultObject, SortedObject } from './components';
import { FormTasks } from './components';
import { useDebounce } from './utils/useDebounce';
import { useRequestGetData }from'./hook-and-func'

export const App = function () {
	const [refreshTodoList, setRefreshTodoList] = useState(false);
	const refresh = () => setRefreshTodoList(!refreshTodoList);
	const [search, setSearch] = useState('');
	const searchFilter = useDebounce(search);
	const [selectSort, setSelectSort] = useState('Сортировать...');
	const [sort, setSorting] = useState(true);
	const { isLoading, todos} = useRequestGetData(sort,searchFilter,refreshTodoList)
	
	const sorting = ({ target }) => {
		setSelectSort(target.value);
		target.value === 'A-z' ? setSorting(false) : setSorting(true);
	};

	const SearchRequest = ({ target }) => {
		setSearch(target.value);
	};

	return (
		<div className={style.wrapper}>
			{isLoading ? (
					<div className={style.loader}></div>
				) : (<div className={style.container}>
					<form className={style.FormSearch}>
						<input
							type="text"
							placeholder="Поиск"
							name="search"
							value={search}
							onChange={SearchRequest}
							className={style.search}
						/>
					</form>
	
					{todos.length === 0 
					? <h1 className={style.addTaskText}>Добавить новую задачу</h1>
					: ''}
	
					<FormTasks refresh={refresh} />
					
					<select className={style.sort} value={selectSort} onChange={sorting}>
						<option value={'default'}>Без сортировки...</option>
						<option value={'A-z'}>Сортировка по алфавиту</option>
					</select>
					
					{sort 
					? <DefaultObject todos={todos} refresh={refresh} />
					: <SortedObject todos={todos} refresh={refresh}/>}
				</div>)}
			
		</div>
	);
};