export const useTheme = () => {
  const isDark = useState<boolean>("theme-dark", () => false);

  const applyTheme = () => {
    if (!import.meta.client) return;
    const html = document.documentElement;
    if (isDark.value) {
      html.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    applyTheme();
  };

  const initTheme = () => {
    if (import.meta.client) {
      const cached = localStorage.getItem("color-theme");
      if (cached === "dark") isDark.value = true;
      else if (cached === "light") isDark.value = false;
      else isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme();
    }
  };

  return { isDark, toggleTheme, initTheme };
};
