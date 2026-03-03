
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { appStateType, appDispatch } from './AppStore';

export const useAppSelector: TypedUseSelectorHook<appStateType> = useSelector;
export const useAppDispatch = () => useDispatch<appDispatch>();