import {Fragment} from "react";

import coverVID from "../../assets/coverVID.mp4"

import classes from "./Hero.module.scss"
import Button from "../../UI/Button/Button";

const HomePageContent = () => {
    return (
        <Fragment>
            <h1 className={classes.hero__content__title}>Beast Fitness</h1>
            <span className={classes.hero__content__tagline}>
                TJV Semestral work
            </span>
            <p className={classes.hero__content__description}>
                Created by Jan Soukup
            </p>
            <div className={classes.hero__content__cta}>
                <Button to="/addresses">Addresses</Button>
                <Button to="/fitness_centers">Fitness centers</Button>
            </div>
        </Fragment>
    );
};

const Hero = ({isDynamic, children}) => {
    return (
        <div className={classes.container}>
            <video
                autoPlay={true}
                muted
                loop
                className={classes.video}
                id={"video"}
                src={coverVID}>
            </video>
            <div className={classes.hero}>
                <div className={classes.hero__content}>
                    {!isDynamic && <HomePageContent/>}
                    {isDynamic && <h1 className={classes.hero__content__title}>{children}</h1>}
                </div>
            </div>
        </div>
    );
};

export default Hero;