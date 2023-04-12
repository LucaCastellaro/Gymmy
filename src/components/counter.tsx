import { decrement, increment } from '../redux/feature/counter/counterSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export const Counter = (): JSX.Element => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
        <button
            aria-label="+1"
            onClick={() => dispatch(increment())}
        >
            +1
        </button>
        <span>{count}</span>
        <button
            aria-label="-1"
            onClick={() => dispatch(decrement())}
        >
            -1
        </button>
        </div>
  )
}