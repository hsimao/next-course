import { getFeedbackFilePath, extractFeedback } from ".";

export default function handler(req, res) {
  if (req.method === "GET") {
    const feedbackId = req.query.feedbackId;
    const filePath = getFeedbackFilePath();
    const feedbackData = extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(
      (feedback) => feedback.id === feedbackId
    );

    res.status(200).json({ feedback: selectedFeedback });
  }
}
