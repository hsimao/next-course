import { getFeedbackFilePath, extractFeedback } from "../api/feedback";
import { useState, Fragment } from "react";

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  const handleLadFeedbackById = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  };

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => handleLadFeedbackById(item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = getFeedbackFilePath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data
    }
  };
}