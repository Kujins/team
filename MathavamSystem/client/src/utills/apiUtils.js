export const createSensoryProfilePayload = (formSpecificData, sharedData) => {
  const { responses, comments, totalScore, formTitle } = formSpecificData;

  const { patientId, examinerId, testDate, ageGroup } = sharedData;

  const formattedResponses = Object.entries(responses).map(([qid, data]) => ({
    qid: parseInt(qid, 10),
    score: data.score,
    quadrant: data.quadrant,
  }));

  const formData = {
    patientId: patientId,
    examinerId: examinerId,
    testDate: testDate,
    assessmentType: "Sensory Profile", 
    ageGroup: ageGroup,
    category: formTitle,
    responses: formattedResponses,
    rawScore: totalScore,
    comments: comments,
  };

  return formData;
};
