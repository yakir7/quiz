import React, { Component } from 'react';
import './App.css';

export class Nav extends Component{
  render(){
    const data=this.props.data;
    const cur=data.currentQuestion;
    var button=(title, dir)=>{
      return <button onClick={()=>this.props.navigate(dir)}>{title}</button>;
    }
    const prev=button("Prev", -1);
    const next=button("Next", 1);
    if (cur>0 && cur<data.questions.length-1){
      return (
        <div> {prev}{next} </div>
      );
    }else if(cur==0){
      return <div>{next}</div>;
    }else if(cur==data.questions.length-1){
      return (
        <div>{prev}{button("Done", 1)}</div>
      );
    }else if(cur==-1){
      return (
        <div>{button("Start!", 1)}</div>
      );
    }else { return (<div></div>);
    }
  }
}
export class Ques extends Component{
  selectAnswer=(e, userAnswers, currentQuestion)=> {
    userAnswers[currentQuestion]=e.currentTarget.value;

    this.props.update(userAnswers)
  }
  render(){
    const {questions, currentQuestion} = this.props.data;
    var userAnswers = this.props.data.userAnswers;
    const {question, answers, correctAnswer} = questions[currentQuestion];

    return (
    <p>{(currentQuestion+1)}. {question}
    <ul>{answers.map(
      (answer, index)=>{
        let check=false;
        if (userAnswers[currentQuestion]==index) check=true;
          return (<li><input onChange={(e)=>this.selectAnswer(e, userAnswers, currentQuestion)} type="radio" 
          name={"q"+currentQuestion} value={index} checked={check} />{"   "+answer}</li>);
        }
      )}</ul></p>
    );
  }
}

class App extends Component{
  state = {
    data: {
      questions: [
        { question: "What is red?", 
          answers: [  "A fruit", "A color", "An instrument", "An animal", "A fabric" ],
          correctAnswer: 1 },
        { question: "Name an orange fruit", 
          answers: [ "Cucumber", "Acoustic guitar", "Orange" ,"An instrument"],
          correctAnswer: 2 },
       { question: "Can you fly?", 
          answers: [ "No, i dont have wings", "Plastic", "Opera" ,"tnemurtsni nA"],
          correctAnswer: 0 },
        { question: "Whats is Game Of Thrones?", 
          answers: [ "A video game", "A plant", "A TV show","42","An instrument" ],
          correctAnswer: 2 },
        { question: "If today is sunday, what day is tomorrow?", 
          answers: [ "Monday", "A plant", "A day to remember","24","An instrument" ],
          correctAnswer: 0 },
        { question: "Who is the main Character in The Sopranos?", 
          answers: [ "Homer soprano", "Stan", "Stellaaa","Tony","aN iNsTrUmEnT" ],
          correctAnswer: 3 }
      ],
      userAnswers: [-1,-1,-1,-1,-1,-1],
      currentQuestion:-1

    }
  }
  update=(userAnswers)=>{
      this.setState({userAnswers});
  }
  navigate=(dir)=>{
    var data=this.state.data;
    if (dir==0){
      data.userAnswers=data.userAnswersDefault;
      data.currentQuestion=-1;
      alert(data.userAnswersDefault[0])
    }else{
      data.currentQuestion+=dir;
    }

    this.setState({data});
  }
  render() {
    const data=this.state.data;
    var elem;
    if (data.currentQuestion==-1){
      elem=<p className="big">This is a quiz!</p>;
    }else if(data.currentQuestion<data.questions.length){
      elem=<Ques update={this.update} data={data} />;
    }else if(data.currentQuestion==data.questions.length){
      var nQues =data.questions.length;
      var correct=0;
      data.questions.map((tempQues, index)=>{
        if (tempQues.correctAnswer==data.userAnswers[index]){
          correct++;
        }
      });
      elem=<p className="big">Your score is {Math.round(100/data.questions.length*correct)}%</p>;
    }
    return (
      <div className="App centered">
        <div className="toparea">{elem}</div>
        <Nav navigate={this.navigate} data={data} />
      </div>
    );
  }
}

export default App;
