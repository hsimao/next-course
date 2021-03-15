import { useRef, useState } from "react";
import Head from "next/head";

export default function HomePage() {
  const [feedbackList, setFeedbackList] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const postBody = {
      email: enteredEmail,
      text: enteredFeedback
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      });
  };

  const handleLoadFeedback = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        if (data.feedback.length) {
          setFeedbackList(data.feedback);
        }
      });
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>

      <button onClick={handleLoadFeedback}>Load Feedback</button>
      <ul>
        {feedbackList.map((feedback) => (
          <li key={feedback.id}>{feedback.email}</li>
        ))}
      </ul>
    </div>
  );
}
