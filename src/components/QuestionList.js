import React ,{useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  const[questions,setQuestions]=useState([]);
 

  
  function handleAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((questions) => {
        const newQuestions = questions.map((quest) => {
          if (quest.id === newQuestions.id) {
            return newQuestions; 
          } else {
            return quest; 
          }
        });
        setQuestions(newQuestions);
      });
  }
  

    function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
       
        setQuestions(questions.filter((quest) => quest.id !== id));
      });
  }


  useEffect(()=>{
    fetch(`http://localhost:4000/questions`)
    .then(res=>res.json())
    .then(questions=>{
      setQuestions(questions);
      // console.log(questions)

    });
  },[]);

 

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
        questions.map((quest) => (
            <QuestionItem
              key={quest.id}
              question={quest}
              onDeleteClick={handleDeleteClick}
              onAnswerChange={handleAnswer}
            />
        ))
        
        }</ul>
    </section>
  );
}


export default QuestionList;





