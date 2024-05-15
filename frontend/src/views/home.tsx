import "../styles/home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ItemCard } from "../components/itemCard";
import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState, AppDispatch } from "../store/store";
import { fetchOnSale } from "../store/slices/itemsSlice";
import Loader from "../components/loader/loader";
import { useNavigate } from "react-router-dom";
import {
  INTRO_DONE_TOKEN,
  VISITED_HOMEPAGE_TOKEN,
} from "../utils/localStorageTokens";
import Header from "../components/header";
import CatchKey from "../utils/catchKey";

const Home = () => {
  const [wasFirstVisited, setWasFirstVisited] = useState(false);

  const items = useSelector((state: IRootState) => state.items.items);
  const status = useSelector((state: IRootState) => state.items.status);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem(INTRO_DONE_TOKEN) &&
      !sessionStorage.getItem(VISITED_HOMEPAGE_TOKEN)
    ) {
      setWasFirstVisited(true);
      sessionStorage.setItem(VISITED_HOMEPAGE_TOKEN, "true");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchOnSale());
  }, [dispatch]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <CatchKey>
      <div style={{ height: "100vh" }}>
        <Loader
          loading={
            (wasFirstVisited ||
              !sessionStorage.getItem(VISITED_HOMEPAGE_TOKEN)) &&
            status === "loading"
          }
        >
          <Header />
          <div className="fade-in">
            <img
              className="home-image"
              src={`${process.env.PUBLIC_URL}/assets/homepage.png`}
              alt="Woman with a shopping bag"
            />
            <div className="m-5">
              <h2 className="text-danger fw-bolder">sale</h2>
              <Button
                className="mt-2"
                color="primary"
                outline
                size="small"
                onClick={() => navigate("/sale")}
              >
                browse
              </Button>
            </div>
            <Loader loading={status === "loading"}>
              <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite
                autoPlay
                autoPlaySpeed={4000}
                transitionDuration={1000}
              >
                {items?.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </Carousel>
            </Loader>
          </div>
        </Loader>
      </div>
    </CatchKey>
  );
};

export default Home;
