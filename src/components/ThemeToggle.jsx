import { useTheme } from "../contexts/ThemeContext";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";

const ThemeToggle = () => {
  const { dark, setDark } = useTheme();

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
       <MdOutlineWbSunny className="swap-off size-6" />
       <MdDarkMode className="swap-on size-6" />
    </label>
  );
};

export default ThemeToggle;
