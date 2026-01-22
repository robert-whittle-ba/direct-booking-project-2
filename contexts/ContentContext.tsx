import React, { createContext, useContext, useState, useEffect } from 'react';

interface ContentContextType {
  content: Record<string, string>;
  updateContent: (key: string, value: string) => void;
  isEditing: boolean;
  toggleEditing: () => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType>({
  content: {},
  updateContent: () => {},
  isEditing: false,
  toggleEditing: () => {},
  resetContent: () => {},
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hhc_content');
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load content", e);
      }
    }
  }, []);

  const updateContent = (key: string, value: string) => {
    const newContent = { ...content, [key]: value };
    setContent(newContent);
    localStorage.setItem('hhc_content', JSON.stringify(newContent));
  };

  const toggleEditing = () => setIsEditing(prev => !prev);

  const resetContent = () => {
    if (window.confirm("Are you sure you want to reset all content to defaults?")) {
      setContent({});
      localStorage.removeItem('hhc_content');
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, isEditing, toggleEditing, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};