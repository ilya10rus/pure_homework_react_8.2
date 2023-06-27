import style from './RenderApplication.module.css';
import { requestDeleteCurrentTask } from '../hook-and-func';
import { useState } from 'react';
import { requestUpdaitingTask } from '../hook-and-func';

export const RenderApp = ({ id, title, refresh, userId }) => {
	const [removeText, setRemoveText] = useState('');
	const [removeTask, setRemoveTask] = useState(false);

	return (
		<div key={id} className={style.todos}>
			{title}
			<div className={style.btns}>
				{removeTask ? (
					<form className={style.formRemove}>
						<input
							type="text"
							placeholder="Желаемый текст..."
							value={removeText}
							onChange={({ target }) => setRemoveText(target.value)}
						/>
						<button
							className={style.btnRemoveInForm}
							type="submit"
							onClick={() => {
								requestUpdaitingTask(removeText, id, userId, refresh);
								setRemoveTask(false);
							}}
							disabled={removeText.trim() === ''}
						>
							Изменить
						</button>
						<button
							className={style.btnCancel}
							onClick={() => setRemoveTask(false)}
						>
							Отменить
						</button>
					</form>
				) : (
					<button
						className={style.btnRemove}
						onClick={() => setRemoveTask(true)}
						
					>
						Изменить задачу
					</button>
				)}
				<button
					className={style.btnDel}
					onClick={() => requestDeleteCurrentTask(id, refresh)}
				>
					Удалить задачу
				</button>
			</div>
		</div>
	);
};