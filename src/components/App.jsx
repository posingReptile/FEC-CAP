/* eslint-disable max-len */
import React, {
  useState, useMemo, useRef, useEffect,
} from 'react';
import { GiAmericanShield } from 'react-icons/gi';
import { format } from 'date-fns';
import RelatedProducts from './related_products/RelatedProducts';
import RatingsReviews from './ratings_reviews/RatingsReviews';
import QuestionsAnswers from './qa/QuestionsAnswers';
import Overview from './overview/Overview';
import StarReference from './shared/StarReference';
import '../styles/styles.scss';
import { DarkModeProvider } from './shared/DarkModeProvider';

/* ----------- Set up id state -------------- */
export default function App() {
  // later this initial id should be passed down from index.jsx as props
  const [id, setId] = useState(37311);
  const [dark, goDark] = useState(false);
  const [appAvgRating, setAppAvgRating] = useState(5);
  const [productDetails, setDetails] = useState({});
  const [styles, setStyles] = useState([]);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const reviewsRef = useRef(null);

  // ----- Data tracking function ----- //
  const trackerData = useMemo(() => ({}), []);
  const handleTrackClick = (e, module) => {
    const eleClicked = e.target;
    const trackKey = format(new Date(), 'MMMM dd, yyyy HH mm ss S SS');
    const trackTime = format(new Date(), 'MMMM dd, yyyy HH mm ss');
    trackerData[trackKey] = { eleClicked, trackTime, module };
  };

  useEffect(() => {
    history.pushState({ id }, '');

    function setIdByHistory(event) {
      const { state } = event;

      if (state) setId(state.id);
    }

    window.addEventListener('popstate', setIdByHistory);

    return () => window.removeEventListener('popstate', setIdByHistory);
  }, [id]);

  return (
    <DarkModeProvider dark={dark}>
      {/* This component provides reference for Star Rating component, don't remove it */}
      <StarReference />
      <Overview
        id="OverviewScroll"
        goDark={goDark}
        dark={dark}
        appAvgRating={appAvgRating}
        details={productDetails}
        setDetails={setDetails}
        styles={styles}
        setStyles={setStyles}
        isLoading={overviewLoading}
        setLoading={setOverviewLoading}
        product_id={id}
        handleTrackClick={handleTrackClick}
        reviewsRef={reviewsRef}
      />
      {
        overviewLoading
          ? (
            <GiAmericanShield className="overview-loader" data-testid="loader" />
          )
          : (
            <>
              <RelatedProducts id={id} setId={setId} handleTrackClick={handleTrackClick} />
              <h3 className="testing-header"> Questions and Answers</h3>
              <QuestionsAnswers id={id} productName="A Purty Pink Jacket" handleTrackClick={handleTrackClick} />
              <RatingsReviews
                productID={id}
                productName={productDetails.name}
                setAppAvgRating={setAppAvgRating}
                handleTrackClick={handleTrackClick}
                reviewsRef={reviewsRef}
              />
            </>
          )
      }
    </DarkModeProvider>
  );
}
