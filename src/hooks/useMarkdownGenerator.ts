import { useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';

export const useMarkdownGenerator = () => {
  const { components, stats, repos, languages, markdownOutput, generateMarkdown } = useEditorStore();

  useEffect(() => {
    generateMarkdown();
  }, [components, stats, repos, languages]);

  return { markdownOutput, generateMarkdown };
};
