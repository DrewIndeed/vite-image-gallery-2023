export const local = ({ key, value }: { key: string; value?: string }) => {
  return {
    set: () => window.localStorage.setItem(key, value || ""),
    get: () => window.localStorage.getItem(key),
    bye: () => window.localStorage.removeItem(key),
  };
};
