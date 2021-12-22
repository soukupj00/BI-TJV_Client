import mainSVG from  "../../assets/mainSVG"
import classes from "./Logo.module.scss"

const Logo = () => {
  return (
      <a href="/" className={classes.logo}>
          <mainSVG fillColor={"white"} />
          <span>Home</span>
      </a>
  );
};

export default Logo;