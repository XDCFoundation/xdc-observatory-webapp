import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tokensearchbar from "../../modules/explorer/tokensearchBar";
import FooterComponent from "../../modules/common/footerComponent";


const useStyles = makeStyles((theme) => ({
    mainContainer: {
        maxWidth: "450px",
        width: "100%",
        margin: "182px auto 182px auto",
        padding: "0 15px"
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
    },
    image: {
        maxWidth: "100%",
    },
    description: {
        display: "flex",
        fontFamily: "Inter",
        fontSize: "22px",
        color: "#2a2a2a",
        textAlign: "center",
        padding: "0 30px",
        marginTop: "55px",
        marginBottom: "25px",
    },
    searchedText: {
        fontWeight: "bold",
        color: "#2149b9",
    },
    bottomText: {
        fontFamily: "Inter",
        fontSize: "18px",
        color: "#989898",
        textAlign: "center",
    },
    "@media (min-width: 0px) and (max-width: 767px)": {
        mainContainer: {
            margin: "50px auto 70px auto",
        },
      }
}));

export default function ActivateAccount() {

  const classes = useStyles();

  let url = new URL(window.location.href);
  let searchParams = new URLSearchParams(url.search);
  let searchString = searchParams.get("searchString");

  return (
    <div>
      <Tokensearchbar />
      <div className={classes.mainContainer}>
          <div className={classes.imageContainer}>
              <img className={classes.image} src="/images/search-not-found.svg" alt="Image"></img>
          </div>
          <div className={classes.description}>
            <div>Sorry! We couldn’t find any matches for <span className={classes.searchedText}>{searchString}</span></div>
          </div>
          <div className={classes.bottomText}>Please try searching with another term</div>
      </div>
      <FooterComponent />
    </div>
  );
}


