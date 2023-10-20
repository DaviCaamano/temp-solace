//Editor Hook
import { useDispatch } from 'react-redux';
import { reset, RootState, setEditor, setContent, setTitle } from '@context/redux';
import { useAppSelector } from '@hooks/context/useRedux';
import { useUser } from '@hooks/user/useUser';
import { Editor } from '@interface/editor';

export const useEditor = () => {
  const dispatch = useDispatch();
  const [, { data: user }] = useUser();

  return {
    reset: () => dispatch(reset()),
    setEditor: (editor: Partial<Editor>) => dispatch(setEditor(editor)),
    setContent: (content: string) => dispatch(setContent(content)),
    setTitle: (content: string) => dispatch(setTitle(content)),
    editor: useAppSelector((state: RootState) => state.editor),
    user,
  };
};
