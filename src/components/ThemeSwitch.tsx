import useTheme from "../hooks/useTheme";
import '../styles/theme-switch.scss'

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={theme=== "dark"} onChange={() => toggleTheme()} />
        <span className="slider round"></span>
      </label>
      <label> Tema escuro</label>
    </div>
  );
};

export default ThemeSwitch;
