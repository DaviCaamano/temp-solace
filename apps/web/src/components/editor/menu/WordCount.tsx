import { Editor as TipTapEditor } from '@tiptap/react';
import { useMemo } from 'react';

interface WordCountProps {
  characterLimit: number;
  editor: TipTapEditor;
}
export const WordCount = ({ characterLimit, editor }: WordCountProps) => {
  const characters: number = editor.storage.characterCount.characters();
  const warning = limitWarning(characters, characterLimit);
  const words = editor.storage.characterCount.words();
  const limit = useMemo(() => <MonoSpans num={characterLimit} keyName={'word-count-limit'} />, [characterLimit]);
  return (
    <div id={'word-count'} className={'mt-4 text-latte'}>
      <MonoSpans num={characters} keyName={'word-count-characters'} warning={warning} /> / {limit} characters
      <br />
      {words} word{words > 1 ? 's' : ''}
    </div>
  );
};

const limitWarning = (characters: number, characterLimit: number): boolean => characters / characterLimit > 0.9;

const MonoSpans = ({ num, keyName, warning }: { num: number; keyName: string; warning?: boolean }) => {
  const letters = num.toLocaleString().split('');
  return letters.map((letter: string, index: number) => (
    <span
      key={keyName + '-' + index}
      className={`inline-flex justify-center ${letter === ',' ? 'w-[4px]' : 'w-[10px]'} ${
        warning ? 'text-pink font-bold' : 'text-latte'
      }`}
    >
      {letter}
    </span>
  ));
};
