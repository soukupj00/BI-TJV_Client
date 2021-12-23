import classes from "./Logo.module.scss"
import MainSVG from "../../assets/mainSVG";

const Logo = () => {
  return (
      <a href="/" className={classes.logo}>
          <MainSVG fillColor="white"/>
          <span>Home</span>
      </a>
  );
};

export default Logo;